#!/usr/bin/env bash

# LegalEase 项目初始化脚本
# 用法：./scripts/init.sh

set -e

echo "🚀 LegalEase 项目初始化"
echo "=============================="

# 1. 检查 Node.js
echo "📦 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本需要 18+，当前版本：$(node --version)"
    exit 1
fi
echo "✅ Node.js $(node --version)"

# 2. 安装依赖
echo "\n📦 安装依赖..."
if [ -f "package-lock.json" ]; then
    npm ci
else
    npm install
fi

# 3. 创建环境变量文件
echo "\n🔐 配置环境变量..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "✅ .env.local 已创建"
    echo "⚠️  请编辑 .env.local 填入你的 API 密钥"
else
    echo "✅ .env.local 已存在"
fi

# 4. 准备数据目录
echo "\n📁 准备数据目录..."
mkdir -p data/chroma
mkdir -p data/raw/laws
mkdir -p data/raw/cases
mkdir -p data/processed
echo "✅ 数据目录已创建"

# 5. 下载示例数据
echo "\n📥 下载示例数据..."
if command -v python3 &> /dev/null; then
    python3 scripts/download-data.py
else
    echo "⚠️  Python3 未安装，跳过数据下载"
    echo "   请手动下载数据到 data/raw/ 目录"
fi

# 6. 处理数据
echo "\n🔄 处理数据..."
npm run data:process || echo "⚠️  数据处理失败，请检查数据文件"

# 7. 生成向量（需要 API Key）
if [ -f ".env.local" ] && grep -q "OPENAI_API_KEY=your_" .env.local; then
    echo "\n⚠️  请在 .env.local 中配置有效的 OPENAI_API_KEY 后运行："
    echo "   npm run data:embed"
else
    echo "\n🧠 生成向量嵌入..."
    npm run data:embed || echo "⚠️  向量生成失败，请检查 API 密钥"
fi

# 8. 完成
echo "\n✨ 初始化完成！"
echo ""
echo "📋 接下来的步骤："
echo "   1. 编辑 .env.local 配置 API 密钥"
echo "   2. 运行 npm run dev 启动开发服务器"
echo "   3. 访问 http://localhost:3000"
echo ""
echo "🐳 或使用 Docker（推荐）："
echo "   docker-compose up -d"
echo "   然后访问 http://localhost:3000"
echo ""
echo "📚 文档："
echo "   - README.md - 项目介绍"
echo "   - CONTRIBUTING.md - 贡献指南"
echo "   - data/README.md - 数据说明"
echo ""
echo "💡 提示："
echo "   当前是演示版本，聊天功能返回示例响应"
echo "   配置好真实数据和 API 密钥后即可使用完整功能"
echo ""
echo "🚀 祝你 Star 破千！加油！💪"
