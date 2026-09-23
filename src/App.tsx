import { useState, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from './i18n';
import Settings from './Settings';
import { products, rankProducts, getSimilarProducts, getRecommendations, type Product } from './products';

type Screen = 'welcome' | 'category' | 'condition' | 'products' | 'product-detail';
type Category = 'phone' | 'laptop' | 'pad' | 'accessory';
type Condition = 'new' | 'used' | 'any';
type SortBy = 'value' | 'price' | 'rating' | 'views';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>('uz');
  const [design, setDesign] = useState<'classic' | 'modern' | 'futuristic'>('modern');
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition>('any');
  const [sortBy, setSortBy] = useState<SortBy>('value');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoExpiry, setPromoExpiry] = useState<number>(0);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const t = (key: TranslationKey): string => translations[language][key];

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-black' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-black';
  const textSec = isDark ? 'text-gray-400' : 'text-gray-600';
  const surface = isDark ? 'bg-neutral-900' : 'bg-gray-50';
  const border = isDark ? 'border-neutral-800' : 'border-gray-200';

  useEffect(() => {
    if (promoExpiry > 0) {
      const timer = setInterval(() => {
        setPromoExpiry(prev => {
          if (prev <= 1) {
            setPromoCode(null);
            setPromoDiscount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [promoExpiry]);

  useEffect(() => {
    if (viewedProducts.length >= 3 && !promoCode) {
      const firstViewTime = viewedProducts[0].lastViewed?.getTime() || Date.now();
      const timeSinceFirstView = Date.now() - firstViewTime;
      if (timeSinceFirstView >= 15 * 60 * 1000) {
        const code = `SAVE5-${Math.random().toString(36).substring(7).toUpperCase()}`;
        setPromoCode(code);
        setPromoDiscount(5);
        setPromoExpiry(30 * 60);
      }
    }
  }, [viewedProducts, promoCode]);

  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedCondition !== 'any' && p.condition !== selectedCondition) return false;
    return true;
  });

  const sortedProducts = rankProducts(filteredProducts, sortBy);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen('product-detail');
    if (!viewedProducts.some(p => p.id === product.id)) {
      setViewedProducts([...viewedProducts, { ...product, lastViewed: new Date() }]);
    }
  };

  return (
    <div className={`min-h-screen ${bg} ${text} transition-colors duration-300`}>
      {/* Settings Button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className={`fixed top-5 right-5 w-10 h-10 rounded-xl ${surface} ${border} border flex items-center justify-center text-xl z-50 hover:scale-110 transition-transform`}
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        design={design}
        setDesign={setDesign}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {screen === 'welcome' && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
            <p className={`text-lg ${textSec} mb-10 max-w-md mx-auto`}>{t('welcomeDesc')}</p>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <button
                onClick={() => setScreen('category')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {t('browseProducts')}
              </button>
              <button
                onClick={() => setScreen('category')}
                className={`px-8 py-4 rounded-xl ${surface} ${border} border font-semibold text-lg hover:scale-105 transition-transform`}
              >
                {t('needHelp')}
              </button>
            </div>
          </div>
        )}

        {screen === 'category' && (
          <div className="py-8 animate-fade-in-up">
            <button
              onClick={() => setScreen('welcome')}
              className={`px-4 py-2 rounded-lg ${surface} ${border} border ${textSec} mb-6 hover:scale-105 transition-transform`}
            >
              ← {t('back')}
            </button>
            <h2 className="text-3xl font-bold mb-8">{t('selectCategory')}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'phone' as Category, name: t('phone'), emoji: '📱' },
                { id: 'laptop' as Category, name: t('laptop'), emoji: '💻' },
                { id: 'pad' as Category, name: t('pad'), emoji: '📟' },
                { id: 'accessory' as Category, name: t('accessories'), emoji: '🎧' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setScreen('condition'); }}
                  className={`p-8 rounded-2xl ${surface} ${border} border text-center hover:scale-105 transition-all hover:border-yellow-500`}
                >
                  <div className="text-5xl mb-3">{cat.emoji}</div>
                  <div className="text-lg font-semibold">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'condition' && (
          <div className="py-8 animate-fade-in-up">
            <button
              onClick={() => setScreen('category')}
              className={`px-4 py-2 rounded-lg ${surface} ${border} border ${textSec} mb-6 hover:scale-105 transition-transform`}
            >
              ← {t('back')}
            </button>
            <h2 className="text-3xl font-bold mb-8">{t('selectCondition')}</h2>
            <div className="flex flex-col gap-3">
              {[
                { id: 'new' as Condition, name: t('new'), emoji: '✨' },
                { id: 'used' as Condition, name: t('used'), emoji: '🔄' },
                { id: 'any' as Condition, name: t('any'), emoji: '🎯' },
              ].map(cond => (
                <button
                  key={cond.id}
                  onClick={() => { setSelectedCondition(cond.id); setScreen('products'); }}
                  className={`p-6 rounded-xl ${surface} ${border} border flex items-center gap-4 hover:scale-105 transition-all hover:border-yellow-500`}
                >
                  <span className="text-4xl">{cond.emoji}</span>
                  <span className="text-lg font-semibold">{cond.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'products' && (
          <div className="py-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setScreen('condition')}
                className={`px-4 py-2 rounded-lg ${surface} ${border} border ${textSec} hover:scale-105 transition-transform`}
              >
                ← {t('back')}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className={`px-4 py-2 rounded-lg ${surface} ${border} border ${text} cursor-pointer`}
              >
                <option value="value">{t('bestValue')}</option>
                <option value="price">{t('cheapest')}</option>
                <option value="rating">{t('premium')}</option>
                <option value="views">Popular</option>
              </select>
            </div>

            {promoCode && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border-2 border-yellow-500 mb-6 animate-scale-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-yellow-500">🎉 {t('specialOffer')} {promoDiscount}% {t('discount')}!</span>
                  <span className={`text-xs ${textSec}`}>{t('expires')}: {Math.floor(promoExpiry / 60)}:{String(promoExpiry % 60).padStart(2, '0')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="px-3 py-1 rounded bg-black/20 text-yellow-500 font-bold">{promoCode}</code>
                  <span className={`text-xs ${textSec}`}>{t('hurryUp')}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {sortedProducts.slice(0, 20).map((product, i) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className={`p-4 rounded-xl ${surface} ${border} border cursor-pointer hover:scale-105 transition-all hover:border-yellow-500`}
                  style={{ animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}
                >
                  <div className="text-4xl mb-2 text-center">{product.emoji}</div>
                  <div className="text-sm font-semibold mb-1 truncate">{product.name}</div>
                  <div className={`text-xs ${textSec} mb-2`}>{product.storage}GB · {product.condition === 'new' ? '✨' : '🔄'}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-yellow-500">${product.price}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-500 font-semibold">{product.valueScore.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>

            {getRecommendations(viewedProducts, products).length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">✨ {t('recommended')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {getRecommendations(viewedProducts, products).map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className={`p-3 rounded-xl border-2 border-yellow-500/40 bg-yellow-500/5 cursor-pointer hover:scale-105 transition-all`}
                    >
                      <div className="text-3xl mb-2 text-center">{product.emoji}</div>
                      <div className="text-sm font-semibold mb-1">{product.name}</div>
                      <div className="text-lg font-bold text-yellow-500">${product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 'product-detail' && selectedProduct && (
          <div className="py-8 animate-fade-in-up">
            <button
              onClick={() => setScreen('products')}
              className={`px-4 py-2 rounded-lg ${surface} ${border} border ${textSec} mb-6 hover:scale-105 transition-transform`}
            >
              ← {t('back')}
            </button>

            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{selectedProduct.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
              <div className="text-4xl font-bold text-yellow-500 mb-4">${selectedProduct.price}</div>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-semibold">{selectedProduct.storage}GB</span>
                {selectedProduct.battery && (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-semibold">🔋 {selectedProduct.battery}%</span>
                )}
                <span className={`px-3 py-1 rounded-full ${surface} ${textSec} text-sm font-semibold`}>
                  {selectedProduct.condition === 'new' ? '✨ Yangi' : '🔄 Ishlatilgan'}
                </span>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${surface} ${border} border mb-8`}>
              <h3 className="text-lg font-semibold mb-4">Xususiyatlar</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.specs.ram && (
                  <div>
                    <div className={`text-xs ${textSec}`}>RAM</div>
                    <div className="text-lg font-semibold">{selectedProduct.specs.ram}GB</div>
                  </div>
                )}
                {selectedProduct.specs.camera && (
                  <div>
                    <div className={`text-xs ${textSec}`}>Kamera</div>
                    <div className="text-lg font-semibold">{selectedProduct.specs.camera}</div>
                  </div>
                )}
                {selectedProduct.specs.display && (
                  <div>
                    <div className={`text-xs ${textSec}`}>Ekran</div>
                    <div className="text-lg font-semibold">{selectedProduct.specs.display}</div>
                  </div>
                )}
                {selectedProduct.specs.processor && (
                  <div>
                    <div className={`text-xs ${textSec}`}>Protsessor</div>
                    <div className="text-lg font-semibold">{selectedProduct.specs.processor}</div>
                  </div>
                )}
              </div>
            </div>

            {getSimilarProducts(selectedProduct, products).length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">🔍 {t('similar')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {getSimilarProducts(selectedProduct, products).map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className={`p-4 rounded-xl ${surface} ${border} border cursor-pointer hover:scale-105 transition-all`}
                    >
                      <div className="text-3xl mb-2 text-center">{product.emoji}</div>
                      <div className="text-sm font-semibold mb-1">{product.name}</div>
                      <div className="text-lg font-bold text-yellow-500">${product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
