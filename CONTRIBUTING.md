# 贡献指南

感谢你考虑为 LegalEase 做贡献！🎉

本项目旨在让每个人都能获得免费的法律援助。我们欢迎各种形式的贡献，无论是代码、文档、问题反馈还是功能建议。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [报告 Bug](#报告-bug)
  - [提出新功能](#提出新功能)
  - [提交 Pull Request](#提交-pull-request)
  - [改进文档](#改进文档)
- [开发环境搭建](#开发环境搭建)
- [代码规范](#代码规范)
- [测试](#测试)
- [常见问题](#常见问题)

## 行为准则

本项目遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。请保持尊重和专业，我们致力于创造一个开放、包容的社区。

## 如何贡献

### 报告 Bug

如果发现 Bug，请先在 [Issues](https://github.com/yourusername/legalease/issues) 中搜索是否已存在相同问题。如果没有，请创建新 Issue，并提供：

- **清晰的标题**：简要描述问题
- **复现步骤**：详细说明如何重现 Bug
- **预期行为**：你期望的结果是什么
- **实际行为**：实际发生了什么
- **环境信息**：操作系统、浏览器、Node 版本等
- **附加信息**：截图、错误日志、相关代码

### 提出新功能

我们很乐意接收新功能建议！在创建 Issue 前，请：

1. 确认该功能与项目目标一致
2. 搜索是否已有类似建议
3. 提供清晰的用例说明：这个功能解决什么问题？谁受益？
4. 如果可能，提供初步的设计思路

### 提交 Pull Request

#### 1. Fork 本仓库

点击右上角的 Fork 按钮，将仓库 Fork 到你的 GitHub 账号。

#### 2. 克隆到本地

```bash
git clone https://github.com/yourusername/legalease.git
cd legalease
```

#### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/issue-number-description
```

#### 4. 安装依赖

```bash
npm install
```

#### 5. 开发与测试

```bash
# 启动开发服务器
npm run dev

# 运行 lint
npm run lint

# 运行类型检查
npx tsc --noEmit
```

#### 6. 提交代码

```bash
git add .
git commit -m "feat: add new feature description"
# 或
git commit -m "fix: fix bug description"
```

**提交信息规范**（参考 [Conventional Commits](https://www.conventionalcommits.org/)）：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整（不影响功能）
- `refactor:` 代码重构
- `test:` 添加或修改测试
- `chore:` 构建或工具更新

#### 7. 推送分支

```bash
git push origin feature/your-feature-name
```

#### 8. 创建 Pull Request

1. 访问你的 Fork 仓库页面
2. 点击 "Compare & pull request"
3. 填写 PR 模板：
   - **标题**：简明扼要
   - **描述**：详细说明改动内容、原因、测试情况
   - **关联 Issue**：如果有，使用 `Closes #123` 语法自动关闭
4. 提交 PR 等待审查

#### 9. 代码审查

- 保持 PR 大小适中，尽量一次只做一件事
- 根据审查意见修改代码
- 所有 CI 检查必须通过
- 至少需要 1 位 Maintainer 审核通过

### 改进文档

文档改进和代码改进同样重要！你可以：

- 修正拼写错误或语法问题
- 补充缺失的说明
- 添加使用示例
- 翻译成其他语言（英文欢迎！）
- 优化中文表达

## 开发环境搭建

### 前置要求

- Node.js 18+
- npm 或 yarn
- Git
- （可选）Docker & Docker Compose

### 快速开始

1. **克隆并安装**

```bash
git clone https://github.com/yourusername/legalease.git
cd legalease
npm install
```

2. **配置环境变量**

```bash
cp .env.example .env.local
# 编辑 .env.local，填入你的 OPENAI_API_KEY
```

3. **启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

### 使用 Docker（推荐用于测试完整功能）

```bash
# 复制环境变量
cp .env.example .env

# 启动所有服务（应用 + ChromaDB）
docker-compose up -d

# 访问 http://localhost:3000
```

### 准备法律数据

```bash
# 处理原始法律数据
npm run data:process

# 生成向量嵌入（需要 OpenAI API Key）
npm run data:embed
```

## 代码规范

### TypeScript

- 使用严格模式（`strict: true`）
- 为所有函数和组件添加类型注解
- 避免使用 `any`，如果必须使用请添加注释说明

### React / Next.js

- 使用函数组件 + Hooks
- 客户端组件使用 `'use client'` 指令
- 使用 Tailwind CSS 进行样式设计
- 组件按功能分类存放

### 目录结构

```
app/
  api/          # API 路由
  components/   # 可复用组件
  lib/          # 工具函数、配置
  page.tsx      # 页面组件
scripts/        # 数据处理脚本
data/           # 法律数据（不提交到 Git）
```

### 命名规范

- 文件名：kebab-case（如 `law-card.tsx`）
- 组件名：PascalCase（如 `LawCard`）
- 变量/函数：camelCase
- 常量：UPPER_SNAKE_CASE
- 类：PascalCase

## 测试

目前项目尚未配备完整的测试套件，但我们强烈建议：

- 为新功能添加单元测试
- 确保关键路径（如 API 接口）有测试覆盖
- 使用 Jest 或 Vitest

未来我们会完善测试基础设施。

## 常见问题

### Q: 如何添加新的法律数据？

A: 将 JSON 文件放入 `data/laws/` 或 `data/cases/` 目录，运行 `npm run data:process` 处理，然后 `npm run data:embed` 生成向量。

### Q: 可以支持其他 LLM 吗？

A: 可以！目前代码已抽象，只需修改 `app/api/chat/route.ts` 中的 LLM 初始化部分，添加对 Claude、本地模型等的支持。

### Q: 法律数据来源可靠吗？

A: 我们使用官方公开数据：全国人大法律法规库、中国裁判文书网。建议定期更新数据，并在代码中标注来源。

### Q: 性能优化建议？

A: 
- 使用 ChromaDB 的持久化存储
- 启用缓存（Redis）
- 实施请求限流
- 使用 Vercel Edge Functions 减少延迟

## 联系我们

- **Discord**: [加入我们的服务器](https://discord.gg/your-invite)
- **Issues**: [GitHub Issues](https://github.com/yourusername/legalease/issues)
- **邮箱**: contact@legalease.dev（待申请）

## 致谢

感谢每一位贡献者！❤️

---

**一起让法律更亲民！** 🎯
