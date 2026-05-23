import { readFile } from "node:fs/promises";
import path from "node:path";

const contentKey = "site";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const supabaseContent = await readSupabaseContent();
    if (supabaseContent) {
      sendJson(response, 200, supabaseContent);
      return;
    }
  } catch (error) {
    console.error("Supabase content read failed:", error);
  }

  sendJson(response, 200, await readFallbackContent());
}

async function readSupabaseContent() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  const apiUrl = `${url.replace(/\/$/, "")}/rest/v1/app_content?select=content&key=eq.${contentKey}&limit=1`;
  const result = await fetch(apiUrl, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Supabase returned ${result.status}`);
  }

  const rows = await result.json();
  return rows?.[0]?.content || null;
}

async function readFallbackContent() {
  try {
    const filePath = path.join(process.cwd(), "data", "content.json");
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function sendJson(response, status, payload) {
  response.status(status).json(payload);
}
