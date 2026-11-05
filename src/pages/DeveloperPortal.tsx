import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const contactMethods = ["Telegram", "WhatsApp", "Telephone", "WeChat"];

const DeveloperPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    projectLink: "",
    hasReleasedProject: true,
    contactMethod: "" as string,
    contactDetails: "",
    consentGiven: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentGiven) {
      toast.error(t("dev.consent"));
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("developer_applications").insert({
        user_id: user?.id || null,
        full_name: form.fullName,
        company_name: form.companyName,
        email: form.email,
        project_link: form.hasReleasedProject ? form.projectLink : null,
        has_released_project: form.hasReleasedProject,
        contact_method: form.contactMethod,
        contact_details: form.contactDetails,
        consent_given: form.consentGiven,
      });
      if (error) throw error;
      toast.success(t("dev.success"));
      navigate("/settings");
    } catch (err: any) {
      toast.error(err.message || t("dev.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t("auth.back")}</span>
        </button>

        <div className="rounded-2xl bg-card border border-border p-6 md:p-8 space-y-6">
          <h1 className="text-2xl font-display font-bold text-center text-primary">{t("dev.title")}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder={t("dev.fullName") + "*"}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="h-11 bg-secondary/50 border-border"
              required
            />
            <Input
              placeholder={t("dev.company") + "*"}
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="h-11 bg-secondary/50 border-border"
              required
            />
            <Input
              type="email"
              placeholder={t("dev.email") + "*"}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-11 bg-secondary/50 border-border"
              required
            />
            {form.hasReleasedProject && (
              <Input
                placeholder={t("dev.projectLink") + "*"}
                value={form.projectLink}
                onChange={(e) => setForm({ ...form, projectLink: e.target.value })}
                className="h-11 bg-secondary/50 border-border"
                required={form.hasReleasedProject}
              />
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                checked={!form.hasReleasedProject}
                onCheckedChange={(checked) => setForm({ ...form, hasReleasedProject: !checked })}
              />
              <span className="text-sm text-muted-foreground">{t("dev.noProject")}</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t("dev.contactMethod")}*</p>
              <div className="flex flex-wrap gap-4">
                {contactMethods.map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={form.contactMethod === method}
                      onCheckedChange={() => setForm({ ...form, contactMethod: method })}
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <Input
              placeholder={t("dev.contactDetails")}
              value={form.contactDetails}
              onChange={(e) => setForm({ ...form, contactDetails: e.target.value })}
              className="h-11 bg-secondary/50 border-border"
              required
            />

            <div className="flex items-start gap-2">
              <Checkbox
                checked={form.consentGiven}
                onCheckedChange={(checked) => setForm({ ...form, consentGiven: !!checked })}
                className="mt-1"
              />
              <span className="text-xs text-muted-foreground">{t("dev.consent")}</span>
            </div>

            <Button type="submit" variant="gaming" className="w-full h-11" disabled={loading || !form.contactMethod}>
              {loading ? t("auth.loading") : t("dev.send")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;
