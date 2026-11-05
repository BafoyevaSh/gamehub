import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const players = [
  { rank: 1, name: "CyberWolf", score: 12450, games: 89 },
  { rank: 2, name: "NeonKing", score: 11200, games: 76 },
  { rank: 3, name: "PixelMaster", score: 10800, games: 95 },
  { rank: 4, name: "StarBlaze", score: 9500, games: 62 },
  { rank: 5, name: "ArcadeHero", score: 8900, games: 54 },
  { rank: 6, name: "GameShadow", score: 8200, games: 71 },
  { rank: 7, name: "TurboX", score: 7600, games: 48 },
  { rank: 8, name: "QuantumAce", score: 7100, games: 43 },
];

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-300",
  3: "text-amber-600",
};

const Leaderboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h1 className="text-2xl font-display font-bold">{t("leaderboard.title")}</h1>
      </div>

      <div className="space-y-2">
        {players.map((player, i) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
          >
            <span className={`w-8 text-center font-display font-bold text-lg ${rankColors[player.rank] || "text-muted-foreground"}`}>
              {player.rank <= 3 ? <Medal className="w-5 h-5 mx-auto" /> : `#${player.rank}`}
            </span>
            <div className="flex-1">
              <p className="font-display font-semibold">{player.name}</p>
              <p className="text-xs text-muted-foreground">{player.games} {t("leaderboard.gamesPlayed")}</p>
            </div>
            <span className="font-display font-bold text-primary">{player.score.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
