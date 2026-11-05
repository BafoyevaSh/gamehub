import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Gamepad2, Users, TrendingUp, CheckCircle, XCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusPill from "@/components/StatusPill";
import { games } from "@/data/games";

const stats = [
  { label: "Jami o'yinlar", value: "24", icon: Gamepad2, color: "text-gaming-purple" },
  { label: "Onlayn o'yinchilar", value: "1,247", icon: Users, color: "status-online" },
  { label: "Bugungi kirishlar", value: "8,392", icon: TrendingUp, color: "text-gaming-purple" },
];

interface AdminGame {
  id: string;
  title: string;
  developer: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const adminGames: AdminGame[] = [
  { id: "1", title: "Pixel Adventure", developer: "dev_ali", status: "pending", date: "2026-03-12" },
  { id: "2", title: "Math Puzzle", developer: "edu_games", status: "pending", date: "2026-03-11" },
  { id: "3", title: "Neon Snake", developer: "arcade_pro", status: "approved", date: "2026-03-10" },
  { id: "4", title: "Card Battle", developer: "game_studio", status: "rejected", date: "2026-03-09" },
];

const Admin = () => {
  const [gameList, setGameList] = useState(adminGames);

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setGameList(prev => prev.map(g => g.id === id ? { ...g, status } : g));
  };

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-display font-bold">Admin Panel</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-card border border-border p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-50`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Approvals */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold">O'yinlarni boshqarish</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">O'yin</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Developer</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Sana</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Holat</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {gameList.map(game => (
                <tr key={game.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="p-4 text-sm font-medium">{game.title}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{game.developer}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{game.date}</td>
                  <td className="p-4"><StatusPill status={game.status} /></td>
                  <td className="p-4 text-right">
                    {game.status === "pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="play" className="h-8" onClick={() => updateStatus(game.id, "approved")}>
                          <CheckCircle className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8" onClick={() => updateStatus(game.id, "rejected")}>
                          <XCircle className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
