import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("videy");
  let list = (await store.get("list", { type: "json" })) || [];

  if (req.method === "POST") {
    const { id } = await req.json();
    if (id && /^[\w-]+$/.test(id) && !list.some(v => v.id === id)) {
      list.unshift({ id, ts: Date.now() });
      await store.setJSON("list", list);
    }
  }
  return Response.json(list);
};

export const config = { path: "/api/videos" };
