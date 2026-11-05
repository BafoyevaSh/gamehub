import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GameCard from "@/components/GameCard";
import { games, categories } from "@/data/games";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Catalog = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const filtered = games.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Barchasi" || activeCategory === "All" || activeCategory === "Все" || g.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      <div>
        <h1 className="text-2xl font-display font-bold">{t("catalog.title")}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t("catalog.subtitle")}</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t("catalog.search")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeCategory === cat
                ? "gradient-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((game, i) => (
          <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GameCard {...game} />
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">{t("catalog.notFound")}</p>
      )}
    </div>
  );
};

export default Catalog;
