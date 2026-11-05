import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

const AIChatWidget = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t("chat.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickCategories = ["Geometry Dash", "Toca Boca", t("chat.moreOptions")];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: t("chat.error") }));
        toast.error(err.error || t("chat.error"));
        setLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > allMessages.length) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { buffer = line + "\n" + buffer; break; }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error(t("chat.error"));
    }
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={() => setOpen(true)} className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg glow-purple">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-sm">{t("chat.title")}</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[80%] rounded-xl px-3 py-2 text-sm", m.role === "user" ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && !messages.find((m, i) => i === messages.length - 1 && m.role === "assistant") && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-xl px-3 py-2 text-sm text-muted-foreground animate-pulse">{t("chat.typing")}</div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-col items-end gap-2 mt-2">
                  <p className="text-xs text-muted-foreground">{t("chat.selectCategory")}</p>
                  {quickCategories.map(cat => (
                    <button key={cat} onClick={() => sendMessage(cat)} className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors", cat === t("chat.moreOptions") ? "border-destructive/50 text-destructive hover:bg-destructive/10" : "border-primary/50 text-primary hover:bg-primary/10")}>
                      <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", cat === t("chat.moreOptions") ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground")}>
                        {cat === t("chat.moreOptions") ? "✕" : "+"}
                      </span>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(input)} placeholder={t("chat.placeholder")} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" disabled={loading} />
                <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center disabled:opacity-50">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 text-center">{t("chat.disclaimer")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
