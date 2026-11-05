import { motion } from "framer-motion";
import { Play, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  players: number;
  rating: number;
  isOnline?: boolean;
  isTrending?: boolean;
}

const GameCard = ({ id, title, image, category, players, rating, isOnline, isTrending }: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-lg bg-card border border-border cursor-pointer"
      onClick={() => navigate(`/game/${id}`)}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {isTrending && (
          <Badge className="absolute top-3 left-3 gradient-primary border-0 font-display text-xs">
            🔥 Trend
          </Badge>
        )}
        {isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 glass-panel px-2 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full status-dot" />
            <span className="status-online font-medium">{players} online</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-foreground truncate">{title}</h3>
          <div className="flex items-center gap-1 text-gaming-purple shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{category}</span>
          <Button variant="play" size="sm" className="h-8 text-xs gap-1.5" onClick={e => { e.stopPropagation(); navigate(`/game/${id}`); }}>
            <Play className="w-3 h-3" />
            O'ynash
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
