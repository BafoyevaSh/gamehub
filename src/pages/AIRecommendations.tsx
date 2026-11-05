import { motion } from "framer-motion";
import { Sparkles, Brain, TrendingUp, Target } from "lucide-react";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import AIChatWidget from "@/components/AIChatWidget";
import { useLanguage } from "@/contexts/LanguageContext";

const AIRecommendations = () => {
  const { t } = useLanguage();
  const recommended = [games[0], games[5], games[3], games[1]];

  const recommendations = [
    { icon: Brain, title: t("ai.yourStyle"), desc: t("ai.yourStyleDesc"), color: "text-gaming-purple" },
    { icon: TrendingUp, title: t("ai.trends"), desc: t("ai.trendsDesc"), color: "status-online" },
    { icon: Target, title: t("ai.personalized"), desc: t("ai.personalizedDesc"), color: "text-gaming-purple" },
  ];

  return (
    <div className="space-y-8 pb-24 lg:pb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">{t("ai.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("ai.subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl bg-card border border-border p-5 space-y-2">
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <h3 className="font-display font-semibold text-sm">{item.title}</h3>
            <p className="text-muted-foreground text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold">{t("ai.selectedForYou")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((game, i) => (
            <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <GameCard {...game} />
            </motion.div>
          ))}
        </div>
      </div>

      <AIChatWidget />
    </div>
  );
};

export default AIRecommendations;
