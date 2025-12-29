#!/usr/bin/env node

import { execSync } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';

// 尝试查找并杀死 Vite 进程占用的端口
function killVitePorts() {
  try {
    // 方法1: 直接查找并杀死所有 Vite development 进程
    if (!isWindows) {
      try {
        const command = `ps aux | grep -E '[v]ite.*development' | awk '{print $2}'`;
        const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
        const pids = output
          .trim()
          .split('\n')
          .filter(line => line.trim());

        if (pids.length > 0) {
          console.log(`找到 ${pids.length} 个 Vite 进程，正在终止...`);
          pids.forEach(pid => {
            try {
              execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
              console.log(`已终止进程 ${pid}`);
            } catch (e) {
              // 忽略错误，进程可能已经不存在
            }
          });
          return; // 如果成功杀死进程，就不需要再尝试端口了
        }
      } catch (e) {
        // 如果没有找到进程，继续尝试端口方式
      }
    }

    // 方法2: 尝试杀死常见端口（Vite 默认从 5173 开始，如果被占用会自动递增）
    const commonPorts = [5777,5778,5779,5780,5781,5782,5783,5784,5785,5786,5787,5788,5789,5790];
    console.log('尝试杀死常见开发端口...');
    
    // 检查端口是否被占用的函数
    function isPortInUse(port) {
      try {
        if (isWindows) {
          const command = `netstat -ano | findstr :${port}`;
          const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
          return output.trim().length > 0;
        } else {
          const command = `lsof -ti:${port}`;
          execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    
    let killedPorts = [];
    for (const port of commonPorts) {
      try {
        if (isPortInUse(port)) {
          console.log(`端口 ${port} 被占用，正在终止...`);
          execSync(`npx -y kill-port ${port}`, { stdio: 'pipe' });
          killedPorts.push(port);
          console.log(`✓ 已释放端口 ${port}`);
        }
      } catch (e) {
        // 端口可能未被占用或已释放，忽略错误
      }
    }
    
    if (killedPorts.length > 0) {
      console.log(`\n共释放了 ${killedPorts.length} 个端口: ${killedPorts.join(', ')}`);
    } else {
      console.log('未发现被占用的端口');
    }
  } catch (error) {
    // 不抛出错误，允许继续执行
  }
}

killVitePorts();

