import { Users, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LobbyCardProps {
  id: string;
  name: string;
  game: string;
  players: number;
  maxPlayers: number;
  isPrivate?: boolean;
  onJoin: (id: string) => void;
}

const LobbyCard = ({ id, name, game, players, maxPlayers, isPrivate, onJoin }: LobbyCardProps) => {
  const isFull = players >= maxPlayers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Users className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display font-semibold text-foreground">{name}</h4>
            {isPrivate && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground">{game}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className={`text-sm font-medium ${isFull ? "text-destructive" : "status-online"}`}>
            {players}/{maxPlayers}
          </span>
          <p className="text-xs text-muted-foreground">o'yinchilar</p>
        </div>
        <Button
          variant="play"
          size="sm"
          disabled={isFull}
          onClick={() => onJoin(id)}
          className="gap-1"
        >
          Kirish <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LobbyCard;
