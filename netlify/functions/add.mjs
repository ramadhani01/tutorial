import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("POST only", { status: 405 });

  let url;
  try { ({ url } = await req.json()); }
  catch { return Response.json({ error: "bad json" }, { status: 400 }); }

  if (typeof url !== "string" || !url.startsWith("https://cdn.videy.co/"))
    return Response.json({ error: "bad url" }, { status: 400 });

  const store = getStore("videos");
  const list = (await store.get("list", { type: "json" })) || [];
  if (!list.includes(url)) list.push(url);
  await store.setJSON("list", list.slice(-500));
  return Response.json({ ok: true });
};
