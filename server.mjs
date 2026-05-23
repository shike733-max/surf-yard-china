import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const generatedDir = path.join(__dirname, "generated");
const dataDir = path.join(__dirname, "data");
const contentPath = path.join(dataDir, "content.json");

await loadDotEnv();
await mkdir(generatedDir, { recursive: true });
await mkdir(dataDir, { recursive: true });

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://localhost:${port}`);

    if (request.method === "POST" && url.pathname === "/api/generate-image") {
      await handleGenerateImage(request, response);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/content") {
      await handleGetContent(response);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/admin/content") {
      await handleSaveContent(request, response);
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      sendJson(response, 405, { error: "Method not allowed" });
      return;
    }

    await serveStatic(url.pathname, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Surf Yard China running at http://localhost:${port}`);
});

async function loadDotEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!existsSync(envPath)) return;
  const raw = await readFile(envPath, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const index = trimmed.indexOf("=");
    if (index === -1) return;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  });
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function handleGenerateImage(request, response) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(response, 500, {
      error: "缺少 OPENAI_API_KEY。请在项目根目录创建 .env 并设置 OPENAI_API_KEY=你的 key。",
    });
    return;
  }

  const body = await readJson(request);
  const prompt = String(body.prompt || "").trim();
  const size = String(body.size || "1536x1024");
  const quality = String(body.quality || "medium");

  if (!prompt) {
    sendJson(response, 400, { error: "请输入图片描述。" });
    return;
  }

  const apiResponse = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1.5",
      prompt,
      size,
      quality,
      background: "auto",
      moderation: "auto",
    }),
  });

  const payload = await apiResponse.json();
  if (!apiResponse.ok) {
    sendJson(response, apiResponse.status, {
      error: payload.error?.message || "OpenAI 图片生成失败。",
    });
    return;
  }

  const image = payload.data?.[0];
  if (!image?.b64_json && !image?.url) {
    sendJson(response, 500, { error: "OpenAI 没有返回图片数据。" });
    return;
  }

  const filename = `ai-${Date.now()}-${crypto.randomBytes(4).toString("hex")}.png`;
  const filePath = path.join(generatedDir, filename);

  if (image.b64_json) {
    await writeFile(filePath, Buffer.from(image.b64_json, "base64"));
  } else {
    const generated = await fetch(image.url);
    if (!generated.ok) {
      sendJson(response, 500, { error: "下载生成图片失败。" });
      return;
    }
    await writeFile(filePath, Buffer.from(await generated.arrayBuffer()));
  }

  sendJson(response, 200, {
    url: `/generated/${filename}`,
    prompt,
    revisedPrompt: image.revised_prompt || null,
  });
}

async function handleGetContent(response) {
  try {
    const raw = await readFile(contentPath, "utf8");
    sendJson(response, 200, JSON.parse(raw));
  } catch {
    sendJson(response, 200, {});
  }
}

async function handleSaveContent(request, response) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    sendJson(response, 500, { error: "缺少 ADMIN_PASSWORD。请在 .env 中设置后台密码。" });
    return;
  }

  const body = await readJson(request);
  if (body.password !== adminPassword) {
    sendJson(response, 401, { error: "后台密码不正确。" });
    return;
  }

  const content = body.content;
  if (!content || typeof content !== "object") {
    sendJson(response, 400, { error: "内容格式不正确。" });
    return;
  }

  await writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  sendJson(response, 200, { ok: true });
}

async function serveStatic(urlPath, response) {
  const decodedPath = decodeURIComponent(urlPath);
  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
  const filePath = path.normalize(path.join(__dirname, relativePath));

  if (!filePath.startsWith(__dirname)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  try {
    const file = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}
