export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: messages,
      }),
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output_text || "Yanıt alınamadı.",
    });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
}
