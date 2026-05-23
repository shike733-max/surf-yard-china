# Surf Yard China

一个中国二手冲浪装备交易网站原型，包含前台 marketplace 和轻量后台内容管理。

## 启动网站

1. 复制 `.env.example` 为 `.env`
2. 在 `.env` 中填入配置：

```env
OPENAI_API_KEY=你的_openai_api_key
ADMIN_PASSWORD=设置一个后台密码
PORT=4173
```

3. 启动服务：

```bash
npm start
```

4. 打开网站：

```text
http://localhost:4173
```

## 后台内容管理

打开：

```text
http://localhost:4173/admin.html
```

后台可以编辑：

- 首页标题
- 首页描述
- 商品列表 JSON

保存时需要 `.env` 中的 `ADMIN_PASSWORD`。内容会写入 `data/content.json`。

## AI 图片接口

后端保留了 OpenAI 图片生成接口 `/api/generate-image`，之后如果恢复前端 AI 设计入口，可以继续使用。

生成结果会保存到 `generated/` 目录。

## 安全说明

不要把 `OPENAI_API_KEY` 或 `ADMIN_PASSWORD` 写进前端代码。当前实现只在 `server.mjs` 后端读取 `.env`，浏览器不会看到你的 key。

## 上线建议

当前项目是一个 Node 服务，适合部署到 Render / Railway / Fly.io / VPS。

部署时需要设置环境变量：

- `PORT`
- `ADMIN_PASSWORD`
- `OPENAI_API_KEY`（如果需要 AI 图片功能）

如果只是展示静态页面，也可以部署到 Netlify / Vercel 静态托管；但后台保存内容和 API 功能需要 Node 服务。
