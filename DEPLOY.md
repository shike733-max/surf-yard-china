# 上线说明：Vercel + Supabase

这个方案不需要 Render 绑卡。

## 1. Supabase

1. 打开 Supabase 并登录。
2. 创建一个免费项目。
3. 进入 SQL Editor。
4. 复制并运行 `supabase-schema.sql`。
5. 在 Project Settings > API 里复制：
   - Project URL
   - service_role key

## 2. Vercel

1. 使用 GitHub 登录 Vercel。
2. Import Git Repository，选择 `surf-yard-china`。
3. Framework Preset 选 Other。
4. Build Command 留空。
5. Output Directory 留空。
6. 添加环境变量：

```text
ADMIN_PASSWORD=你设置的后台密码
SUPABASE_URL=Supabase Project URL
SUPABASE_SERVICE_ROLE_KEY=Supabase service_role key
```

如果暂时不用 AI 生图，不需要设置 `OPENAI_API_KEY`。

## 3. 访问

前台：

```text
https://你的-vercel-域名/
```

后台：

```text
https://你的-vercel-域名/admin.html
```

## 注意

后台保存的内容会进入 Supabase，不会因为 Vercel 重新部署而丢失。
