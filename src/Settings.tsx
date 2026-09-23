import type { Language } from './i18n';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  design: 'classic' | 'modern' | 'futuristic';
  setDesign: (design: 'classic' | 'modern' | 'futuristic') => void;
}

export default function Settings({
  isOpen,
  onClose,
  theme,
  setTheme,
  language,
  setLanguage,
  design,
  setDesign,
}: SettingsProps) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-neutral-900' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-black';
  const textSec = isDark ? 'text-gray-400' : 'text-gray-600';
  const surface = isDark ? 'bg-neutral-800' : 'bg-gray-100';
  const border = isDark ? 'border-neutral-700' : 'border-gray-300';

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const designs = [
    { id: 'classic' as const, name: 'Klassik', emoji: '🎨', desc: 'Aniq va sodda' },
    { id: 'modern' as const, name: 'Zamonaviy', emoji: '✨', desc: 'Minimal va elegant' },
    { id: 'futuristic' as const, name: 'Futuristik', emoji: '🚀', desc: 'Texnologik va innovatsion' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] animate-fade-in"
      />

      {/* Settings Panel */}
      <div
        className={`fixed top-0 right-0 w-96 max-w-full h-screen ${bg} ${text} border-l ${border} z-[999] overflow-y-auto animate-slide-in-right p-6`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">⚙️ Sozlamalar</h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg ${surface} ${text} flex items-center justify-center hover:scale-110 transition-transform`}
          >
            ✕
          </button>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <h3 className={`text-sm font-semibold mb-3 ${textSec}`}>🎨 Mavzu</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 p-3 rounded-xl border-2 ${theme === 'light' ? 'border-yellow-500' : border} bg-white text-black font-semibold hover:scale-105 transition-transform`}
            >
              ☀️ Oq
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 p-3 rounded-xl border-2 ${theme === 'dark' ? 'border-yellow-500' : border} bg-black text-white font-semibold hover:scale-105 transition-transform`}
            >
              🌙 Qora
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="mb-8">
          <h3 className={`text-sm font-semibold mb-3 ${textSec}`}>🌍 Til</h3>
          <div className="flex flex-col gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl border-2 ${language === lang.code ? 'border-yellow-500' : border} ${surface} ${text} flex items-center gap-3 hover:scale-105 transition-transform`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-semibold">{lang.name}</span>
                {language === lang.code && <span className="ml-auto text-yellow-500">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Design Section */}
        <div className="mb-8">
          <h3 className={`text-sm font-semibold mb-3 ${textSec}`}>✨ Dizayn</h3>
          <div className="flex flex-col gap-2">
            {designs.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesign(d.id)}
                className={`p-4 rounded-xl border-2 ${design === d.id ? 'border-yellow-500' : border} ${surface} ${text} text-left hover:scale-105 transition-transform`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{d.emoji}</span>
                  <span className="font-semibold">{d.name}</span>
                  {design === d.id && <span className="ml-auto text-yellow-500">✓</span>}
                </div>
                <div className={`text-xs ${textSec} ml-9`}>{d.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
