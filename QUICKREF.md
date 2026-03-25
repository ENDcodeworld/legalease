# LegalEase 快速参考

## 🚀 5分钟快速上手

### Android APK（推荐）
```bash
git clone https://github.com/ENDcodeworld/legalease.git
cd legalease
./scripts/build-apk.sh debug
# 安装 legalease-debug.apk 到手机
```

### Docker Web版
```bash
docker-compose up -d
# 访问 http://localhost:3000
```

### Vercel在线版
点击上方 "Deploy with Vercel" 按钮

---

## 📱 APK 构建命令

| 命令 | 说明 |
|------|------|
| `npm run icons` | 生成应用图标（需 ImageMagick）|
| `npm run apk` | 快速构建调试版 APK |
| `./scripts/build-apk.sh debug` | 构建调试版 |
| `./scripts/build-apk.sh release` | 构建发布版（需签名）|
| `npm run android:open` | 在 Android Studio 中打开 |

---

## 🛠️ 环境要求

- **Node.js**: 18+
- **Java**: JDK 17+
- **Android SDK**: API 22+ (minSdkVersion)
- **ImageMagick**: 生成图标（可选）

---

## 📂 关键文件

```
legalease/
├── app/
│   ├── chat/page.tsx       # 聊天界面
│   ├── api/chat/route.ts   # AI API
│   └── components/         # React 组件
├── data/
│   ├── laws/              # 法律数据
│   └── cases/             # 案例数据
├── scripts/
│   ├── build-apk.sh       # APK 构建脚本 ⭐
│   ├── generate-icons.sh  # 图标生成
│   └── init.sh            # 项目初始化
├── android/               # Android 项目（首次运行生成）
├── capacitor.config.ts    # Capacitor 配置
├── ANDROID_BUILD.md       # Android 完整文档
└── README.md              # 项目说明
```

---

## 🔧 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run lint             # 代码检查

# 数据
npm run data:process     # 处理法律数据
npm run data:embed       # 生成向量嵌入

# Docker
docker-compose up -d     # 启动服务
docker-compose logs -f   # 查看日志

# Android
npm run apk              # 构建 APK（快速）
npm run android:debug    # 调试版
npm run android:build    # 发布版
```

---

## 📱 应用信息

- **应用ID**: `com.legalease.app`
- **版本**: `0.1.0`
- **minSdk**: 22 (Android 5.1+)
- **targetSdk**: 34 (Android 14)
- **大小**: ~15-20 MB (调试版)

---

## ⚡ 快速故障排查

| 问题 | 解决 |
|------|------|
| `ANDROID_HOME not set` | 设置环境变量 |
| `SDK not found` | 安装 Android SDK |
| APK 闪退 | 检查 API Key 配置 |
| 图标不显示 | 运行 `npm run icons` |
| 编译失败 | 确保 Java 17+ |

---

## 📚 更多文档

- [README.md](README.md) - 项目介绍
- [ANDROID_BUILD.md](ANDROID_BUILD.md) - Android 详细文档
- [CONTRIBUTING.md](CONTRIBUTING.md) - 如何贡献
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [data/README.md](data/README.md) - 数据说明

---

## 🎯 目标：1000 Stars！

如果觉得项目有用，请 Star 支持！⭐

[GitHub](https://github.com/ENDcodeworld/legalease) | [Discord](https://discord.gg/your-invite)
