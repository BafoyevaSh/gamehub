import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const Help = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-24 lg:pb-10 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold">{t("help.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("help.subtitle")}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.gameErrors")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="wont-open">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.wontOpen")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Boshqa saytlar va o'yinlarni ochib ko'ring. Agar ular ham ochilmasa, internet aloqangizni tekshiring.</li>
                  <li>Reklama bloklovchilarni o'chiring.</li>
                  <li>O'yinni boshqa brauzerda tekshiring.</li>
                  <li>Inkognito rejimini yoqing.</li>
                  <li>Kesh va cookie-fayllarni tozalang.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="crash">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.crash")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground space-y-2">
                <p>Kesh va cookie-fayllarni tozalang.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="progress">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.progress")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Muammoni forma orqali xabar bering.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="achievements">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.achievements")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hisobingizga kirganingizga ishonch hosil qiling.</li>
                  <li>Keshni tozalamaganingizga ishonch hosil qiling.</li>
                  <li>Vaqtinchalik fayl tozalovchilarni o'chiring.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="offline">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.offline")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>O'yinlarni yuklab olish mumkin emas: ular faqat brauzerda mavjud.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="slow">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.slow")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Brauzeringizni yangilang.</li>
                  <li>Keraksiz tablarni yoping.</li>
                  <li>Kesh va cookie-fayllarni tozalang.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.gameQuestions")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="other-device">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.otherDevice")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Agar progressingiz serverda saqlansa, boshqa qurilmada davom ettirishingiz mumkin.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="find-game">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.findGame")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>"Sizning o'yinlaringiz" bo'limiga qarang.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.payments")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="winnings">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.winnings")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>O'yinda oladigan ballaringiz virtual hisoblanadi.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment-failed">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.paymentFailed")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Muammoni forma orqali xabar bering.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.steam")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="download-steam">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.downloadSteam")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Rasmiy Steam veb-saytidan yuklab olishingiz mumkin.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="activate-key">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.activateKey")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground space-y-2">
                <p>Steam hisobingizga kiring yoki ro'yxatdan o'ting. Kalitni faollashtirish uchun yuqori panelda "O'yinlar" ni bosing.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="region-error">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.regionError")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Kalit faqat ko'rsatilgan mintaqalardagi Steam hisoblarida faollashtirilishi mumkin.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="invalid-code">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.invalidCode")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>To'g'ri kalitni kiritganingizga ishonch hosil qiling.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dlc">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.dlc")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Ha, Steam mijozida mavjud bo'lsa, DLC sotib olishingiz mumkin.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="already-have">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.alreadyHave")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Muammoni forma orqali xabar bering.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.ads")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="remove-ads">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.removeAds")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Reklamalarni butunlay olib tashlay olmaymiz: daromad xizmatni rivojlantirish uchun sarflanadi.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="report-ad">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.reportAd")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Qayta aloqa formasidan foydalaning.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-display font-semibold">{t("help.content")}</h2>
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <Accordion type="multiple">
            <AccordionItem value="report-content">
              <AccordionTrigger className="px-4 text-sm font-medium">{t("help.reportContent")}</AccordionTrigger>
              <AccordionContent className="px-4 text-sm text-muted-foreground">
                <p>Qayta aloqa formasi orqali biz bilan bog'laning.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Help;
