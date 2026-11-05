import { Home, Gamepad2, Users, Trophy, Settings, Bot, Upload, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t("nav.home"), path: "/" },
    { icon: Gamepad2, label: t("nav.catalog"), path: "/catalog" },
    { icon: Users, label: t("nav.multiplayer"), path: "/lobbies" },
    { icon: Trophy, label: t("nav.leaderboard"), path: "/leaderboard" },
    { icon: Bot, label: t("nav.ai"), path: "/ai-recommendations" },
  ];

  const bottomItems = [
    { icon: Upload, label: t("nav.devPortal"), path: "/developer-portal" },
    { icon: Settings, label: t("nav.settings"), path: "/settings" },
  ];

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => {
    const isActive = location.pathname === path;
    return (
      <button
        onClick={() => navigate(path)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span className="truncate">{label}</span>
      </button>
    );
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen flex-col bg-sidebar border-r border-sidebar-border p-4 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
          <Gamepad2 className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="font-display font-bold text-lg text-foreground">gameWisp</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(item => (
          <NavItem key={item.path} {...item} />
        ))}
      </nav>

      <div className="border-t border-sidebar-border pt-4 space-y-1">
        {bottomItems.map(item => (
          <NavItem key={item.path} {...item} />
        ))}

        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              location.pathname === "/profile"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
              {(profile?.display_name || user.email || "U")[0].toUpperCase()}
            </div>
            <span className="truncate">{profile?.display_name || t("nav.profile")}</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            <LogIn className="w-5 h-5 shrink-0" />
            <span>{t("nav.login")}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
