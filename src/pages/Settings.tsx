import { Moon, Sun, HelpCircle, FileText, Shield, Gamepad2, ChevronRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

const languageLabels = { uz: "O'zbekcha", en: "English", ru: "Русский" } as const;

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [darkMode]);

  const menuItems = [
    { icon: Gamepad2, label: t("settings.catalog"), desc: t("settings.catalogDesc"), path: "/catalog" },
    { icon: FileText, label: t("settings.activateCode"), desc: t("settings.activateCodeDesc"), path: undefined },
    { icon: HelpCircle, label: t("settings.help"), desc: t("settings.helpDesc"), path: "/help" },
    { icon: Gamepad2, label: t("settings.terms"), desc: t("settings.termsDesc"), path: undefined },
    { icon: Shield, label: t("settings.privacy"), desc: t("settings.privacyDesc"), path: undefined },
  ];

  return (
    <div className="space-y-6 pb-24 lg:pb-10 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold">{t("settings.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("settings.subtitle")}</p>
      </div>

      <div className="rounded-xl bg-card border border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-accent" />}
          <div>
            <p className="font-medium text-sm">{darkMode ? t("settings.darkMode") : t("settings.lightMode")}</p>
            <p className="text-muted-foreground text-xs">{t("settings.themeDesc")}</p>
          </div>
        </div>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </div>

      <div className="rounded-xl bg-card border border-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-sm">{t("settings.language")}</p>
            <p className="text-muted-foreground text-xs">{t("settings.languageDesc")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(languageLabels) as Array<"uz" | "en" | "ru">).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === lang
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border divide-y divide-border">
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => item.path && navigate(item.path)}
            className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors text-left"
          >
            <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;
