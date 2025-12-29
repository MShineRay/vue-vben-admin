# 自动部署脚本使用说明

## 功能

部署脚本可以自动完成以下操作：
1. 📤 上传构建的zip包到云服务器
2. 💾 自动备份当前版本
3. 📦 在服务器上解压新版本
4. 🔐 设置文件权限
5. 🔄 重启服务（nginx/pm2等）

## 前置要求

### 1. 安装必要工具

**macOS:**
```bash
# 安装sshpass（如果使用密码认证）
brew install hudochenkov/sshpass/sshpass
```

**Linux:**
```bash
# 安装sshpass（如果使用密码认证）
sudo apt-get install sshpass  # Debian/Ubuntu
# 或
sudo yum install sshpass      # CentOS/RHEL
```

### 2. 配置SSH访问

**方式1: 使用SSH密钥（推荐）**

```bash
# 生成SSH密钥对（如果还没有）
ssh-keygen -t rsa -b 4096

# 将公钥复制到服务器
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server-ip
```

**方式2: 使用密码**

确保已安装 `sshpass`，并在配置文件中设置密码。

## 配置

### 1. 创建配置文件

复制示例配置文件：
```bash
cp .env.deploy.example .env.deploy
```

### 2. 编辑配置文件

编辑 `.env.deploy` 文件，填写实际的服务器信息：

```bash
# 服务器信息
DEPLOY_HOST=192.168.1.100        # 服务器IP或域名
DEPLOY_USER=root                  # SSH用户名
DEPLOY_PORT=22                    # SSH端口

# SSH认证（二选一）
DEPLOY_KEY_PATH=~/.ssh/id_rsa    # SSH私钥路径
# 或
# DEPLOY_PASSWORD=your_password   # SSH密码

# 部署路径
DEPLOY_REMOTE_PATH=/var/www/console    # 服务器部署目录
DEPLOY_BACKUP_PATH=/var/www/backups   # 备份目录

# 服务重启命令
DEPLOY_RESTART_CMD="sudo systemctl restart nginx"
```

### 3. 环境变量方式（可选）

也可以通过环境变量设置配置，优先级高于配置文件：

```bash
export DEPLOY_HOST=192.168.1.100
export DEPLOY_USER=root
export DEPLOY_KEY_PATH=~/.ssh/id_rsa
export DEPLOY_REMOTE_PATH=/var/www/console
export DEPLOY_RESTART_CMD="sudo systemctl restart nginx"
```

## 使用方法

### 1. 构建并部署开发环境

```bash
# 构建开发版本
pnpm run build:console:development

# 部署到开发服务器
pnpm run deploy:development
```

### 2. 构建并部署生产环境

```bash
# 构建生产版本
pnpm run build:console:production

# 部署到生产服务器
pnpm run deploy:production
```

### 3. 一键构建+部署

可以组合命令实现一键构建和部署：

```bash
# 开发环境
pnpm run build:console:development && pnpm run deploy:development

# 生产环境
pnpm run build:console:production && pnpm run deploy:production
```

## 部署流程

脚本执行时会按以下步骤进行：

1. **验证配置** - 检查必要的配置项
2. **查找部署包** - 根据版本号查找对应的zip文件
3. **上传文件** - 使用scp上传zip包到服务器临时目录
4. **创建备份** - 备份当前部署目录到备份路径
5. **解压部署** - 在服务器上解压新版本到部署目录
6. **设置权限** - 设置文件和目录权限
7. **重启服务** - 执行配置的重启命令

## 常见服务重启命令

根据实际使用的服务，修改 `DEPLOY_RESTART_CMD`：

### Nginx
```bash
DEPLOY_RESTART_CMD="sudo systemctl restart nginx"
# 或
DEPLOY_RESTART_CMD="sudo service nginx restart"
```

### PM2
```bash
DEPLOY_RESTART_CMD="pm2 restart all"
# 或指定应用
DEPLOY_RESTART_CMD="pm2 restart app-name"
```

### Docker
```bash
DEPLOY_RESTART_CMD="docker-compose restart"
# 或
DEPLOY_RESTART_CMD="docker restart container-name"
```

### Node.js服务（直接运行）
```bash
DEPLOY_RESTART_CMD="cd /var/www/console && pm2 restart ecosystem.config.js"
```

## 安全建议

1. **不要提交配置文件** - 确保 `.env.deploy` 在 `.gitignore` 中
2. **使用SSH密钥** - 优先使用SSH密钥而非密码
3. **限制SSH访问** - 在服务器上配置防火墙和SSH访问限制
4. **备份重要数据** - 部署前确保重要数据已备份
5. **测试环境验证** - 先在测试环境验证部署流程

## 故障排查

### 1. SSH连接失败

```bash
# 测试SSH连接
ssh -i ~/.ssh/id_rsa -p 22 user@server-ip

# 检查SSH密钥权限
chmod 600 ~/.ssh/id_rsa
```

### 2. 权限不足

确保SSH用户有权限：
- 写入部署目录
- 执行重启命令（可能需要sudo权限）

### 3. 服务重启失败

检查服务状态：
```bash
# Nginx
sudo systemctl status nginx

# PM2
pm2 list
pm2 logs
```

### 4. 文件解压失败

检查服务器上是否安装了 `unzip`：
```bash
# 安装unzip
sudo apt-get install unzip  # Debian/Ubuntu
sudo yum install unzip      # CentOS/RHEL
```

## 示例

### 完整部署流程示例

```bash
# 1. 构建生产版本
pnpm run build:console:production

# 2. 部署到生产服务器
pnpm run deploy:production

# 3. 验证部署（可选）
curl https://your-domain.com
```

### CI/CD集成示例

在CI/CD流程中可以这样使用：

```yaml
# GitHub Actions 示例
- name: Build
  run: pnpm run build:console:production

- name: Deploy
  env:
    DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
    DEPLOY_USER: ${{ secrets.DEPLOY_USER }}
    DEPLOY_KEY_PATH: ${{ secrets.DEPLOY_SSH_KEY }}
  run: pnpm run deploy:production
```

## 注意事项

1. 部署前确保已构建zip包
2. 确保服务器有足够的磁盘空间
3. 建议在非业务高峰期部署
4. 部署后检查服务是否正常运行
5. 保留备份以便快速回滚

