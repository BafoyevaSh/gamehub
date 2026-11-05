import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Gamepad2, Trophy, Star, LogOut, Edit2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, username, bio })
      .eq("user_id", user.id);
    if (error) toast.error(error.message);
    else {
      toast.success(t("profile.updated"));
      setEditing(false);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    toast.success(t("profile.loggedOut"));
  };

  const stats = [
    { icon: Gamepad2, label: t("profile.games"), value: profile?.games_played || 0 },
    { icon: Trophy, label: t("profile.score"), value: profile?.total_score || 0 },
    { icon: Star, label: t("profile.favorite"), value: profile?.favorite_category || "—" },
  ];

  return (
    <div className="space-y-6 pb-24 lg:pb-10 max-w-2xl">
      <h1 className="text-2xl font-display font-bold">{t("profile.title")}</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card border border-border p-6 space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-3xl font-display font-bold text-primary-foreground">
            {(profile?.display_name || user.email || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-2">
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t("profile.name")} className="bg-secondary border-border" />
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-secondary border-border" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-display font-semibold">{profile?.display_name || t("profile.user")}</h2>
                <p className="text-muted-foreground text-sm">@{profile?.username || "user"}</p>
              </>
            )}
          </div>
          <Button variant={editing ? "play" : "outline"} size="sm" onClick={editing ? handleSave : () => setEditing(true)} disabled={saving}>
            {editing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          </Button>
        </div>

        {editing ? (
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder={t("profile.bio")} className="bg-secondary border-border" />
        ) : (
          profile?.bio && <p className="text-muted-foreground text-sm">{profile.bio}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          {user.email}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl bg-card border border-border p-4 text-center">
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <Button variant="destructive" className="gap-2" onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
        {t("nav.logout")}
      </Button>
    </div>
  );
};

export default Profile;
