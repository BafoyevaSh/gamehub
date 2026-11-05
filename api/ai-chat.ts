export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `Sen gameWisp o'yin platformasining AI yordamchisisan. Foydalanuvchilarga o'yin tanlashda yordam berasan.
O'yinchi syujet, janr yoki kayfiyatni tasvirlasa, sen unga mos o'yinlarni tavsiya qilasan.
Har doim o'zbek tilida javob ber. Qisqa va aniq javob ber.
Mavjud kategoriyalar: Action, Strategy, Arcade, Puzzle, RPG, Racing, Sports, Simulation.`;

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

type Msg = { role: "user" | "assistant"; content: string };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return json({ error: "AI kaliti sozlanmagan" }, 500);

  let messages: Msg[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter(
        (m: any) =>
          (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string",
      )
      .slice(-MAX_MESSAGES)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  } catch {
    return json({ error: "Noto'g'ri so'rov" }, 400);
  }
  if (!messages.length) return json({ error: "Xabar bo'sh" }, 400);

  const upstream = await fetch(
    process.env.AI_API_URL || "https://api.deepseek.com/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "deepseek-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("AI API error:", upstream.status, detail);
    if (upstream.status === 429) return json({ error: "Juda ko'p so'rov, biroz kuting." }, 429);
    if (upstream.status === 402) return json({ error: "AI hisobida mablag' tugadi." }, 402);
    return json({ error: "AI xatolik" }, 500);
  }

  return new Response(upstream.body, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
  });
}
