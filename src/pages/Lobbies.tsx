import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LobbyCard from "@/components/LobbyCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Lobby {
  id: string;
  name: string;
  game: string;
  players: number;
  maxPlayers: number;
  isPrivate?: boolean;
}

const initialLobbies: Lobby[] = [
  { id: "1", name: "Snake Masters", game: "Neon Snake Multiplayer", players: 3, maxPlayers: 4 },
  { id: "2", name: "Mafia Night", game: "Mafia Online", players: 5, maxPlayers: 8, isPrivate: true },
  { id: "3", name: "Speed Demons", game: "Neon Racer", players: 2, maxPlayers: 4 },
  { id: "4", name: "Chess Club", game: "Quantum Chess", players: 1, maxPlayers: 2 },
  { id: "5", name: "Space Warriors", game: "Space Blaster", players: 4, maxPlayers: 4 },
];

const Lobbies = () => {
  const { t } = useLanguage();
  const [lobbies, setLobbies] = useState(initialLobbies);
  const [newName, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  const handleJoin = (id: string) => {
    const lobby = lobbies.find(l => l.id === id);
    if (lobby) toast.success(`"${lobby.name}" ${t("lobbies.joined")}`);
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newLobby: Lobby = {
      id: String(Date.now()),
      name: newName,
      game: t("lobbies.newGame"),
      players: 1,
      maxPlayers: 4,
    };
    setLobbies(prev => [newLobby, ...prev]);
    setNewName("");
    setOpen(false);
    toast.success(t("lobbies.created"));
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">{t("lobbies.title")}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t("lobbies.subtitle")}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="gaming" className="gap-2">
              <Plus className="w-4 h-4" />
              {t("lobbies.createRoom")}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display">{t("lobbies.newRoom")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <Input
                placeholder={t("lobbies.roomName")}
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="bg-secondary border-border"
                onKeyDown={e => e.key === "Enter" && handleCreate()}
              />
              <Button variant="play" className="w-full" onClick={handleCreate}>
                {t("lobbies.create")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {lobbies.map(lobby => (
          <LobbyCard key={lobby.id} {...lobby} onJoin={handleJoin} />
        ))}
      </div>
    </div>
  );
};

export default Lobbies;
