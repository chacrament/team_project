export default async function handler(req, res) {
  try {
    const { query, size = 15 } = req.query;
    const key = process.env.KAKAO_REST_KEY;

    if (!key) return res.status(500).json({ error: "Missing KAKAO_REST_KEY" });
    if (!query) return res.status(400).json({ error: "Missing query" });

    const url = new URL("https://dapi.kakao.com/v2/local/search/keyword.json");
    url.searchParams.set("query", query);
    url.searchParams.set("size", String(size));

    const r = await fetch(url, {
      headers: { Authorization: `KakaoAK ${key}` },
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
