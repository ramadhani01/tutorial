import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("videos");
  const list = (await store.get("list", { type: "json" })) || [];
  return Response.json(list, { headers: { "Cache-Control": "no-store" } });
};
