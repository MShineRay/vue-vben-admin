#!/usr/bin/env node

/**
 * 自动更新 package.json 和 .env 文件中的版本号
 * 版本格式：主版本.次版本.修订版.YYYYMMDDnn
 * 例如：1.6.2.2025121300
 *
 * 同一天多次构建会自动递增序号
 * 
 * 此脚本会：
 * 1. 从环境配置文件（.env.development 或 .env.production）读取 VITE_APP_VERSION
 * 2. 如果环境配置文件中没有，则从 .env 读取
 * 3. 构建完成后自动递增版本号并更新到对应的配置文件
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取环境参数（development 或 production）
const envMode = process.argv.find(arg => ['development', 'production'].includes(arg)) || 'development'

// 获取 apps/console 目录路径
const consoleDir = join(__dirname, '..', 'apps', 'console')

/**
 * 解析 .env 文件，提取 VITE_APP_VERSION
 */
function parseEnvFile(envPath) {
  if (!existsSync(envPath)) {
    return null
  }
  
  try {
    const content = readFileSync(envPath, 'utf-8')
    const lines = content.split('\n')
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      // 跳过空行和注释
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue
      }
      
      // 解析 KEY=VALUE 格式
      const match = trimmedLine.match(/^VITE_APP_VERSION\s*=\s*(.+)$/)
      if (match) {
        // 移除引号（如果有）
        const value = match[1].trim().replace(/^["']|["']$/g, '')
        return value
      }
    }
  } catch (error) {
    console.warn(`⚠️  读取 ${envPath} 失败:`, error.message)
  }
  
  return null
}

/**
 * 读取版本号（优先从环境配置文件，其次从 .env）
 */
function readVersionFromEnv() {
  // 优先读取环境配置文件
  const envFilePath = join(consoleDir, `.env.${envMode}`)
  const version = parseEnvFile(envFilePath)
  
  if (version) {
    console.log(`📦 从 .env.${envMode} 读取版本号: ${version}`)
    return { version, envFile: envFilePath }
  }
  
  // 如果环境配置文件中没有，则从 .env 读取
  const defaultEnvFile = join(consoleDir, '.env')
  const defaultVersion = parseEnvFile(defaultEnvFile)
  
  if (defaultVersion) {
    console.log(`📦 从 .env 读取版本号: ${defaultVersion}`)
    return { version: defaultVersion, envFile: defaultEnvFile }
  }
  
  // 如果都读取不到，使用默认值
  const defaultVersionValue = '1.6.2.2025121300'
  console.warn(`⚠️  无法从环境配置文件读取版本号，使用默认值: ${defaultVersionValue}`)
  return { version: defaultVersionValue, envFile: defaultEnvFile }
}

// 检查是否是只读取版本号（不更新）
const isReadOnly = process.argv.includes('--read-only')

try {
  // 从环境配置文件读取版本号
  const { version: currentVersion, envFile } = readVersionFromEnv()
  
  if (isReadOnly) {
    // 只读取版本号，用于构建时显示
    console.log(`📦 当前版本号 (VITE_APP_VERSION): ${currentVersion}`)
    process.exit(0)
  }

  // 解析当前版本号
  // 格式：主版本.次版本.修订版.YYYYMMDDnn
  const versionParts = currentVersion.split('.')
  if (versionParts.length < 4) {
    throw new Error(`版本号格式错误，应为: 主版本.次版本.修订版.YYYYMMDDnn，当前: ${currentVersion}`)
  }
  const baseVersion = versionParts.slice(0, 3).join('.') // 主版本.次版本.修订版
  const dateAndSequence = versionParts[3] || '2025121300' // YYYYMMDDnn

  // 获取当前日期 YYYYMMDD
  const now = new Date()
  const currentDate = now.toISOString().slice(0, 10).replace(/-/g, '') // 格式：20251103

  // 解析日期和序号
  const currentDateFromVersion = dateAndSequence.slice(0, 8) // YYYYMMDD
  const currentSequence = parseInt(dateAndSequence.slice(8) || '01', 10) // nn

  let newSequence

  if (currentDateFromVersion === currentDate) {
    // 同一天，序号递增
    newSequence = currentSequence + 1
  } else {
    // 新的一天，序号重置为 01
    newSequence = 1
  }

  // 格式化序号（两位数字，不足补零）
  const formattedSequence = String(newSequence).padStart(2, '0')

  // 生成新版本号
  const newVersion = `${baseVersion}.${currentDate}${formattedSequence}`

  // 更新环境配置文件中的 VITE_APP_VERSION
  try {
    if (existsSync(envFile)) {
      let envContent = readFileSync(envFile, 'utf-8')
      // 替换 VITE_APP_VERSION 的值
      const updatedContent = envContent.replace(
        /^VITE_APP_VERSION\s*=\s*.+$/m,
        `VITE_APP_VERSION=${newVersion}`
      )
      
      // 如果文件中没有 VITE_APP_VERSION，则添加
      if (updatedContent === envContent && !envContent.includes('VITE_APP_VERSION')) {
        envContent += `\nVITE_APP_VERSION=${newVersion}\n`
        writeFileSync(envFile, envContent, 'utf-8')
      } else {
        writeFileSync(envFile, updatedContent, 'utf-8')
      }
      console.log(`✓ ${envFile} 中的版本号已更新: ${currentVersion} → ${newVersion}`)
    }
  } catch (envError) {
    console.warn(`⚠️  更新环境配置文件失败: ${envError.message}`)
  }

  // 更新根目录 package.json
  const packageJsonPath = join(__dirname, '..', 'package.json')
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    const oldPackageVersion = packageJson.version || 'unknown'
    packageJson.version = newVersion
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8')
    console.log(`✓ 根目录 package.json 版本号已更新: ${oldPackageVersion} → ${newVersion}`)
  } catch (packageError) {
    console.warn(`⚠️  更新根目录 package.json 失败: ${packageError.message}`)
  }

  // 同步更新 apps/console/package.json 的版本号
  const consolePackageJsonPath = join(__dirname, '..', 'apps', 'console', 'package.json')
  try {
    const consolePackageJson = JSON.parse(readFileSync(consolePackageJsonPath, 'utf-8'))
    const oldConsoleVersion = consolePackageJson.version || 'unknown'
    consolePackageJson.version = newVersion
    writeFileSync(consolePackageJsonPath, JSON.stringify(consolePackageJson, null, 2) + '\n', 'utf-8')
    console.log(`✓ apps/console/package.json 版本号已同步: ${oldConsoleVersion} → ${newVersion}`)
  } catch (consoleError) {
    console.warn(`⚠️  同步 apps/console 版本号失败: ${consoleError.message}`)
    // 不中断流程，继续执行
  }

  console.log(`\n📦 版本号更新完成:`)
  console.log(`  构建时使用的版本号 (VITE_APP_VERSION): ${currentVersion}`)
  console.log(`  更新后的版本号: ${newVersion}`)
  console.log(`  日期: ${currentDate}, 序号: ${formattedSequence}`)
  console.log(`  更新的配置文件: ${envFile}`)
  console.log(`\n💡 下次构建时将使用新版本号: ${newVersion}\n`)
} catch (error) {
  console.error('✗ 更新版本号失败:', error.message)
  process.exit(1)
}
