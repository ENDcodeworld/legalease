# LegalEase 完整安装指南

本指南涵盖所有安装方式，从最简单到最灵活。

---

## 🚀 方式一：Docker（推荐，5分钟）

适合：快速体验、生产部署、熟悉 Docker

### 前置要求
- Docker 20+
- Docker Compose 2+

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加你的 OPENAI_API_KEY（或其他模型 API Key）

# 3. 启动服务
docker-compose up -d

# 4. 等待数据初始化（首次可能需要几分钟）
docker-compose logs -f

# 5. 访问应用
# http://localhost:3000
```

### 常用命令

```bash
# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新代码后重新构建
docker-compose up -d --build

# 进入容器调试
docker-compose exec app bash
```

### 自定义配置

编辑 `docker-compose.yml`：

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"  # 修改端口
    environment:
      - OPENAI_API_KEY=your_key  # 修改 API Key
      - CHROMA_PERSIST_DIR=/data/chroma  # 数据持久化路径
    volumes:
      - ./data:/app/data  # 挂载数据目录
```

---

## ⚡ 方式二：Vercel 一键部署（最快）

适合：不想配置服务器、快速在线访问

### 步骤

1. 点击上方 **"Deploy with Vercel"** 按钮
2. 登录 GitHub 授权
3. 设置环境变量：
   - `OPENAI_API_KEY`: 你的 OpenAI API Key
   - （可选）`ANTHROPIC_API_KEY`: Anthropic API Key
4. 点击 **Deploy**
5. 等待几分钟，获得在线地址！

### 自定义域名（可选）

在 Vercel 控制台：
1. 进入项目设置
2. Domains → 添加域名
3. 配置 DNS 解析

---

## 💻 方式三：本地运行（开发环境）

适合：开发者、二次开发、调试

### 前置要求

- Node.js 18+
- Python 3.9+（数据处理脚本需要）
- ChromaDB 服务（可选）

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease

# 2. 安装依赖
npm ci --only=production

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加你的 API Key

# 4. 准备数据（首次需要）
./scripts/prepare-data.sh

# 5. 启动开发服务器
npm run dev

# 6. 访问
# http://localhost:3000
```

### 使用独立 ChromaDB（推荐生产环境）

```bash
# 启动 ChromaDB
docker run -p 8000:8000 ghcr.io/chromadb/chroma:latest

# 修改 .env.local
CHROMA_PERSIST_DIR=/path/to/persist/dir
CHROMA_HOST=http://localhost:8000
```

---

## 🤖 方式四：Android APK（移动端）

适合：手机安装、离线使用

### 前置要求

- Android SDK（命令行工具或 Android Studio）
- Java JDK 17+
- Node.js 18+
- ImageMagick（生成图标，可选）

### 快速构建

```bash
# 1. 克隆并安装
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease
npm install

# 2. 生成应用图标（首次）
npm run icons

# 3. 构建 APK
./scripts/build-apk.sh debug
# 或
npm run apk

# 4. 找到 APK
# legalease-debug.apk (约 15-20 MB)
# 或
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 发布版签名

```bash
# 1. 生成签名密钥
keytool -genkey -v \
  -keystore keystore.jks \
  -alias legalease \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# 2. 移动密钥
mv keystore.jks android/app/

# 3. 修改 capacitor.config.ts
android: {
  buildOptions: {
    signingType: 'apksigner',
    keystorePath: 'android/app/keystore.jks',
    keystorePassword: 'your_password',
    keystoreAlias: 'legalease',
    keystoreAliasPassword: 'your_password'
  }
}

# 4. 构建发布版
./scripts/build-apk.sh release
# 输出: android/app/build/outputs/apk/release/app-release.apk
```

### 安装到手机

```bash
# USB 方式
adb install legalease-debug.apk

# 或手动传输
# 1. 复制 APK 到手机
# 2. 在手机上点击安装
# 3. 启用"未知来源"（设置 → 安全）
```

详细说明见 [ANDROID_BUILD.md](ANDROID_BUILD.md)

---

## 🔧 高级部署

### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: legalease
spec:
  replicas: 2
  selector:
    matchLabels:
      app: legalease
  template:
    metadata:
      labels:
        app: legalease
    spec:
      containers:
      - name: legalease
        image: ghcr.io/endcodeworld/legalease:latest
        ports:
        - containerPort: 3000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: legalease-secrets
              key: openai-api-key
        volumeMounts:
        - name: data
          mountPath: /app/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: legalease-data
```

### Systemd

```ini
# /etc/systemd/system/legalease.service
[Unit]
Description=LegalEase Legal AI Assistant
After=network.target

[Service]
Type=simple
User=legalease
WorkingDirectory=/opt/legalease
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
Environment="OPENAI_API_KEY=your_key"
Environment="CHROMA_PERSIST_DIR=/var/lib/legalease/chroma"

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable legalease
sudo systemctl start legalease
sudo systemctl status legalease
```

---

## 🔐 安全配置

### 1. API Key 管理

**不要**将 API Key 提交到 Git！

- 使用 `.env.local`（已添加到 .gitignore）
- 生产环境使用环境变量或密钥管理服务
- 定期轮换密钥

### 2. HTTPS 配置

生产环境**必须**使用 HTTPS：

```javascript
// capacitor.config.ts
server: {
  androidScheme: 'https',  // 改为 https
  cleartext: false
}
```

使用 Nginx 反向代理：

```nginx
server {
    listen 443 ssl;
    server_name legalease.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. 防火墙

```bash
# 只开放必要端口
sudo ufw allow 22    # SSH
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

---

## 🐛 故障排查

### 问题：容器启动失败

```bash
# 查看日志
docker-compose logs app

# 常见原因：
# 1. API Key 未配置 → 检查 .env.local
# 2. 端口占用 → 修改端口映射
# 3. 内存不足 → 增加 Docker 资源限制
```

### 问题：ChromaDB 连接失败

```bash
# 检查 ChromaDB 是否运行
curl http://localhost:8000/api/v1/version

# 如果没有运行：
docker run -d -p 8000:8000 chromadb/chroma
```

### 问题：Android APK 构建失败

```bash
# 检查环境变量
echo $ANDROID_HOME
echo $JAVA_HOME

# Linux 示例
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# 验证
adb version
java -version

# 详细错误日志
cd android && ./gradlew --stacktrace
```

### 问题：API 响应慢

可能原因：
1. OpenAI API 限流 → 升级账户或降低请求频率
2. ChromaDB 未优化 → 增加向量维度或使用更好的索引
3. 网络延迟 → 使用国内代理或本地部署

---

## 📊 性能优化

### 生产环境建议

1. **使用 Redis 缓存**
   ```bash
   docker run -d -p 6379:6379 redis:alpine
   ```

2. **CDN 加速**
   - 静态资源使用 Vercel/Cloudflare CDN
   - 配置缓存策略

3. **数据库优化**
   ```bash
   # ChromaDB 配置
   export CHROMA_SETTINGS__chroma_db_impl=duckdb+parquet
   export CHROMA_SETTINGS__persist_directory=/data/chroma
   ```

4. **PM2 进程管理**
   ```bash
   npm install -g pm2
   pm2 start npm --name "legalease" -- start
   pm2 save
   pm2 startup
   ```

---

## 📈 监控和日志

### 应用日志

```bash
# Docker
docker-compose logs -f app

# Systemd
journalctl -u legalease -f

# PM2
pm2 logs legalease
```

### 健康检查

```bash
# 检查服务状态
curl http://localhost:3000/api/health

# 预期响应
{"status":"ok","timestamp":"2024-03-25T..."}
```

---

## 🎯 下一步

安装完成后：

1. ✅ 配置你的 API Key
2. ✅ 测试基本功能（访问首页和聊天）
3. ✅ 导入更多法律数据（运行 `scripts/enhance-data.py`）
4. ✅ 自定义 UI（修改 Tailwind 配置）
5. ✅ 部署到生产环境（配置 HTTPS、域名）
6. ✅ 宣传推广（提交 Product Hunt、技术社区）

---

## 📞 需要帮助？

- **安装问题**：查看 [FAQ](docs/guide/chat/page.tsx)
- **Bug 报告**：[GitHub Issues](https://github.com/ENDcodeworld/legalease/issues)
- **功能请求**：[Discussions](https://github.com/ENDcodeworld/legalease/discussions)
- **贡献代码**：阅读 [CONTRIBUTING.md](CONTRIBUTING.md)

---

**祝你安装顺利！** 🎉
