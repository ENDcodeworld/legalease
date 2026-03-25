#!/usr/bin/env bash

# LegalEase Android APK 构建脚本
# 用法: ./scripts/build-apk.sh [debug|release]

set -e

MODE=${1:-debug}

echo "🤖 LegalEase APK 构建脚本"
echo "================================"

# 1. 检查依赖
echo "\n📦 检查依赖..."

if ! command -v npm &> /dev/null; then
    echo "❌ 未找到 npm，请先安装 Node.js"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "❌ 未找到 npx"
    exit 1
fi

# 2. 安装依赖
echo "\n📥 安装项目依赖..."
npm install

# 3. 构建 Web 应用
echo "\n🔨 构建 Web 应用..."
npm run build

# 4. 同步到 Capacitor
echo "\n🔄 同步到 Capacitor..."
npx cap sync android

# 5. 构建 APK
if [ "$MODE" = "release" ]; then
    echo "\n🔐 构建发布版 APK..."
    echo "⚠️  注意：需要配置签名密钥"
    echo "请确保 android/app/keystore.jks 文件存在"
    echo "或修改 capacitor.config.ts 中的 signingType"
    cd android && ./gradlew assembleRelease
    APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
else
    echo "\n🔨 构建调试版 APK..."
    cd android && ./gradlew assembleDebug
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
fi

# 6. 检查 APK 是否生成
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "\n✅ APK 构建成功！"
    echo "📁 位置: $APK_PATH"
    echo "📊 大小: $APK_SIZE"
    
    # 复制到根目录方便查找
    cp "$APK_PATH" "../legalease-$MODE.apk"
    echo "📱 已复制到: ../legalease-$MODE.apk"
    
    echo "\n📋 下一步："
    echo "  1. 将 APK 文件传输到 Android 设备"
    echo "  2. 在设备上启用'未知来源'安装"
    echo "  3. 安装并运行应用"
    
    if [ "$MODE" = "release" ]; then
        echo "\n⚠️  发布版 APK 需要签名："
        echo "  - 生成签名密钥: keytool -genkey -v -keystore keystore.jks -alias alias_name -keyalg RSA -keysize 2048 -validity 10000"
        echo "  - 修改 capacitor.config.ts 中的签名配置"
    fi
else
    echo "\n❌ APK 构建失败"
    exit 1
fi

echo "\n🎉 完成！"
