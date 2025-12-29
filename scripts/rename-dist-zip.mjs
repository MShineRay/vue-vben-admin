#!/usr/bin/env node

/**
 * 重命名 dist.zip 文件
 * 格式：
 * - 开发环境: dist-console-dev.YYMMDD_XXX.zip
 * - 生产环境: dist-console-production.YYMMDD_XXX.zip
 */

import { existsSync, readFileSync, renameSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取参数（development 或 production）
const buildMode = process.argv[2] || 'development'

if (!['development', 'production'].includes(buildMode)) {
  console.error('✗ 错误: 构建模式必须是 development 或 production')
  process.exit(1)
}

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

try {
  // 优先从环境配置文件读取版本号（与构建时使用的版本号一致）
  const consoleDir = join(__dirname, '..', 'apps', 'console')
  const envFilePath = join(consoleDir, `.env.${buildMode}`)
  let currentVersion = parseEnvFile(envFilePath)
  
  // 如果环境配置文件中没有，则从 .env 读取
  if (!currentVersion) {
    const defaultEnvFile = join(consoleDir, '.env')
    currentVersion = parseEnvFile(defaultEnvFile)
  }
  
  // 如果都读取不到，则从 package.json 读取（作为后备）
  if (!currentVersion) {
    const packageJsonPath = join(__dirname, '..', 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    currentVersion = packageJson.version || '1.1.3.2025110101'
    console.warn(`⚠️  无法从环境配置文件读取版本号，使用 package.json 中的版本号: ${currentVersion}`)
  } else {
    console.log(`📦 从 .env.${buildMode} 读取版本号: ${currentVersion}`)
  }

  // 解析版本号：1.1.3.2025110302
  const versionParts = currentVersion.split('.')
  const dateAndSequence = versionParts[3] || '2025110101'

  // 提取日期和序号
  const fullDate = dateAndSequence.slice(0, 8) // YYYYMMDD
  const sequence = dateAndSequence.slice(8) || '01' // nn

  // 转换日期格式：YYYYMMDD -> YYMMDD
  const shortDate = fullDate.slice(2) // YYMMDD

  // 格式化序号为3位（带前导零）
  const formattedSequence = String(parseInt(sequence, 10)).padStart(3, '0')

  // 生成新文件名
  const prefix = buildMode === 'development' ? 'dist-console-dev' : 'dist-console-production'
  const newFileName = `${prefix}.${shortDate}_${formattedSequence}.zip`

  // 获取 dist.zip 路径（在 apps/console 目录下）
  const distZipPath = join(__dirname, '..', 'apps', 'console', 'dist.zip')
  const newFilePath = join(__dirname, '..', 'apps', 'console', newFileName)

  // 检查 dist.zip 是否存在
  if (!existsSync(distZipPath)) {
    console.error(`✗ 错误: 找不到文件 ${distZipPath}`)
    console.error('  请确保构建已完成并生成了 dist.zip 文件')
    process.exit(1)
  }

  // 重命名文件
  renameSync(distZipPath, newFilePath)

  console.log(`✓ 文件重命名成功:`)
  console.log(`  原文件名: dist.zip`)
  console.log(`  新文件名: ${newFileName}`)
  console.log(`  版本: ${currentVersion}`)
  console.log(`  日期: ${shortDate}, 序号: ${formattedSequence}`)
} catch (error) {
  console.error('✗ 重命名文件失败:', error.message)
  process.exit(1)
}
