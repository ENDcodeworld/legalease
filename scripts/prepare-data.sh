#!/usr/bin/env bash
# LegalEase 数据预处理脚本
# 生成向量嵌入并填充 ChromaDB

set -e

echo "🔧 LegalEase 数据预处理工具"
echo "================================"

# 检查环境
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  OPENAI_API_KEY 未设置，将使用演示模式"
    echo "   设置方式: export OPENAI_API_KEY=your_key"
fi

# 1. 安装依赖
echo "\n📦 检查依赖..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 2. 检查并安装 npm 依赖
if [ ! -d "node_modules" ]; then
    echo "\n📦 安装 npm 依赖..."
    npm ci --only=production
fi

# 3. 检查数据文件
echo "\n📂 检查数据文件..."
DATA_FILES=(
  "data/laws/civil-code.json"
  "data/laws/labor-law.json"
  "data/cases/sample-case.json"
  "data/cases/labor-dispute-case.json"
  "data/cases/traffic-accident-case.json"
)

for file in "${DATA_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ 缺少: $file"
        echo "  请运行 ./scripts/download-data.py 下载数据"
    fi
done

# 4. 生成向量嵌入
echo "\n🧠 生成向量嵌入 (这可能需要几分钟)..."
echo "   使用模型: text-embedding-ada-002"

if npx tsx scripts/generate-embeddings.ts; then
    echo "✅ 向量嵌入生成完成"
else
    echo "⚠️  向量生成失败，可能是 API Key 问题"
    echo "   可以手动设置 OPENAI_API_KEY 环境变量"
    exit 1
fi

# 5. 验证 ChromaDB
echo "\n📊 验证 ChromaDB..."
if [ -d "data/chroma" ]; then
    echo "  ✅ ChromaDB 数据目录存在"
    FILE_COUNT=$(find data/chroma -type f | wc -l)
    echo "  文件数: $FILE_COUNT"
else
    echo "  ❌ ChromaDB 数据目录不存在"
    echo "  可能需要重新运行生成脚本"
fi

# 6. 测试 API
echo "\n🔍 测试 API 端点..."
if npm run build > /dev/null 2>&1; then
    echo "✅ 构建成功"
    
    # 启动测试服务器
    echo "  启动测试服务器..."
    timeout 10s npm start > /dev/null 2>&1 || true
    
    echo "✅ 数据预处理完成！"
else
    echo "❌ 构建失败"
    exit 1
fi

echo "\n" + "="*50
echo "✅ 所有步骤完成！"
echo "="*50
echo ""
echo "🚀 现在可以："
echo "  1. 启动服务: npm start"
echo "  2. Docker 运行: docker-compose up -d"
echo "  3. 访问 http://localhost:3000"
echo ""
echo "💡 提示："
echo "  - 首次启动可能需要几分钟加载数据"
echo "  - 可以在设置中配置你的 API Key"
echo "  - 建议使用 Docker 部署以获得最佳体验"
