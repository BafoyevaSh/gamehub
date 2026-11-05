import { Home, Gamepad2, Users, Bot, User, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();

  const baseItems = [
    { icon: Home, label: t("nav.homeShort"), path: "/" },
    { icon: Gamepad2, label: t("nav.catalog"), path: "/catalog" },
    { icon: Users, label: t("nav.lobbies"), path: "/lobbies" },
    { icon: Bot, label: "AI", path: "/ai-recommendations" },
  ];

  const items = [
    ...baseItems,
    user
      ? { icon: User, label: t("nav.profile"), path: "/profile" }
      : { icon: LogIn, label: t("nav.login"), path: "/auth" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-border">
      <div className="flex items-center justify-around py-2 px-1">
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
