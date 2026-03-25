#!/usr/bin/env bash

# LegalEase 完整项目打包脚本
# 打包所有文件，包括 Android 项目

set -e

VERSION=${1:-"0.2.0"}
PROJECT_NAME="legalease-v$VERSION"
OUTPUT_DIR="release"
APK_FILE=""

echo "📦 LegalEase 完整项目打包"
echo "================================"
echo "版本: $VERSION"
echo ""

# 1. 检查必要文件
echo "🔍 检查项目文件..."
REQUIRED_FILES=(
  "package.json"
  "capacitor.config.ts"
  "README.md"
  "app/page.tsx"
  "scripts/build-apk.sh"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少文件: $file"
        exit 1
    fi
    echo "  ✅ $file"
done

# 2. 清理构建产物
echo "\n🧹 清理临时文件..."
rm -rf .next out .vercel node_modules/.cache
rm -f legalease-*.apk

# 3. 生成图标（如果缺失）
echo "\n🎨 检查应用图标..."
if [ -z "$(ls public/icons/*.png 2>/dev/null)" ]; then
    echo "  图标不存在，尝试生成..."
    if command -v convert &> /dev/null; then
        npm run icons
    else
        echo "  ⚠️  ImageMagick 未安装，跳过图标生成"
        echo "  注意：APK 可能缺少图标"
    fi
fi

# 4. 构建 Web 应用
echo "\n🔨 构建 Web 应用..."
npm run build

# 5. 生成 APK（调试版）
echo "\n🤖 构建 Android APK..."
if [ -d "android" ]; then
    echo "  检测到 Android 项目，同步..."
    npx cap sync android
    
    echo "  构建调试版 APK..."
    cd android && ./gradlew assembleDebug
    
    if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
        APK_FILE="android/app/build/outputs/apk/debug/app-debug.apk"
        cp "$APK_FILE" "../legalease-debug.apk"
        echo "  ✅ APK 已生成: legalease-debug.apk"
    else
        echo "  ⚠️  APK 构建失败，可能需要配置 Android SDK"
    fi
else
    echo "  ⚠️  Android 项目不存在，跳过 APK 构建"
    echo "  运行 'npx cap add android' 首次添加"
fi

# 6. 创建发布压缩包
echo "\n📦 创建发布包..."
mkdir -p "$OUTPUT_DIR"

# 排除大文件
EXCLUDES=(
  "--exclude=node_modules"
  "--exclude=.next"
  "--exclude=out"
  "--exclude=.git"
  "--exclude=data/chroma"
  "--exclude=*.log"
  "--exclude=.env.local"
  "--exclude=android/.gradle"
  "--exclude=android/build"
  "--exclude=android/.cxx"
  "--exclude=android/.externalNativeBuild"
)

tar -czf "$OUTPUT_DIR/$PROJECT_NAME.tar.gz" \
  "${EXCLUDES[@]}" \
  .

# 如果有 APK，单独打包
if [ -f "legalease-debug.apk" ]; then
    cp legalease-debug.apk "$OUTPUT_DIR/"
    echo "  ✅ APK 已包含在发布包中"
fi

# 7. 输出信息
echo "\n" + "="*50
echo "✅ 打包完成！"
echo "="*50
echo ""
echo "📁 发布文件："
ls -lh "$OUTPUT_DIR/"

echo ""
echo "📋 发布清单："
echo "  1. 代码包: $PROJECT_NAME.tar.gz"
if [ -f "$OUTPUT_DIR/legalease-debug.apk" ]; then
    echo "  2. 调试版 APK: legalease-debug.apk"
fi
echo ""
echo "🚀 下一步："
echo "  1. 推送到 GitHub"
echo "  2. 创建 GitHub Release"
echo "  3. 上传发布文件"
echo "  4. 更新文档和演示站点"
echo ""
echo "💡 提示："
echo "  - 发布版 APK 需要配置签名密钥"
echo "  - 查看 ANDROID_BUILD.md 了解详情"
echo "  - 使用 './scripts/release.sh' 自动化发布流程"
