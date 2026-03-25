#!/usr/bin/env bash

# LegalEase 快速启动脚本
# 用法：./scripts/start.sh [dev|prod]

set -e

MODE=${1:-dev}

echo "🚀 LegalEase 启动脚本"
echo "========================"

if [ "$MODE" = "dev" ]; then
    echo "📦 启动开发服务器..."
    npm run dev
    
elif [ "$MODE" = "prod" ]; then
    echo "🏗️  构建生产版本..."
    npm run build
    npm start
    
else
    echo "❌ 未知模式: $MODE"
    echo "用法: $0 [dev|prod]"
    exit 1
fi
