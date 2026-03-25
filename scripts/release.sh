#!/usr/bin/env bash

# LegalEase 项目发布准备脚本
# 用法：./scripts/release.sh [version]

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "请输入版本号，例如：0.2.0"
    read VERSION
fi

echo "🚀 LegalEase 发布准备 v$VERSION"
echo "================================"

# 1. 检查 Git 状态
echo "\n📋 检查 Git 状态..."
if ! git diff-index --quiet HEAD --; then
    echo "❌ 有未提交的更改，请先提交"
    git status
    exit 1
fi
echo "✅ Git 状态干净"

# 2. 更新版本号
echo "\n📝 更新版本号..."
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
rm package.json.bak
echo "✅ package.json 更新为 v$VERSION"

# 3. 运行 lint
echo "\n🔍 运行代码检查..."
npm run lint || echo "⚠️  Lint 发现问题，但继续发布..."

# 4. 构建测试
echo "\n🏗️  构建项目..."
npm run build

# 5. 运行测试（如果有）
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    echo "\n🧪 运行测试..."
    npm test
fi

# 6. 生成 CHANGELOG
echo "\n📜 更新 CHANGELOG..."
echo "请手动更新 CHANGELOG.md，添加 v$VERSION 的变更日志"

# 7. 提交更改
echo "\n💾 提交版本更新..."
git add package.json CHANGELOG.md
git commit -m "chore: release v$VERSION"

# 8. 创建 Git Tag
echo "\n🏷️  创建 Git Tag..."
git tag -a "v$VERSION" -m "Release version $VERSION"

# 9. 推送到 GitHub
echo "\n📤 推送到 GitHub..."
git push origin main
git push origin "v$VERSION"

# 10. 创建 GitHub Release（需要 gh CLI）
if command -v gh &> /dev/null; then
    echo "\n🎉 创建 GitHub Release..."
    gh release create "v$VERSION" \
        --title "v$VERSION" \
        --notes "查看 [CHANGELOG.md](https://github.com/yourusername/legalease/blob/main/CHANGELOG.md) 了解更新内容"
else
    echo "\n⚠️  未找到 gh CLI，请手动创建 GitHub Release"
    echo "访问：https://github.com/yourusername/legalease/releases/new"
fi

# 11. 构建 Docker 镜像
echo "\n🐳 构建 Docker 镜像..."
docker build -t "legalease:v$VERSION" .
docker tag "legalease:v$VERSION" "legalease:latest"

# 12. 推送 Docker 镜像（可选）
read -p "是否推送 Docker 镜像到 GitHub Container Registry？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker tag "legalease:v$VERSION" "ghcr.io/yourusername/legalease:v$VERSION"
    docker tag "legalease:v$VERSION" "ghcr.io/yourusername/legalease:latest"
    docker push "ghcr.io/yourusername/legalease:v$VERSION"
    docker push "ghcr.io/yourusername/legalease:latest"
    echo "✅ Docker 镜像已推送"
fi

echo "\n✨ 发布完成！"
echo ""
echo "📋 后续步骤："
echo "  1. 在 GitHub Releases 页面添加二进制文件（如需要）"
echo "  2. 更新 Vercel 项目（如果使用）"
echo "  3. 在社区公告新版本"
echo "  4. 更新文档"
echo ""
echo "🎯 别忘了宣传你的项目，冲击 1000 Star！"
