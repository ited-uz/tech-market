// ============ INTERNATIONALIZATION ============
export type Language = 'uz' | 'en' | 'ru';

export const translations = {
  uz: {
    // Welcome
    welcome: "Assalomu alaykum!",
    welcomeDesc: "Sizni ko'rib xursandmiz. Nima olmoqchisiz?",
    browseProducts: "Mahsulotlarni ko'rish",
    needHelp: "Yordam kerakmi?",
    
    // Categories
    selectCategory: "Kategoriya tanlang",
    phone: "Telefon",
    laptop: "Laptop",
    pad: "Planshet",
    accessories: "Aksessuarlar",
    
    // Condition
    selectCondition: "Holati qanday bo'lsin?",
    new: "Yangi",
    used: "Ishlatilgan",
    any: "Farqi yo'q",
    
    // Filters
    priceRange: "Narx oralig'i",
    brand: "Brend",
    color: "Rang",
    storage: "Xotira",
    model: "Model",
    
    // Ranking
    bestValue: "Eng yaxshi narx/sifat",
    cheapest: "Eng arzon",
    premium: "Premium",
    recommended: "Tavsiya etiladi",
    compare: "Solishtirish",
    similar: "O'xshash modelllar",
    
    // Promo
    specialOffer: "Maxsus taklif!",
    discount: "chegirma",
    expires: "Amal qilish muddati",
    minutes: "daqiqa",
    seconds: "soniya",
    usePromo: "Promo kodni ishlatish",
    hurryUp: "Shoshiling!",
    
    // Settings
    settings: "Sozlamalar",
    theme: "Mavzu",
    light: "Oq",
    dark: "Qora",
    language: "Til",
    design: "Dizayn",
    classic: "Klassik",
    modern: "Zamonaviy",
    futuristic: "Futuristik",
    
    // Common
    back: "Orqaga",
    next: "Keyingi",
    cancel: "Bekor qilish",
    apply: "Qo'llash",
    search: "Qidirish",
    filter: "Filter",
    sort: "Saralash",
  },
  
  en: {
    welcome: "Hello!",
    welcomeDesc: "Welcome! What are you looking for?",
    browseProducts: "Browse Products",
    needHelp: "Need help?",
    
    selectCategory: "Select Category",
    phone: "Phone",
    laptop: "Laptop",
    pad: "Tablet",
    accessories: "Accessories",
    
    selectCondition: "What condition?",
    new: "New",
    used: "Used",
    any: "Any",
    
    priceRange: "Price Range",
    brand: "Brand",
    color: "Color",
    storage: "Storage",
    model: "Model",
    
    bestValue: "Best Value",
    cheapest: "Cheapest",
    premium: "Premium",
    recommended: "Recommended",
    compare: "Compare",
    similar: "Similar Models",
    
    specialOffer: "Special Offer!",
    discount: "discount",
    expires: "Expires in",
    minutes: "minutes",
    seconds: "seconds",
    usePromo: "Use Promo Code",
    hurryUp: "Hurry up!",
    
    settings: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    design: "Design",
    classic: "Classic",
    modern: "Modern",
    futuristic: "Futuristic",
    
    back: "Back",
    next: "Next",
    cancel: "Cancel",
    apply: "Apply",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
  },
  
  ru: {
    welcome: "Здравствуйте!",
    welcomeDesc: "Рады вас видеть. Что вы ищете?",
    browseProducts: "Смотреть товары",
    needHelp: "Нужна помощь?",
    
    selectCategory: "Выберите категорию",
    phone: "Телефон",
    laptop: "Ноутбук",
    pad: "Планшет",
    accessories: "Аксессуары",
    
    selectCondition: "Какое состояние?",
    new: "Новый",
    used: "Б/У",
    any: "Любое",
    
    priceRange: "Ценовой диапазон",
    brand: "Бренд",
    color: "Цвет",
    storage: "Память",
    model: "Модель",
    
    bestValue: "Лучшая цена/качество",
    cheapest: "Самый дешевый",
    premium: "Премиум",
    recommended: "Рекомендуем",
    compare: "Сравнить",
    similar: "Похожие модели",
    
    specialOffer: "Специальное предложение!",
    discount: "скидка",
    expires: "Истекает через",
    minutes: "минут",
    seconds: "секунд",
    usePromo: "Использовать промокод",
    hurryUp: "Поторопитесь!",
    
    settings: "Настройки",
    theme: "Тема",
    light: "Светлая",
    dark: "Темная",
    language: "Язык",
    design: "Дизайн",
    classic: "Классический",
    modern: "Современный",
    futuristic: "Футуристический",
    
    back: "Назад",
    next: "Далее",
    cancel: "Отмена",
    apply: "Применить",
    search: "Поиск",
    filter: "Фильтр",
    sort: "Сортировка",
  },
};

export type TranslationKey = keyof typeof translations.uz;
