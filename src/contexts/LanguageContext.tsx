import { createContext, useContext, useState, useEffect } from "react";

type Language = "uz" | "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
  "nav.homeShort": { uz: "Bosh", en: "Home", ru: "Главная" },
  "nav.catalog": { uz: "O'yinlar", en: "Games", ru: "Игры" },
  "nav.lobbies": { uz: "Lobby", en: "Lobby", ru: "Лобби" },
  "nav.multiplayer": { uz: "Multiplayer", en: "Multiplayer", ru: "Мультиплеер" },
  "nav.leaderboard": { uz: "Reytinglar", en: "Leaderboard", ru: "Рейтинг" },
  "nav.ai": { uz: "AI Tavsiyalar", en: "AI Recommendations", ru: "AI Рекомендации" },
  "nav.settings": { uz: "Sozlamalar", en: "Settings", ru: "Настройки" },
  "nav.profile": { uz: "Profil", en: "Profile", ru: "Профиль" },
  "nav.login": { uz: "Kirish", en: "Login", ru: "Войти" },
  "nav.logout": { uz: "Chiqish", en: "Logout", ru: "Выйти" },
  "nav.devPortal": { uz: "Developer Portal", en: "Developer Portal", ru: "Портал разработчиков" },

  // Index page
  "index.heroTitle1": { uz: "AI", en: "AI", ru: "AI" },
  "index.heroTitle2": { uz: "bilan boshqariladigan", en: "-powered", ru: "-управляемая" },
  "index.heroTitle3": { uz: "o'yin platformasi", en: "gaming platform", ru: "игровая платформа" },
  "index.heroDesc": { uz: "HTML5 o'yinlar, real-time multiplayer, AI tavsiyalar — barchasi bir joyda.", en: "HTML5 games, real-time multiplayer, AI recommendations — all in one place.", ru: "HTML5 игры, мультиплеер в реальном времени, AI рекомендации — всё в одном месте." },
  "index.browseGames": { uz: "O'yinlarni ko'rish", en: "Browse Games", ru: "Смотреть игры" },
  "index.trending": { uz: "Trenddagi o'yinlar", en: "Trending Games", ru: "Популярные игры" },
  "index.onlineNow": { uz: "Hozir onlayn", en: "Online Now", ru: "Сейчас онлайн" },
  "index.aiTitle": { uz: "AI Tavsiyalar", en: "AI Recommendations", ru: "AI Рекомендации" },
  "index.aiDesc": { uz: "Sun'iy intellekt sizning o'yin uslubingizni tahlil qilib, eng mos o'yinlarni tavsiya qiladi.", en: "AI analyzes your gaming style and recommends the best games for you.", ru: "ИИ анализирует ваш стиль игры и рекомендует лучшие игры для вас." },
  "index.viewRecommendations": { uz: "Tavsiyalarni ko'rish", en: "View Recommendations", ru: "Смотреть рекомендации" },

  // Catalog
  "catalog.title": { uz: "O'yinlar katalogi", en: "Games Catalog", ru: "Каталог игр" },
  "catalog.subtitle": { uz: "Barcha o'yinlarni ko'ring va o'ynang", en: "Browse and play all games", ru: "Просматривайте и играйте во все игры" },
  "catalog.search": { uz: "O'yin izlash...", en: "Search games...", ru: "Поиск игр..." },
  "catalog.all": { uz: "Barchasi", en: "All", ru: "Все" },
  "catalog.notFound": { uz: "O'yin topilmadi", en: "No games found", ru: "Игры не найдены" },

  // Lobbies
  "lobbies.title": { uz: "Multiplayer Lobbilar", en: "Multiplayer Lobbies", ru: "Мультиплеер лобби" },
  "lobbies.subtitle": { uz: "Xonaga qo'shiling yoki yangisini yarating", en: "Join a room or create a new one", ru: "Присоединяйтесь или создайте новую комнату" },
  "lobbies.createRoom": { uz: "Xona yaratish", en: "Create Room", ru: "Создать комнату" },
  "lobbies.newRoom": { uz: "Yangi xona yaratish", en: "Create New Room", ru: "Создать новую комнату" },
  "lobbies.roomName": { uz: "Xona nomi", en: "Room name", ru: "Название комнаты" },
  "lobbies.create": { uz: "Yaratish", en: "Create", ru: "Создать" },
  "lobbies.joined": { uz: "xonasiga qo'shildingiz!", en: "room joined!", ru: "вы присоединились!" },
  "lobbies.created": { uz: "Xona yaratildi!", en: "Room created!", ru: "Комната создана!" },
  "lobbies.newGame": { uz: "Yangi o'yin", en: "New game", ru: "Новая игра" },

  // Leaderboard
  "leaderboard.title": { uz: "Reytinglar", en: "Leaderboard", ru: "Рейтинг" },
  "leaderboard.gamesPlayed": { uz: "o'yin o'ynagan", en: "games played", ru: "игр сыграно" },

  // AI Recommendations
  "ai.title": { uz: "AI Tavsiyalar", en: "AI Recommendations", ru: "AI Рекомендации" },
  "ai.subtitle": { uz: "Sun'iy intellekt sizga mos o'yinlarni tanladi", en: "AI selected the best games for you", ru: "ИИ подобрал лучшие игры для вас" },
  "ai.yourStyle": { uz: "Sizning uslubingiz", en: "Your Style", ru: "Ваш стиль" },
  "ai.yourStyleDesc": { uz: "Strategiya va Arcade o'yinlarini yoqtirasiz", en: "You enjoy Strategy and Arcade games", ru: "Вам нравятся стратегии и аркады" },
  "ai.trends": { uz: "Trendlar", en: "Trends", ru: "Тренды" },
  "ai.trendsDesc": { uz: "Neon Snake bu hafta eng ommabop", en: "Neon Snake is the most popular this week", ru: "Neon Snake — самая популярная на этой неделе" },
  "ai.personalized": { uz: "Moslashtirilgan", en: "Personalized", ru: "Персонализировано" },
  "ai.personalizedDesc": { uz: "AI sizning o'yin tarixingizni tahlil qildi", en: "AI analyzed your gaming history", ru: "ИИ проанализировал вашу историю игр" },
  "ai.selectedForYou": { uz: "Siz uchun tanlangan", en: "Selected for You", ru: "Выбрано для вас" },

  // AI Chat
  "chat.title": { uz: "AI o'yinlari", en: "AI Games", ru: "AI Игры" },
  "chat.greeting": { uz: "Salom! Men aynan shu o'yinni topishingizga yordam beraman. Syujet, janr yoki kayfiyatni tasvirlang, men variantlarni taklif qilaman.", en: "Hello! I'll help you find the perfect game. Describe the plot, genre, or mood, and I'll suggest options.", ru: "Привет! Я помогу вам найти идеальную игру. Опишите сюжет, жанр или настроение, и я предложу варианты." },
  "chat.placeholder": { uz: "O'yuni o'zingizning so'zlaringiz bilan tasvirlang", en: "Describe the game in your own words", ru: "Опишите игру своими словами" },
  "chat.disclaimer": { uz: "Kechirasiz, men hali o'rganyapman va ba'zida noto'g'ri javob beraman", en: "Sorry, I'm still learning and sometimes give wrong answers", ru: "Извините, я ещё учусь и иногда ошибаюсь" },
  "chat.typing": { uz: "Yozmoqda...", en: "Typing...", ru: "Печатает..." },
  "chat.selectCategory": { uz: "Yoki kategoriyani tanlang:", en: "Or select a category:", ru: "Или выберите категорию:" },
  "chat.moreOptions": { uz: "Yana variantlar", en: "More options", ru: "Ещё варианты" },
  "chat.error": { uz: "AI bilan bog'lanishda xatolik", en: "Error connecting to AI", ru: "Ошибка подключения к ИИ" },

  // Profile
  "profile.title": { uz: "Profil", en: "Profile", ru: "Профиль" },
  "profile.name": { uz: "Ism", en: "Name", ru: "Имя" },
  "profile.bio": { uz: "Bio", en: "Bio", ru: "О себе" },
  "profile.games": { uz: "O'yinlar", en: "Games", ru: "Игры" },
  "profile.score": { uz: "Ball", en: "Score", ru: "Очки" },
  "profile.favorite": { uz: "Sevimli", en: "Favorite", ru: "Избранное" },
  "profile.updated": { uz: "Profil yangilandi!", en: "Profile updated!", ru: "Профиль обновлён!" },
  "profile.loggedOut": { uz: "Chiqish muvaffaqiyatli!", en: "Logged out successfully!", ru: "Вы вышли из аккаунта!" },
  "profile.user": { uz: "Foydalanuvchi", en: "User", ru: "Пользователь" },

  // Settings
  "settings.title": { uz: "Sozlamalar", en: "Settings", ru: "Настройки" },
  "settings.subtitle": { uz: "Ilovani sozlash", en: "Customize the app", ru: "Настройка приложения" },
  "settings.darkMode": { uz: "Tungi rejim", en: "Dark mode", ru: "Тёмный режим" },
  "settings.lightMode": { uz: "Kunduzgi rejim", en: "Light mode", ru: "Светлый режим" },
  "settings.themeDesc": { uz: "Ilovaning ko'rinishini o'zgartiring", en: "Change app appearance", ru: "Изменить внешний вид" },
  "settings.language": { uz: "Til", en: "Language", ru: "Язык" },
  "settings.languageDesc": { uz: "Ilova tilini tanlang", en: "Choose app language", ru: "Выберите язык приложения" },
  "settings.catalog": { uz: "O'yinlar katalogi", en: "Games catalog", ru: "Каталог игр" },
  "settings.catalogDesc": { uz: "Barcha o'yinlarni ko'ring", en: "Browse all games", ru: "Просмотр всех игр" },
  "settings.activateCode": { uz: "Kodni faollashtiring", en: "Activate code", ru: "Активировать код" },
  "settings.activateCodeDesc": { uz: "Promo-kod yoki aktivatsiya kodi", en: "Promo or activation code", ru: "Промо или код активации" },
  "settings.help": { uz: "Yordam", en: "Help", ru: "Помощь" },
  "settings.helpDesc": { uz: "Ko'p so'raladigan savollar", en: "Frequently asked questions", ru: "Часто задаваемые вопросы" },
  "settings.terms": { uz: "Foydalanuvchi bilan kelishuv", en: "Terms of service", ru: "Пользовательское соглашение" },
  "settings.termsDesc": { uz: "Foydalanish shartlari", en: "Terms and conditions", ru: "Условия использования" },
  "settings.privacy": { uz: "Maxfiylik siyosati", en: "Privacy policy", ru: "Политика конфиденциальности" },
  "settings.privacyDesc": { uz: "Ma'lumotlarni himoya qilish", en: "Data protection", ru: "Защита данных" },

  // Auth
  "auth.login": { uz: "Kirish", en: "Login", ru: "Вход" },
  "auth.register": { uz: "Ro'yxatdan o'tish", en: "Register", ru: "Регистрация" },
  "auth.loginTitle": { uz: "Hisobingizga kiring", en: "Sign in to your account", ru: "Войдите в аккаунт" },
  "auth.registerTitle": { uz: "Yangi hisob yarating", en: "Create a new account", ru: "Создайте новый аккаунт" },
  "auth.email": { uz: "Email", en: "Email", ru: "Email" },
  "auth.password": { uz: "Parol", en: "Password", ru: "Пароль" },
  "auth.username": { uz: "Foydalanuvchi nomi", en: "Username", ru: "Имя пользователя" },
  "auth.forgotPassword": { uz: "Parolni unutdingizmi?", en: "Forgot password?", ru: "Забыли пароль?" },
  "auth.noAccount": { uz: "Hisobingiz yo'qmi? ", en: "Don't have an account? ", ru: "Нет аккаунта? " },
  "auth.hasAccount": { uz: "Allaqachon hisobingiz bormi? ", en: "Already have an account? ", ru: "Уже есть аккаунт? " },
  "auth.or": { uz: "yoki", en: "or", ru: "или" },
  "auth.google": { uz: "Google bilan kirish", en: "Sign in with Google", ru: "Войти через Google" },
  "auth.apple": { uz: "Apple bilan kirish", en: "Sign in with Apple", ru: "Войти через Apple" },
  "auth.loading": { uz: "Yuklanmoqda...", en: "Loading...", ru: "Загрузка..." },
  "auth.back": { uz: "Orqaga", en: "Back", ru: "Назад" },
  "auth.success": { uz: "Muvaffaqiyatli kirdingiz!", en: "Logged in successfully!", ru: "Успешный вход!" },
  "auth.registered": { uz: "Ro'yxatdan o'tdingiz! Emailingizni tasdiqlang.", en: "Registered! Verify your email.", ru: "Зарегистрированы! Подтвердите email." },
  "auth.resetSent": { uz: "Parolni tiklash havolasi emailingizga yuborildi", en: "Password reset link sent to your email", ru: "Ссылка для сброса пароля отправлена" },
  "auth.enterEmail": { uz: "Emailingizni kiriting", en: "Enter your email", ru: "Введите email" },

  // Developer Portal
  "dev.title": { uz: "Bizga qo'shiling", en: "Join us", ru: "Присоединяйтесь" },
  "dev.fullName": { uz: "To'liq ismingiz", en: "Your full name", ru: "Ваше полное имя" },
  "dev.company": { uz: "Kompaniya nomi", en: "Your company name", ru: "Название компании" },
  "dev.email": { uz: "Email", en: "Email", ru: "Email" },
  "dev.projectLink": { uz: "Loyihangiz havolasi", en: "Link to your project", ru: "Ссылка на проект" },
  "dev.noProject": { uz: "Chiqarilgan loyiham yo'q", en: "I don't have a released project", ru: "У меня нет выпущенного проекта" },
  "dev.contactMethod": { uz: "Qanday bog'lanishimiz mumkin?", en: "How can we get in touch with you?", ru: "Как мы можем с вами связаться?" },
  "dev.contactDetails": { uz: "Aloqa ma'lumotlaringiz", en: "Your contact details", ru: "Ваши контактные данные" },
  "dev.consent": { uz: "Men shaxsiy ma'lumotlarimni qayta ishlashga rozilik bildiraman", en: "I give my consent to process my information", ru: "Я даю согласие на обработку моих данных" },
  "dev.send": { uz: "Yuborish", en: "Send", ru: "Отправить" },
  "dev.success": { uz: "Arizangiz qabul qilindi!", en: "Application submitted!", ru: "Заявка отправлена!" },
  "dev.error": { uz: "Xatolik yuz berdi", en: "An error occurred", ru: "Произошла ошибка" },

  // Help
  "help.title": { uz: "Yordam", en: "Help", ru: "Помощь" },
  "help.subtitle": { uz: "Ko'p uchraydigan muammolarning yechimlari", en: "Solutions to common problems", ru: "Решения распространённых проблем" },
  "help.gameErrors": { uz: "O'yindagi xatolar", en: "Errors in the game", ru: "Ошибки в игре" },
  "help.wontOpen": { uz: "O'yin ochilmayapti", en: "The game won't open", ru: "Игра не открывается" },
  "help.crash": { uz: "O'yinda xato, o'yin buziladi", en: "Error in the game, the game crashes", ru: "Ошибка в игре, игра вылетает" },
  "help.progress": { uz: "Keyingi bosqichga o'ta olmayapman", en: "I can't progress to the next level", ru: "Не могу перейти на следующий уровень" },
  "help.achievements": { uz: "Yutuqlarim yo'qoldi", en: "My achievements disappeared", ru: "Мои достижения исчезли" },
  "help.offline": { uz: "O'yin yuklanmayapti va oflayn ishlamayapti", en: "The game doesn't download and doesn't work offline", ru: "Игра не загружается и не работает офлайн" },
  "help.slow": { uz: "O'yin sekinlashadi, muzlaydi, buziladi", en: "The game slows down, freezes, crashes", ru: "Игра тормозит, зависает, вылетает" },
  "help.gameQuestions": { uz: "O'yin haqida savollar", en: "Questions about the game", ru: "Вопросы об игре" },
  "help.otherDevice": { uz: "Boshqa qurilmada o'yinni davom ettirish", en: "Continue playing on another device", ru: "Продолжить игру на другом устройстве" },
  "help.findGame": { uz: "O'yinni topmoqchiman, lekin nomini eslay olmayapman", en: "I want to find a game but can't remember the name", ru: "Хочу найти игру, но не помню название" },
  "help.payments": { uz: "To'lovlar va yutuqlar", en: "Payments and winnings", ru: "Платежи и выигрыши" },
  "help.winnings": { uz: "Yutuqlarimni ola olmayapman", en: "I can't collect my winnings", ru: "Не могу получить выигрыш" },
  "help.paymentFailed": { uz: "To'lov amalga oshmadi, ballarni olmadim", en: "Payment failed, I didn't receive the points", ru: "Платёж не прошёл, баллы не получены" },
  "help.steam": { uz: "Steam o'yin kalitlarini sotib olish", en: "Buying Steam game keys", ru: "Покупка ключей Steam" },
  "help.downloadSteam": { uz: "Steam-ni qayerdan yuklab olsam bo'ladi?", en: "Where can I download Steam?", ru: "Где скачать Steam?" },
  "help.activateKey": { uz: "Steam kalitini qanday faollashtiraman?", en: "How do I activate a Steam key?", ru: "Как активировать ключ Steam?" },
  "help.regionError": { uz: "\"Bu mahsulot bu mamlakatda mavjud emas\" xatosi", en: "\"This product is not available in this country\" error", ru: "Ошибка \"Продукт недоступен в этой стране\"" },
  "help.invalidCode": { uz: "\"Noto'g'ri mahsulot kodi\" xatosi", en: "\"Invalid Product Code\" error", ru: "Ошибка \"Неверный код продукта\"" },
  "help.dlc": { uz: "O'yin uchun DLC sotib olsam bo'ladimi?", en: "Can I buy DLCs for a game?", ru: "Можно ли купить DLC для игры?" },
  "help.alreadyHave": { uz: "Mahsulotni faollashtirdim, lekin tizim allaqachon bor deydi", en: "I've activated a product, but the system says I already have it", ru: "Активировал продукт, но система говорит что он уже есть" },
  "help.ads": { uz: "O'yin ichidagi reklamalar", en: "In-game ads", ru: "Реклама в игре" },
  "help.removeAds": { uz: "O'yin ichidagi reklamalarni olib tashlash", en: "Remove in-game ads", ru: "Убрать рекламу в игре" },
  "help.reportAd": { uz: "Reklama blokini xabar qilish", en: "Report an ad unit", ru: "Пожаловаться на рекламу" },
  "help.content": { uz: "O'yin ichidagi kontent", en: "In-game content", ru: "Контент в игре" },
  "help.reportContent": { uz: "O'yin kontentini xabar qilish", en: "Report game content", ru: "Пожаловаться на контент игры" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "uz",
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("app-language") as Language) || "uz";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
