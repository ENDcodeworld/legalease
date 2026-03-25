# 部署指南

本指南将帮助你快速部署 LegalEase 到各种环境。

## 📦 部署方式对比

| 方式 | 难度 | 成本 | 适合人群 |
|------|------|------|----------|
| **Docker** | ⭐ Easy | $0-5/月 | 所有人 |
| **Vercel** | ⭐ Easy | $0-20/月 | 前端开发者 |
| **本地运行** | ⭐⭐ Medium | $0 | 开发者 |
| **云服务器** | ⭐⭐⭐ Hard | $5-50/月 | 运维人员 |

---

## 方式一：Docker（推荐）

### 前置要求
- Docker 20+
- Docker Compose 2+

### 步骤

1. **克隆项目**

```bash
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease
```

2. **配置环境变量**

```bash
cp .env.example .env
# 编辑 .env，填入你的 API 密钥
nano .env
```

3. **启动服务**

```bash
# 构建并启动所有容器
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

4. **访问应用**

打开浏览器访问：http://localhost:3000

### 生产环境优化

```bash
# 使用生产配置文件
cp docker-compose.prod.yml docker-compose.yml

# 添加 Nginx 反向代理（推荐）
docker-compose -f docker-compose.prod.yml up -d
```

---

## 方式二：Vercel（最简单）

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/clone?repository-url=https%3A%2F%2Fgithub.com%2FENDcodeworld%2Flegalease)

点击按钮，按照提示操作即可。

### 配置环境变量

在 Vercel Dashboard 中：

1. 进入项目 → Settings → Environment Variables
2. 添加以下变量：
   - `OPENAI_API_KEY` - 你的 OpenAI API Key
   - `ANTHROPIC_API_KEY` - （可选）Anthropic API Key
3. Redeploy 项目

### 注意事项

- Vercel 不提供持久化存储，向量数据库需使用外部服务
- 推荐使用 [Chroma Cloud](https://chromadb.cloud/) 或自建 ChromaDB 服务
- 修改 `app/api/chat/route.ts` 中的 ChromaDB 连接配置

---

## 方式三：本地运行（开发）

### 前置要求
- Node.js 18+
- npm 或 yarn
- Python 3.10+（用于数据处理脚本）

### 步骤

1. **克隆并安装**

```bash
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease
npm install
```

2. **配置环境**

```bash
cp .env.example .env.local
# 编辑 .env.local
nano .env.local
```

3. **准备数据**

```bash
# 下载示例数据
python3 scripts/download-data.py

# 处理数据
npm run data:process

# 生成向量（需要 OpenAI API Key）
npm run data:embed
```

4. **启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:3000

5. **构建生产版本**

```bash
npm run build
npm start
```

---

## 方式四：云服务器（Ubuntu）

### 1. 服务器准备

```bash
# 登录服务器
ssh root@your-server-ip

# 更新系统
apt update && apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装 Docker Compose
apt install docker-compose-plugin -y

# 启动 Docker
systemctl start docker
systemctl enable docker
```

### 2. 部署应用

```bash
# 创建部署目录
mkdir -p /opt/legalease
cd /opt/legalease

# 拉取代码
git clone https://github.com/ENDcodeworld/legalease.git .

# 配置环境
cp .env.example .env
nano .env  # 填入 API Key

# 启动服务
docker-compose up -d

# 设置开机自启
docker-compose restart always
```

### 3. 配置 Nginx（推荐）

```bash
# 安装 Nginx
apt install nginx -y

# 创建配置文件
nano /etc/nginx/sites-available/legalease
```

内容：
```nginx
server {
    listen 80;
    server_name your-domain.com;

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

```bash
# 启用配置
ln -s /etc/nginx/sites-available/legalease /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# 安装 SSL（Let's Encrypt）
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com
```

### 4. 防火墙配置

```bash
# 开放端口
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```

---

## 🔧 数据库配置

### 使用 ChromaDB 持久化

#### 选项 A：本地文件系统（简单）

```env
# .env 中配置
CHROMA_PERSIST_DIR=/app/data/chroma
```

#### 选项 B：Chroma Cloud（推荐生产）

1. 注册 [Chroma Cloud](https://chromadb.cloud/)
2. 获取连接信息
3. 修改 `app/api/chat/route.ts`：

```typescript
const chroma = new ChromaClient({
  path: 'https://your-chroma-instance.chromadb.cloud',
  auth: {
    provider: 'token',
    credentials: 'your-api-token',
  },
});
```

#### 选项 C：自建 ChromaDB 服务

```bash
docker run -d \
  -p 8000:8000 \
  -v chroma_data:/chroma/chroma_storage \
  chromadb/chroma:latest
```

---

## 📊 监控与维护

### 查看日志

```bash
# Docker
docker-compose logs -f app

# 系统服务
journalctl -u legalease -f
```

### 更新应用

```bash
cd /opt/legalease
git pull origin main
docker-compose down
docker-compose build --no-cache app
docker-compose up -d
```

### 备份数据

```bash
# 备份向量数据库
tar -czf chroma_backup_$(date +%Y%m%d).tar.gz data/chroma/

# 上传到云存储（示例：Backblaze B2）
b2 sync data/chroma/ b2://your-bucket/legalease-backup/
```

### 性能优化

1. **启用缓存**（Redis）

```bash
docker-compose add redis service
```

2. **使用 CDN**（静态资源）
3. **数据库索引优化**（ChromaDB）
4. **API 限流**（Nginx rate limiting）

---

## 🐛 故障排查

### 问题：API 返回 500 错误

- 检查 `OPENAI_API_KEY` 是否有效
- 查看日志：`docker-compose logs app`
- 确认 ChromaDB 已启动：`curl http://localhost:8000/api/v1/version`

### 问题：向量检索慢

- 增加 ChromaDB 资源（CPU/内存）
- 使用更小的 embedding 模型（如 `text-embedding-3-small`）
- 实施结果缓存

### 问题：Docker 容器无法启动

```bash
# 查看容器状态
docker ps -a

# 进入容器调试
docker-compose exec app /bin/sh

# 查看资源使用
docker stats
```

---

## 📈 上线清单

- [ ] 配置 HTTPS（SSL 证书）
- [ ] 设置域名解析（A 记录）
- [ ] 添加监控（UptimeRobot、Sentry）
- [ ] 配置日志聚合（Logtail、Datadog）
- [ ] 设置自动备份
- [ ] 实施 API 限流
- [ ] 优化数据库性能
- [ ] 添加错误追踪
- [ ] 准备应急预案
- [ ] 提交到搜索引擎（Google、Bing）

---

## 🎯 追求 1000 Star

部署完成后，别忘了：

1. ✅ 完善 README（添加截图、GIF）
2. ✅ 发布到 Product Hunt、Hacker News
3. ✅ 在技术社区宣传（V2EX、Reddit、知乎）
4. ✅ 持续更新，积极回应 Issue
5. ✅ 添加徽章（Build、Discord、Contributors）
6. ✅ 制作演示视频（YouTube、B站）
7. ✅ 写技术博客，分享架构设计

**加油！目标是下个月 1000 Star！** 🚀
