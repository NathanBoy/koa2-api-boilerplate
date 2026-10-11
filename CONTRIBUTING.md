# 参与贡献

感谢你有兴趣为 **koa2-api-boilerplate** 贡献！这是一个小而聚焦的 API 脚手架，请保持改动简洁，符合"轻量模板"的定位。

## 如何贡献

1. Fork 本仓库并创建自己的分支
2. 完成你的改动（遵循下方规范）
3. 本地通过质量检查
4. 提交 Pull Request

## 本地开发

```bash
npm install
npm run dev
```

## 质量检查（PR 前必须通过）

```bash
npm test         # jest + supertest 接口测试
npm run lint     # ESLint 代码检查
npm run format   # Prettier 代码格式化
```

## 规范约定

- **保持精简**：这是模板项目，避免过度设计
- **遵循分层架构**：router → controller → service → model，不要破坏职责边界
- **新增接口请补测试**：每个新端点都要有对应的测试用例
- **保持一致性**：遵循现有代码风格与统一响应格式 `{ code, message, data }`
