import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import heroBanner from "@/assets/hero-banner.jpg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const trendingGames = games.filter(g => g.isTrending);
  const onlineGames = games.filter(g => g.isOnline);

  return (
    <div className="space-y-10 pb-24 lg:pb-10">
      <section className="relative rounded-2xl overflow-hidden">
        <img src={heroBanner} alt="gameWisp" className="w-full h-[280px] md:h-[360px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center p-8 md:p-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="max-w-lg space-y-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              <span className="text-gradient">{t("index.heroTitle1")}</span> {t("index.heroTitle2")}{" "}
              <span className="text-foreground">{t("index.heroTitle3")}</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">{t("index.heroDesc")}</p>
            <div className="flex gap-3">
              <Button variant="gaming" size="lg" onClick={() => navigate("/catalog")}>
                <Gamepad2 className="w-4 h-4" />
                {t("index.browseGames")}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/lobbies")}>
                Multiplayer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-semibold">{t("index.trending")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingGames.map((game, i) => (
            <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GameCard {...game} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full status-dot" />
          <h2 className="text-xl font-display font-semibold">{t("index.onlineNow")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {onlineGames.map((game, i) => (
            <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GameCard {...game} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-xl gradient-surface border border-border p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg">{t("index.aiTitle")}</h3>
            <p className="text-muted-foreground text-sm">{t("index.aiDesc")}</p>
            <Button variant="gaming" size="sm" onClick={() => navigate("/ai-recommendations")}>
              {t("index.viewRecommendations")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
