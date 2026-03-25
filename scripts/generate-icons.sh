#!/usr/bin/env bash

# LegalEase 应用图标生成脚本
# 需要 ImageMagick (convert)

set -e

echo "🎨 LegalEase 应用图标生成器"
echo "=============================="

# 检查 ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ 未找到 ImageMagick，请先安装："
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: 下载安装包"
    exit 1
fi

# 创建图标目录
ICON_DIR="public/icons"
mkdir -p "$ICON_DIR"

# 基础参数
SIZES=(72 96 128 144 152 192 384 512)
BASE_COLOR="#2563EB"
TEMP_SVG="/tmp/legalease_icon.svg"

# 创建基础 SVG
cat > "$TEMP_SVG" << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="60" fill="#2563EB"/>
  <g transform="translate(80, 100)">
    <!-- 天平底座 -->
    <rect x="40" y="260" width="372" height="30" rx="5" fill="white"/>
    <!-- 支柱 -->
    <rect x="156" y="100" width="140" height="160" fill="white"/>
    <!-- 横梁 -->
    <rect x="40" y="100" width="372" height="30" rx="5" fill="white"/>
    <!-- 左盘 -->
    <ellipse cx="100" cy="80" rx="60" ry="30" fill="white"/>
    <!-- 右盘 -->
    <ellipse cx="352" cy="80" rx="60" ry="30" fill="white"/>
  </g>
</svg>
EOF

echo "📐 生成图标..."

for size in "${SIZES[@]}"; do
    convert "$TEMP_SVG" -resize "${size}x${size}" "$ICON_DIR/icon-${size}x${size}.png"
    echo "  ✅ icon-${size}x${size}.png"
done

# 创建 maskable 版本（192x192 和 512x512）
for size in 192 512; do
    if [ -f "$ICON_DIR/icon-${size}x${size}.png" ]; then
        cp "$ICON_DIR/icon-${size}x${size}.png" "$ICON_DIR/icon-${size}x${size}-maskable.png"
        echo "  ✅ icon-${size}x${size}-maskable.png (maskable 版本)"
    fi
done

# 清理
rm "$TEMP_SVG"

echo "\n✨ 图标生成完成！"
echo "📁 图标保存在: $ICON_DIR"
echo "\n💡 提示："
echo "   - 如需修改颜色，编辑脚本中的 BASE_COLOR 变量"
echo "   - 如需自定义设计，替换 public/icons/ 下的 PNG 文件"
echo "   - 建议使用 512x512 作为主图标"
