const contentKey = "site";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminPassword) {
    sendJson(response, 500, { error: "缺少 ADMIN_PASSWORD。请先在 Vercel 环境变量中设置后台密码。" });
    return;
  }

  if (!supabaseUrl || !serviceKey) {
    sendJson(response, 500, { error: "缺少 Supabase 环境变量。请设置 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。" });
    return;
  }

  const body = request.body || {};
  if (body.password !== adminPassword) {
    sendJson(response, 401, { error: "后台密码不正确。" });
    return;
  }

  const content = body.content;
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    sendJson(response, 400, { error: "内容格式不正确。" });
    return;
  }

  const result = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/app_content`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      key: contentKey,
      content,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!result.ok) {
    const message = await result.text();
    sendJson(response, result.status, { error: message || "Supabase 保存失败。" });
    return;
  }

  sendJson(response, 200, { ok: true });
}

function sendJson(response, status, payload) {
  response.status(status).json(payload);
}
