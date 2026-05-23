# Surf Yard China

一个中国二手冲浪装备交易网站原型，包含前台 marketplace、搜索筛选、发布入口和轻量后台内容管理。

## 本地预览

```bash
npm start
```

打开：

```text
http://localhost:4173
```

## 后台

```text
/admin.html
```

后台可以编辑：

- 首页标题
- 首页描述
- 商品列表 JSON

保存需要 `ADMIN_PASSWORD`。上线到 Vercel 后，内容会保存到 Supabase 的 `app_content` 表。

## Vercel + Supabase 环境变量

```env
ADMIN_PASSWORD=你自己设置的后台密码
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_SERVICE_ROLE_KEY=Supabase service_role key
OPENAI_API_KEY=可选，如果后续恢复 AI 生图入口再填写
```

`SUPABASE_SERVICE_ROLE_KEY` 只能放在 Vercel 环境变量里，不要写进前端页面。

## Supabase 建表

在 Supabase 的 SQL Editor 运行 `supabase-schema.sql`。

## API

- `GET /api/content`：读取网站内容
- `POST /api/admin/content`：后台保存内容
- `POST /api/generate-image`：本地 Node 服务保留的 AI 图片接口，当前前端入口已隐藏
