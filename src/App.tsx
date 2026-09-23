import { useState, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from './i18n';
import Settings from './Settings';
import { products, rankProducts, getSimilarProducts, getRecommendations, type Product } from './products';

type Screen = 'welcome' | 'category' | 'condition' | 'filters' | 'products' | 'product-detail';
type Category = 'phone' | 'laptop' | 'pad' | 'accessory';
type Condition = 'new' | 'used' | 'any';
type SortBy = 'value' | 'price' | 'rating' | 'views';

export default function App() {
  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>('uz');
  const [design, setDesign] = useState<'classic' | 'modern' | 'futuristic'>('modern');

  // Navigation state
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition>('any');
  const [sortBy, setSortBy] = useState<SortBy>('value');

  // Product state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  // Promo state
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoExpiry, setPromoExpiry] = useState<number>(0);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Translation helper
  const t = (key: TranslationKey): string => translations[language][key];

  // Promo countdown
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

  // Check for promo eligibility (after 15 min of viewing)
  useEffect(() => {
    if (viewedProducts.length >= 3 && !promoCode) {
      const firstViewTime = viewedProducts[0].lastViewed?.getTime() || Date.now();
      const timeSinceFirstView = Date.now() - firstViewTime;
      
      if (timeSinceFirstView >= 15 * 60 * 1000) { // 15 minutes
        const code = `SAVE5-${Math.random().toString(36).substring(7).toUpperCase()}`;
        setPromoCode(code);
        setPromoDiscount(5);
        setPromoExpiry(30 * 60); // 30 minutes
      }
    }
  }, [viewedProducts, promoCode]);

  // Filter products
  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedCondition !== 'any' && p.condition !== selectedCondition) return false;
    return true;
  });

  const sortedProducts = rankProducts(filteredProducts, sortBy);

  // Theme colors
  const colors = theme === 'dark' 
    ? { bg: '#000000', surface: '#0a0a0a', text: '#ffffff', textSecondary: '#a1a1a1', textMuted: '#525252', border: '#1a1a1a', accent: '#d4af37', success: '#22c55e' }
    : { bg: '#ffffff', surface: '#f9f9f9', text: '#000000', textSecondary: '#525252', textMuted: '#a1a1a1', border: '#e5e5e5', accent: '#d4af37', success: '#16a34a' };

  // Track product view
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setScreen('product-detail');
    
    // Add to viewed products
    if (!viewedProducts.some(p => p.id === product.id)) {
      setViewedProducts([...viewedProducts, { ...product, lastViewed: new Date() }]);
    }
  };

  // Render based on screen
  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'category':
        return <CategoryScreen />;
      case 'condition':
        return <ConditionScreen />;
      case 'filters':
        return <FiltersScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  // Welcome Screen
  function WelcomeScreen() {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', animation: 'fadeInUp 0.6s ease' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>👋</div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: colors.text }}>
          {t('welcome')}
        </h1>
        <p style={{ fontSize: '16px', color: colors.textSecondary, marginBottom: '40px', lineHeight: 1.6 }}>
          {t('welcomeDesc')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
          <button
            onClick={() => setScreen('category')}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              background: `linear-gradient(135deg, ${colors.accent}, #f5d67b)`,
              color: '#000',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
            }}
          >
            {t('browseProducts')}
          </button>
          <button
            onClick={() => setScreen('category')}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t('needHelp')}
          </button>
        </div>
      </div>
    );
  }

  // Category Screen
  function CategoryScreen() {
    const categories = [
      { id: 'phone' as Category, name: t('phone'), emoji: '📱' },
      { id: 'laptop' as Category, name: t('laptop'), emoji: '💻' },
      { id: 'pad' as Category, name: t('pad'), emoji: '📟' },
      { id: 'accessory' as Category, name: t('accessories'), emoji: '🎧' },
    ];

    return (
      <div style={{ padding: '40px 20px', animation: 'fadeInUp 0.4s ease' }}>
        <button
          onClick={() => setScreen('welcome')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: 'transparent',
            color: colors.textSecondary,
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
          }}
        >
          ← {t('back')}
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: colors.text }}>
          {t('selectCategory')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setScreen('condition');
              }}
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{cat.emoji}</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: colors.text }}>{cat.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Condition Screen
  function ConditionScreen() {
    const conditions = [
      { id: 'new' as Condition, name: t('new'), emoji: '✨' },
      { id: 'used' as Condition, name: t('used'), emoji: '🔄' },
      { id: 'any' as Condition, name: t('any'), emoji: '🎯' },
    ];

    return (
      <div style={{ padding: '40px 20px', animation: 'fadeInUp 0.4s ease' }}>
        <button
          onClick={() => setScreen('category')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: 'transparent',
            color: colors.textSecondary,
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
          }}
        >
          ← {t('back')}
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: colors.text }}>
          {t('selectCondition')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {conditions.map(cond => (
            <button
              key={cond.id}
              onClick={() => {
                setSelectedCondition(cond.id);
                setScreen('products');
              }}
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '32px' }}>{cond.emoji}</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: colors.text }}>{cond.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Filters Screen (placeholder)
  function FiltersScreen() {
    return (
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.text }}>Filters</h2>
      </div>
    );
  }

  // Products Screen
  function ProductsScreen() {
    const similarProducts = selectedProduct ? getSimilarProducts(selectedProduct, products) : [];
    const recommendations = getRecommendations(viewedProducts, products);

    return (
      <div style={{ padding: '20px', animation: 'fadeInUp 0.4s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => setScreen('condition')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: 'transparent',
              color: colors.textSecondary,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            ← {t('back')}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <option value="value">{t('bestValue')}</option>
            <option value="price">{t('cheapest')}</option>
            <option value="rating">{t('premium')}</option>
            <option value="views">Popular</option>
          </select>
        </div>

        {/* Promo Banner */}
        {promoCode && (
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
              border: `2px solid ${colors.accent}`,
              marginBottom: '20px',
              animation: 'scaleIn 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: colors.accent }}>
                🎉 {t('specialOffer')} {promoDiscount}% {t('discount')}!
              </span>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>
                {t('expires')}: {Math.floor(promoExpiry / 60)}:{String(promoExpiry % 60).padStart(2, '0')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <code style={{ padding: '4px 8px', borderRadius: '4px', background: colors.bg, color: colors.accent, fontSize: '14px', fontWeight: 600 }}>
                {promoCode}
              </code>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>{t('hurryUp')}</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {sortedProducts.slice(0, 20).map((product, i) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>{product.emoji}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: colors.text, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {product.name}
              </div>
              <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '8px' }}>
                {product.storage}GB · {product.condition === 'new' ? '✨' : '🔄'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: colors.accent }}>${product.price}</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: `${colors.accent}20`, color: colors.accent }}>
                  {product.valueScore.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>
              ✨ {t('recommended')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
              {recommendations.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.accent}40`,
                    background: `${colors.accent}08`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '6px', textAlign: 'center' }}>{product.emoji}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{product.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: colors.accent }}>${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Product Detail Screen
  function ProductDetailScreen() {
    if (!selectedProduct) return null;

    const similarProducts = getSimilarProducts(selectedProduct, products);

    return (
      <div style={{ padding: '20px', animation: 'fadeInUp 0.4s ease' }}>
        <button
          onClick={() => setScreen('products')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            background: 'transparent',
            color: colors.textSecondary,
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← {t('back')}
        </button>

        {/* Product Info */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>{selectedProduct.emoji}</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
            {selectedProduct.name}
          </h2>
          <div style={{ fontSize: '32px', fontWeight: 700, color: colors.accent, marginBottom: '16px' }}>
            ${selectedProduct.price}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', borderRadius: '20px', background: `${colors.accent}20`, color: colors.accent, fontSize: '12px', fontWeight: 600 }}>
              {selectedProduct.storage}GB
            </span>
            {selectedProduct.battery && (
              <span style={{ padding: '4px 12px', borderRadius: '20px', background: `${colors.success}20`, color: colors.success, fontSize: '12px', fontWeight: 600 }}>
                🔋 {selectedProduct.battery}%
              </span>
            )}
            <span style={{ padding: '4px 12px', borderRadius: '20px', background: colors.surface, color: colors.textSecondary, fontSize: '12px', fontWeight: 600 }}>
              {selectedProduct.condition === 'new' ? '✨ Yangi' : '🔄 Ishlatilgan'}
            </span>
          </div>
        </div>

        {/* Specs */}
        <div style={{ padding: '16px', borderRadius: '12px', background: colors.surface, border: `1px solid ${colors.border}`, marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>Xususiyatlar</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {selectedProduct.specs.ram && (
              <div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>RAM</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>{selectedProduct.specs.ram}GB</div>
              </div>
            )}
            {selectedProduct.specs.camera && (
              <div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>Kamera</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>{selectedProduct.specs.camera}</div>
              </div>
            )}
            {selectedProduct.specs.display && (
              <div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>Ekran</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>{selectedProduct.specs.display}</div>
              </div>
            )}
            {selectedProduct.specs.processor && (
              <div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>Protsessor</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>{selectedProduct.specs.processor}</div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: colors.text }}>
              🔍 {t('similar')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {similarProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.border}`,
                    background: colors.surface,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '6px', textAlign: 'center' }}>{product.emoji}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.text, marginBottom: '4px' }}>{product.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: colors.accent }}>${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", transition: 'all 0.3s ease' }}>
      {/* Settings Button */}
      <button
        onClick={() => setSettingsOpen(true)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          color: colors.text,
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {renderScreen()}
      </div>
    </div>
  );
}
