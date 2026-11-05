import { useParams, useNavigate } from "react-router-dom";
import { games } from "@/data/games";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Maximize, Star, Users, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">O'yin topilmadi</p>
      </div>
    );
  }

  const toggleFullscreen = () => {
    const el = document.getElementById("game-frame");
    if (el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold">{game.title}</h1>
          <p className="text-muted-foreground text-sm">{game.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gaming-purple">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{game.rating}</span>
          </div>
          {game.isOnline && (
            <div className="flex items-center gap-1.5 ml-3">
              <span className="w-2 h-2 rounded-full status-dot" />
              <span className="text-sm status-online">{game.players} online</span>
            </div>
          )}
        </div>
      </div>

      {/* Game Frame */}
      {game.embedUrl ? (
        <div className="space-y-3">
          <div id="game-frame" className="relative rounded-xl overflow-hidden bg-card border border-border aspect-video">
            <iframe
              src={game.embedUrl}
              title={game.title}
              className="w-full h-full border-0"
              allow="fullscreen; autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <Maximize className="w-4 h-4" />
              To'liq ekran
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
              Ulashish
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-border">
          <img src={game.image} alt={game.title} className="w-full aspect-video object-cover" />
          <div className="p-6 text-center space-y-3">
            <p className="text-muted-foreground">Bu o'yin tez orada qo'shiladi</p>
            <Button variant="gaming">Xabardor qilish</Button>
          </div>
        </div>
      )}

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card border border-border p-6 space-y-3"
      >
        <h3 className="font-display font-semibold">O'yin haqida</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{game.description}</p>
      </motion.div>
    </div>
  );
};

export default GameDetail;
