# 上线说明（给不写代码的人）

我已经把项目整理成可以部署的 Node 网站。

## 你需要准备

任选一个托管平台账号：

- Render
- Railway
- Fly.io
- 一台自己的服务器

我建议先用 Render 或 Railway，因为最省事。

## 你需要自己完成的动作

因为涉及账号和权限，你需要自己登录托管平台，并授权连接项目代码仓库。

上线时需要设置两个环境变量：

```text
ADMIN_PASSWORD=你自己设置的后台密码
OPENAI_API_KEY=你的 OpenAI API Key（如果暂时不用 AI 生图，可以先不填）
```

## 上线后访问地址

前台：

```text
https://你的域名/
```

后台：

```text
https://你的域名/admin.html
```

## 注意

当前轻量后台会把内容保存到服务器文件 `data/content.json`。
免费托管平台有时会在重启或重新部署时重置本地文件。正式运营前，建议升级为数据库后台，例如 Supabase / Firebase / PostgreSQL。

