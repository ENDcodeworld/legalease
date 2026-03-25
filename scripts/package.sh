#!/usr/bin/env bash

# LegalEase 项目打包脚本
# 用法：./scripts/package.sh [version]

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "请输入版本号，例如：0.2.0"
    read VERSION
fi

echo "📦 LegalEase 项目打包 v$VERSION"
echo "================================"

# 创建发布目录
RELEASE_DIR="release"
mkdir -p "$RELEASE_DIR"

# 清理不必要的文件
echo "\n🧹 清理临时文件..."
rm -rf .next .vercel .env.local node_modules/.cache

# 创建压缩包
echo "\n📦 创建压缩包..."
PROJECT_NAME="legalease-v$VERSION"
tar -czf "$RELEASE_DIR/$PROJECT_NAME.tar.gz" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='data/chroma' \
  --exclude='*.log' \
  --exclude='.env.local' \
  .

# 计算大小
SIZE=$(du -h "$RELEASE_DIR/$PROJECT_NAME.tar.gz" | cut -f1)

echo "\n✅ 打包完成！"
echo "📁 文件位置: $RELEASE_DIR/$PROJECT_NAME.tar.gz"
echo "📊 文件大小: $SIZE"
echo ""
echo "📋 发布清单："
echo "  1. 压缩包: $PROJECT_NAME.tar.gz"
echo "  2. 上传到 GitHub Releases"
echo "  3. 更新文档和 README"
echo ""
echo "🚀 准备发布吧！"
