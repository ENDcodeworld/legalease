# LegalEase - 法律援助智能助手

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/legalease?style=social)](https://github.com/yourusername/legalease)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Discord](https://img.shields.io/badge/chat-on%20discord-7289DA)](https://discord.gg/your-invite)
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/legalease/ci.yml?branch=main)](https://github.com/yourusername/legalease/actions)
[![codecov](https://codecov.io/gh/yourusername/legalease/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/legalease)
[![Contributors](https://img.shields.io/github/contributors/yourusername/legalease.svg)](https://github.com/yourusername/legalease/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/yourusername/legalease.svg)](https://github.com/yourusername/legalease/network)
[![Issues](https://img.shields.io/github/issues/yourusername/legalease.svg)](https://github.com/yourusername/legalease/issues)

> 🎯 **使命**：让每个人都能轻松获得法律援助，降低法律咨询门槛  
> 🚀 **目标**：下个月突破 **1000 GitHub Stars**  
> 📱 **现在支持 Android APK** - 一键安装，随时随地使用！

---

## 🌟 为什么要做 LegalEase？

### 现实痛点
- 🤔 **普通人遇到法律问题怎么办？** - 百度搜索？看不懂法条。请律师？太贵。
- 📚 **法条太多找不到** - 《民法典》1260条，哪条适用于我？
- ⚖️ **案例看不懂** - 裁判文书网几十万案例，怎么参考？
- 💸 **法律援助难获取** - 条件苛刻，排队时间长

### LegalEase 的答案
| 传统方式 | LegalEase |
|---------|-----------|
| ❌ 百度搜索 - 广告多、质量差 | ✅ AI 智能问答 - 直接、准确 |
| ❌ 翻法条 - 大海捞针 | ✅ 语义检索 - 秒级找到相关法条 |
| ❌ 看判决书 - 几十页PDF | ✅ 案例解读 - 提炼关键信息 |
| ❌ 请律师 - 每小时几百上千 | ✅ 免费开源 - 自己部署无限用 |
| ❌ 只能在电脑用 | ✅ **Android APK** - 手机随时用！📱 |

---

## 🚀 快速开始（3 分钟）

### 方式一：Android APK（最新！）⭐

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/legalease.git
cd legalease

# 2. 一键生成 APK
./scripts/build-apk.sh debug

# 3. 安装到手机
# 将 legalease-debug.apk 复制到手机并安装
```

**详细文档**: [ANDROID_BUILD.md](ANDROID_BUILD.md)

### 方式二：Docker（推荐）

```bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  ghcr.io/yourusername/legalease:latest
```

### 方式三：Vercel 一键部署 ⚡

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Flegalease)

### 方式四：本地运行

```bash
git clone https://github.com/yourusername/legalease.git
cd legalease
npm install
npm run dev
```

---

## 📦 功能特性

### 🎯 核心功能

- **智能法律问答**：输入民事、刑事、行政问题，AI 给出专业解答
- **法条检索**：输入关键词，快速找到相关法律法规
- **案例搜索**：查询类似案例，了解判决结果
- **文书生成**：自动生成起诉状、答辩状等法律文书模板
- **法律计算器** ⭐ **NEW**：诉讼费、赔偿金、工伤待遇自动计算
- **多模型支持** ⭐ **NEW**：OpenAI GPT-4 / Anthropic Claude / 本地 Ollama

### 📱 多平台支持

- ✅ **Android APK** - 原生应用，离线可用（PWA）
- ✅ **Web 应用** - 响应式设计，手机电脑都能用
- ✅ **PWA 支持** - 可安装到主屏幕，像原生App一样
- ✅ **微信小程序** - 开发中...

### 🔧 技术亮点

- **向量数据库**：使用 ChromaDB 存储法条和案例，快速语义检索
- **多模型支持**：OpenAI GPT、Claude、本地 Ollama 均可
- **RAG 架构**：确保回答基于真实法律条文，减少幻觉
- **响应式设计**：手机、平板、电脑完美适配
- **PWA 支持**：可安装为桌面应用，离线使用部分功能

---

## 🏗️ 项目结构

```
legalease/
├── app/              # Next.js 应用
│   ├── api/         # API 路由
│   ├── components/  # React 组件
│   └── lib/         # 工具函数
├── data/            # 法律数据（法条、案例）
│   ├── laws/        # 法律法规 JSON
│   └── cases/       # 典型案例 JSON
├── scripts/         # 数据处理脚本
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

### 📊 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 14.2 | React 全栈框架 |
| **TypeScript** | 5.5 | 类型安全 |
| **Tailwind CSS** | 3.4 | 样式框架 |
| **ChromaDB** | 1.7 | 向量数据库 |
| **LangChain** | 0.2 | AI 编排 |
| **OpenAI GPT-4** | - | 核心模型 |
| **Anthropic Claude** | - | 替代模型 |
| **Ollama** | - | 本地部署 |
| **Capacitor** | 6.0 | 跨平台移动框架 |
| **Docker** | 20+ | 容器化部署 |
| **Vercel** | - | 云端托管 |
| **Zustand** | 4.5 | 状态管理 |

---

## 🤝 贡献指南

我们非常欢迎社区贡献！无论是：

- 🐛 提交 Bug 报告
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交 Pull Request

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

---

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🙏 致谢

- 数据来源：[国家法律法规数据库](http://www.npc.gov.cn)
- 案例来源：[中国裁判文书网](https://wenshu.court.gov.cn)
-  inspired by [Lawyer LLaMA](https://github.com/AndrewZhe/lawyer-llama)

---

## ⭐ Star 历史

- 2024-03-xx: 0 → 100 ⭐
- 2024-04-xx: 100 → 500 ⭐
- 2024-05-xx: 500 → 1000 ⭐ 🎉

**目标是下个月达到 1000 star，你确定要加入吗？**

[👉 立即 Star 支持我们](https://github.com/yourusername/legalease/stargazers)
