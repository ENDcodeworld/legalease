# LegalEase Android APK 构建完整指南

## ⚡ 最快方式（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/legalease.git
cd legalease

# 2. 一键生成 APK
./scripts/build-apk.sh debug
# 或
./scripts/build-apk.sh release  # 需要配置签名

# 3. 找到 APK 文件
# 调试版: legalease-debug.apk (约 15-20 MB)
# 发布版: android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 环境准备

### 1. 安装依赖

```bash
# Node.js 18+
npm install

# 生成应用图标（需要 ImageMagick）
npm run icons
```

### 2. 安装 Android SDK

**macOS**:
```bash
brew install --cask android-sdk
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

**Linux**:
```bash
sudo apt-get install openjdk-17-jdk
wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
unzip commandlinetools-linux-*.zip -d $HOME/android-sdk
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows**: 下载 [Android Studio](https://developer.android.com/studio)

### 3. 验证安装

```bash
# 检查 Java
java -version  # 应显示 17+

# 检查 Android SDK
adb version

# 检查 Gradle（脚本会自动下载）
```

---

## 🔨 构建步骤详解

### 第一步：生成应用图标

```bash
npm run icons
```

这会生成以下图标：
- `public/icons/icon-72x72.png`
- `public/icons/icon-96x96.png`
- `public/icons/icon-128x128.png`
- `public/icons/icon-192x192.png`
- `public/icons/icon-512x512.png`
- 等...

> 💡 提示：如果没有 ImageMagick，可以手动下载图标或使用在线工具生成

### 第二步：初始化 Capacitor（首次）

```bash
# 安装依赖
npm install

# 添加 Android 平台
npx cap add android

# 这会创建 android/ 目录
```

### 第三步：构建 Web 应用

```bash
npm run build
```

这会在 `out/` 目录生成静态文件。

### 第四步：同步到 Android

```bash
npx cap sync android
```

复制 Web 文件到 Android 项目。

### 第五步：构建 APK

**调试版（快速测试）**：
```bash
./scripts/build-apk.sh debug
# 或
npm run android:debug
```

**发布版（上架应用商店）**：
```bash
./scripts/build-apk.sh release
# 或
npm run android:build
```

---

## 📱 安装 APK

### 传输到手机

```bash
# 方式1: USB
adb install legalease-debug.apk

# 方式2: 文件传输
# 将 APK 文件复制到手机，用文件管理器打开安装
```

### 启用未知来源安装

**Android 8+**:
1. 设置 → 安全 → 未知来源
2. 选择允许安装应用
3. 或点击 APK 时系统会提示

### 首次运行

1. 打开 LegalEase 应用
2. 首次启动需要加载 Web 资源（约 10-30 秒，取决于网络）
3. 输入你的 OpenAI API Key（或使用你配置的服务器）
4. 开始使用！

---

## 🔐 发布版签名配置

### 1. 生成签名密钥

```bash
keytool -genkey -v \
  -keystore keystore.jks \
  -alias legalease \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

输入密码和证书信息。

### 2. 移动密钥文件

```bash
mv keystore.jks android/app/
```

### 3. 修改 capacitor.config.ts

```typescript
android: {
  buildOptions: {
    signingType: 'apksigner',
    keystorePath: 'android/app/keystore.jks',
    keystorePassword: '你的密码',
    keystoreAlias: 'legalease',
    keystoreAliasPassword: '你的密码'
  }
}
```

### 4. 重新构建发布版

```bash
./scripts/build-apk.sh release
```

---

## 🎯 优化 APK 大小

### 当前大小
- 调试版：~15-20 MB
- 发布版：~10-15 MB（启用 ProGuard）

### 优化技巧

1. **启用 ProGuard**（已在 Release 配置）
2. **使用 App Bundle**（.aab）而非 APK：
   ```bash
   cd android && ./gradlew bundleRelease
   ```
3. **移除未使用的库**：检查 dependencies
4. **压缩图片资源**：使用 WebP 格式
5. **启用 R8 全代码优化**（默认已开启）

---

## 🐛 故障排查

### 问题：编译失败，提示 "SDK not found"

**解决**：
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 问题：APK 安装后闪退

**解决**：
```bash
# 查看日志
adb logcat | grep -i legalease

# 常见原因：
# 1. API Key 未配置 - 在设置中添加
# 2. 网络权限 - 已在 AndroidManifest.xml 中配置
```

### 问题：WebView 白屏

**解决**：
检查 `capacitor.config.ts` 中的 `server.androidScheme`：
- 调试：`http`
- 发布：`https`（需要 HTTPS 服务器）

### 问题：图标不显示

**解决**：
确保 `public/icons/` 目录下有所有尺寸的 PNG 文件，运行 `npm run icons` 重新生成。

---

## 📊 发布到应用商店

### Google Play Store

1. 注册 [Google Play Console](https://play.google.com/console)
2. 准备素材：
   - 应用图标（512x512）
   - 截图（至少 2 张，1080x1920）
   - 宣传图
   - 隐私政策链接
3. 上传 APK 或 App Bundle
4. 填写应用信息
5. 提交审核（1-7 天）

**费用**：一次性注册费 $25

### 国内应用商店

需要企业资质或个人开发者：
- 华为应用市场
- 小米应用商店
- OPPO 软件商店
- vivo 应用商店
- 腾讯应用宝

建议先上架 Google Play，再考虑国内渠道。

---

## 🔄 更新应用

### 热更新（推荐）

LegalEase 是 Web 应用，更新服务器端 Web 资源即可，无需重新发布 APK。

```bash
# 修改代码后重新部署 Web 服务器
npm run build
# 上传 out/ 目录到你的服务器或 Vercel
```

### 版本升级

如果需要修改原生功能：
1. 更新 `package.json` 中的 `version`
2. 修改 `android/app/build.gradle` 中的 `versionName` 和 `versionCode`
3. 重新构建 APK
4. 用户覆盖安装（签名密钥必须相同）

---

## 🛠️ 高级配置

### 自定义启动画面

编辑 `android/app/src/main/res/drawable/splashscreen.xml` 和 `strings.xml`。

### 添加原生插件

```bash
npm install @capacitor/camera
npx cap sync android
```

在 `MainActivity.java` 中注册插件。

### 配置深链接

在 `capacitor.config.ts` 中添加：
```typescript
server: {
  androidScheme: 'https',
  cleartext: true
}
```

---

## 📞 技术支持

- GitHub Issues: https://github.com/yourusername/legalease/issues
- 文档: https://legalease-docs.vercel.app
- 邮箱: support@legalease.dev

---

**祝你成功上架！** 🎉
