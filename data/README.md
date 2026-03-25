# LegalEase 数据目录

## 📁 目录结构

```
data/
├── raw/              # 原始数据（不提交到 Git）
│   ├── laws/        # 法律法规原始 JSON
│   └── cases/       # 案例原始 JSON
├── processed/       # 处理后的数据（可提交示例）
│   ├── articles.json
│   └── cases.json
├── chroma/          # ChromaDB 向量数据库（自动生成）
└── README.md        # 数据说明文档
```

## 🚀 快速开始

### 1. 下载原始数据

```bash
python3 scripts/download-data.py
```

### 2. 处理数据

```bash
npm run data:process
```

### 3. 生成向量嵌入

```bash
npm run data:embed
```

## 📊 数据格式

### 法律法规 JSON

```json
{
  "id": "law_001",
  "title": "中华人民共和国民法典",
  "category": "民事",
  "pub_date": "2020-05-28",
  "effective_date": "2021-01-01",
  "source": "全国人民代表大会",
  "source_url": "http://www.npc.gov.cn/...",
  "chapters": [
    {
      "id": "chapter_1",
      "title": "第一编 总则",
      "articles": [
        {
          "id": "article_1",
          "number": "第一条",
          "title": "立法目的",
          "content": "为了保护民事主体的合法权益..."
        }
      ]
    }
  ]
}
```

### 案例 JSON

```json
{
  "id": "case_001",
  "case_no": "（2023）京0105民初12345号",
  "title": "张某诉李某民间借贷纠纷案",
  "court": "北京市朝阳区人民法院",
  "date": "2023-10-15",
  "cause": "民间借贷纠纷",
  "judgment_result": "...",
  "facts": "...",
  "legal_basis": [],
  "keywords": [],
  "source_url": "https://wenshu.court.gov.cn/..."
}
```

## 🔗 数据来源

- **法律法规**: [全国人大法律法规库](http://www.npc.gov.cn)
- **案例**: [中国裁判文书网](https://wenshu.court.gov.cn)
- **司法解释**: [最高人民法院](http://www.court.gov.cn)

## ⚠️ 注意事项

- 法律法规数据应定期更新（至少每季度一次）
- 案例数据需遵守裁判文书网的爬虫协议
- 不要将包含个人隐私的案例数据提交到公开仓库
- 使用数据时请注明来源

## 🤝 贡献数据

欢迎贡献更多法律数据！

1. 确保数据来源合法、公开
2. 按照上述格式整理 JSON
3. 提交 Pull Request 到 `data/raw/` 目录
4. 运行处理脚本生成向量

---

Made with ❤️ by LegalEase Team
