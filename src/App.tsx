import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { themes, type ThemeId, type Theme } from './themes';

// ============ TYPES ============
type TabType = 'vitrina' | 'chat' | 'tradein' | 'qr' | 'loyalty';
type AdminTabType = 'dashboard' | 'crm' | 'voice' | 'inventory' | 'analytics' | 'broadcast';
type ModeType = 'miniapp' | 'admin';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Product {
  id: number;
  title: string;
  spec: string;
  battery: number | null;
  price: number;
  emoji: string;
  tag: string | null;
  category: string;
}

// ============ DATA ============
const products: Product[] = [
  { id: 1, title: 'iPhone 13 Pro', spec: '128GB · Sierra Blue', battery: 87, price: 620, emoji: '📱', tag: 'Kafolat', category: 'iphone' },
  { id: 2, title: 'iPhone 14', spec: '128GB · Midnight', battery: 100, price: 780, emoji: '📱', tag: 'Yangi', category: 'iphone' },
  { id: 3, title: 'Samsung S23', spec: '256GB · Black', battery: 92, price: 590, emoji: '📱', tag: null, category: 'samsung' },
  { id: 4, title: 'MacBook Air M2', spec: '8/256 · Gray', battery: null, price: 880, emoji: '💻', tag: 'P2P', category: 'laptop' },
  { id: 5, title: 'iPhone 15 Pro', spec: '256GB · Titanium', battery: 100, price: 1150, emoji: '📱', tag: 'Yangi', category: 'iphone' },
  { id: 6, title: 'Galaxy S24', spec: '512GB · Black', battery: 100, price: 1050, emoji: '📱', tag: 'Yangi', category: 'samsung' },
];

const customers = [
  { id: 1, name: 'Jasur T.', phone: '+998 90 123 45 67', spent: 2450, tier: 'gold', points: 1240, visits: 5 },
  { id: 2, name: 'Dilshod K.', phone: '+998 91 234 56 78', spent: 890, tier: 'silver', points: 450, visits: 2 },
  { id: 3, name: 'Nodira M.', phone: '+998 93 345 67 89', spent: 3200, tier: 'gold', points: 2100, visits: 8 },
  { id: 4, name: 'Sardor A.', phone: '+998 94 456 78 90', spent: 560, tier: 'bronze', points: 120, visits: 1 },
  { id: 5, name: 'Malika R.', phone: '+998 97 567 89 01', spent: 1800, tier: 'silver', points: 780, visits: 4 },
];

const weeklyData = [
  { day: 'Du', value: 1240 },
  { day: 'Se', value: 2100 },
  { day: 'Chor', value: 890 },
  { day: 'Pay', value: 3200 },
  { day: 'Ju', value: 1650 },
  { day: 'Sha', value: 4800 },
  { day: 'Yak', value: 2400 },
];

// ============ MAIN APP ============
export default function App() {
  const [mode, setMode] = useState<ModeType>('miniapp');
  const [activeTab, setActiveTab] = useState<TabType>('vitrina');
  const [adminTab, setAdminTab] = useState<AdminTabType>('dashboard');
  const [themeId, setThemeId] = useState<ThemeId>('midnight');
  const theme = themes[themeId];

  return (
    <div style={{ 
      background: theme.bgPrimary, 
      color: theme.textPrimary, 
      minHeight: '100vh',
      transition: 'background 0.5s ease'
    }}>
      {/* Ambient Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 20%, ${theme.accent}08 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${theme.accent}05 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header */}
      <header className="text-center pt-20 pb-12 px-4 relative" style={{ zIndex: 1 }}>
        <div 
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass"
          style={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'fadeInDown 0.6s ease'
          }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{ 
              background: theme.success,
              animation: 'pulse 2s infinite',
              boxShadow: `0 0 8px ${theme.success}`
            }}
          />
          <span style={{ color: theme.textSecondary, fontSize: '13px', fontWeight: 500 }}>
            AI Sotuvchi faol
          </span>
        </div>
        
        <h1 className="mb-4" style={{ animation: 'fadeInUp 0.8s ease' }}>
          <span 
            className="gradient-text"
            style={{ 
              background: theme.gradient, 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent'
            }}
          >
            TechSeller
          </span>
          <span style={{ color: theme.textPrimary }}> AI</span>
        </h1>
        
        <p style={{ 
          color: theme.textMuted, 
          fontSize: '16px', 
          maxWidth: '500px', 
          margin: '0 auto',
          lineHeight: 1.6,
          animation: 'fadeInUp 1s ease'
        }}>
          O'zbekiston bozorlari uchun birinchi to'liq AI savdo tizimi
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mb-20 px-4 relative" style={{ zIndex: 1 }}>
        {/* Mode Switch */}
        <div 
          className="card p-1.5 flex gap-1.5"
          style={{ 
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            animation: 'fadeInUp 0.8s ease 0.2s both'
          }}
        >
          <button
            onClick={() => setMode('miniapp')}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={mode === 'miniapp' ? { 
              background: theme.gradient, 
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px ' + theme.accent + '30',
              transform: 'scale(1.02)'
            } : { 
              color: theme.textMuted,
              background: 'transparent'
            }}
          >
            📱 Mini-App
          </button>
          <button
            onClick={() => setMode('admin')}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={mode === 'admin' ? { 
              background: theme.gradient, 
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px ' + theme.accent + '30',
              transform: 'scale(1.02)'
            } : { 
              color: theme.textMuted,
              background: 'transparent'
            }}
          >
            🏪 Admin
          </button>
        </div>

        {/* Theme Switch */}
        <div className="flex gap-2" style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}>
          {(Object.keys(themes) as ThemeId[]).map(tid => (
            <button
              key={tid}
              onClick={() => setThemeId(tid)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={themeId === tid ? { 
                background: theme.gradient, 
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transform: 'scale(1.05)'
              } : { 
                background: theme.surface, 
                color: theme.textMuted, 
                border: `1px solid ${theme.border}`
              }}
            >
              {themes[tid].emoji} {themes[tid].name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 relative" style={{ zIndex: 1 }}>
        {mode === 'miniapp' ? (
          <>
            <MiniAppView activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
            <FeaturesSection theme={theme} />
          </>
        ) : (
          <AdminView adminTab={adminTab} setAdminTab={setAdminTab} theme={theme} />
        )}
      </div>

      {/* Footer */}
      <footer 
        className="text-center py-16 border-t relative"
        style={{ borderColor: theme.border, zIndex: 1 }}
      >
        <p style={{ color: theme.textMuted, fontSize: '13px' }}>
          TechSeller AI © 2026 · O'zbekiston bozorlari uchun maxsus
        </p>
        <p style={{ color: theme.textMuted, fontSize: '11px', marginTop: '8px', opacity: 0.6 }}>
          Powered by GPT-4 Vision · Whisper · Telegram · Payme · Click
        </p>
      </footer>
    </div>
  );
}

// ============ MINI APP VIEW ============
function MiniAppView({ activeTab, setActiveTab, theme }: { 
  activeTab: TabType; 
  setActiveTab: (t: TabType) => void; 
  theme: Theme 
}) {
  return (
    <div className="flex justify-center px-4 mb-20">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div 
          className="h-full overflow-y-auto pt-12 pb-24"
          style={{ background: theme.bgPrimary }}
        >
          {activeTab === 'vitrina' && <VitrinaTab theme={theme} />}
          {activeTab === 'chat' && <ChatTab theme={theme} />}
          {activeTab === 'tradein' && <TradeInTab theme={theme} />}
          {activeTab === 'qr' && <QRTab theme={theme} />}
          {activeTab === 'loyalty' && <LoyaltyTab theme={theme} />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
      </div>
    </div>
  );
}

// ============ VITRINA TAB ============
function VitrinaTab({ theme }: { theme: Theme }) {
  const [filter, setFilter] = useState('all');
  
  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="px-5 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: 700 }}>
          Vitrina
        </h2>
        <div 
          className="badge badge-primary"
          style={{ 
            background: `${theme.accent}20`, 
            color: theme.accent,
            border: `1px solid ${theme.accent}40`
          }}
        >
          1$ = 12,850
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Hammasi' },
          { id: 'iphone', label: 'iPhone' },
          { id: 'samsung', label: 'Samsung' },
          { id: 'laptop', label: 'Noutbuk' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
            style={filter === f.id ? {
              background: theme.gradient,
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            } : {
              background: theme.surface,
              color: theme.textSecondary,
              border: `1px solid ${theme.border}`
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="card p-4 relative overflow-hidden"
            style={{ 
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {p.tag && (
              <div 
                className="absolute top-3 right-3 badge"
                style={{ 
                  background: `${theme.accent}20`, 
                  color: theme.accent,
                  border: `1px solid ${theme.accent}40`,
                  fontSize: '10px'
                }}
              >
                {p.tag}
              </div>
            )}
            <div className="text-4xl mb-3">{p.emoji}</div>
            <div 
              className="text-sm font-semibold mb-1 truncate"
              style={{ color: theme.textPrimary }}
            >
              {p.title}
            </div>
            <div 
              className="text-xs mb-3 truncate"
              style={{ color: theme.textMuted }}
            >
              {p.spec}
            </div>
            <div className="flex items-center justify-between">
              <div 
                className="text-lg font-bold"
                style={{ color: theme.accent }}
              >
                ${p.price}
              </div>
              {p.battery && (
                <div 
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  🔋 {p.battery}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CHAT TAB ============
function ChatTab({ theme }: { theme: Theme }) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Assalomu alaykum! 👋 Qaysi telefon qiziqtiryapti?", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: input, 
      sender: 'user',
      timestamp: new Date()
    }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "iPhone 13 Pro - $620. 1 oy kafolat bilan. 💎", 
        sender: 'ai',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const quickReplies = ['iPhone 13 Pro narxi?', 'Trade-in bormi?', 'Yetkazib berish?'];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div 
        className="px-5 py-4 border-b glass"
        style={{ borderColor: theme.border }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ 
              background: theme.gradient, 
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px ' + theme.accent + '30'
            }}
          >
            AI
          </div>
          <div>
            <div 
              className="text-sm font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Sardor (AI)
            </div>
            <div 
              className="text-xs flex items-center gap-1"
              style={{ color: theme.success }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ 
                  background: theme.success,
                  animation: 'pulse 2s infinite',
                  boxShadow: `0 0 6px ${theme.success}`
                }}
              />
              Onlayn · 0.8s
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
        style={{ height: '480px' }}
      >
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'fadeInUp 0.3s ease' }}
          >
            <div
              className="px-4 py-3 rounded-2xl text-sm max-w-[80%]"
              style={msg.sender === 'user' 
                ? { 
                    background: theme.gradient, 
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    borderRadius: '18px 18px 4px 18px'
                  }
                : { 
                    background: theme.surface, 
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '18px 18px 18px 4px'
                  }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start" style={{ animation: 'fadeIn 0.3s ease' }}>
            <div 
              className="px-4 py-3 rounded-2xl flex gap-1"
              style={{ 
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '18px 18px 18px 4px'
              }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    background: theme.textMuted,
                    animation: `bounce 1s infinite ${delay}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div 
        className="px-5 py-4 border-t glass"
        style={{ borderColor: theme.border }}
      >
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {quickReplies.map(q => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all"
              style={{ 
                background: theme.surface, 
                color: theme.textSecondary, 
                border: `1px solid ${theme.border}`
              }}
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Xabar yozing..."
            className="input flex-1"
          />
          <button onClick={send} className="btn btn-primary px-5">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ TRADE-IN TAB ============
function TradeInTab({ theme }: { theme: Theme }) {
  const [state, setState] = useState<'upload' | 'loading' | 'result'>('upload');

  const startAnalysis = () => {
    setState('loading');
    setTimeout(() => setState('result'), 2000);
  };

  return (
    <div className="px-5 animate-fade-in-up">
      <h2 
        className="mb-2"
        style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: 700 }}
      >
        Trade-In
      </h2>
      <p 
        className="mb-6"
        style={{ color: theme.textMuted, fontSize: '14px' }}
      >
        Skrinshot yuklang — AI 5 soniyada baholaydi
      </p>

      {state === 'upload' && (
        <div
          onClick={startAnalysis}
          className="card p-8 text-center cursor-pointer"
          style={{ 
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            border: `2px dashed ${theme.border}`
          }}
        >
          <div className="text-5xl mb-4 animate-float">📸</div>
          <div 
            className="text-sm font-semibold mb-1"
            style={{ color: theme.textPrimary }}
          >
            Skrinshot yuklang
          </div>
          <div 
            className="text-xs"
            style={{ color: theme.textMuted }}
          >
            Battery Health sahifasi
          </div>
          <div 
            className="text-xs mt-4 font-medium"
            style={{ color: theme.accent }}
          >
            ⚡ 5 soniyada natija
          </div>
        </div>
      )}

      {state === 'loading' && (
        <div 
          className="card p-8 text-center"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          <div 
            className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: theme.accent, borderTopColor: 'transparent' }}
          />
          <div 
            className="text-sm font-medium"
            style={{ color: theme.accent }}
          >
            AI tahlil qilmoqda...
          </div>
        </div>
      )}

      {state === 'result' && (
        <div 
          className="card p-5"
          style={{ 
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: 'scaleIn 0.3s ease'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✅</span>
            <span 
              className="text-sm font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Tahlil yakunlandi
            </span>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ['Model:', 'iPhone 11 · 128GB', theme.textPrimary],
              ['Batareya:', '83%', theme.accent],
              ['Bozor narxi:', '$260', theme.textPrimary],
            ].map(([label, val, color], i) => (
              <div 
                key={i}
                className="flex justify-between py-2 border-b"
                style={{ borderColor: theme.border }}
              >
                <span style={{ color: theme.textMuted }}>{label}</span>
                <span className="font-semibold" style={{ color }}>{val}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3">
              <span 
                className="font-semibold"
                style={{ color: theme.accent }}
              >
                Taklif:
              </span>
              <span 
                className="text-2xl font-bold"
                style={{ color: theme.accent }}
              >
                $210
              </span>
            </div>
          </div>
          <button className="btn btn-primary w-full py-3 mt-4 text-sm">
            💬 AI bilan gaplashish
          </button>
        </div>
      )}
    </div>
  );
}

// ============ QR TAB ============
function QRTab({ theme }: { theme: Theme }) {
  const [time, setTime] = useState(90 * 60);

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');

  return (
    <div className="px-5 animate-fade-in-up">
      <h2 
        className="mb-2"
        style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: 700 }}
      >
        VIP Bron
      </h2>
      <p 
        className="mb-6"
        style={{ color: theme.textMuted, fontSize: '14px' }}
      >
        Anti-Vozdux: vaqt tugasa, boshqaga sotiladi
      </p>

      <div 
        className="card p-6 text-center"
        style={{ 
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 40px ' + theme.accent + '15'
        }}
      >
        <div 
          className="text-4xl font-bold mb-2 tabular-nums"
          style={{ color: theme.accent }}
        >
          {h}:{m}:{s}
        </div>
        <div 
          className="text-xs mb-6"
          style={{ color: theme.textMuted }}
        >
          Qolgan vaqt
        </div>

        <div 
          className="text-sm font-semibold mb-2"
          style={{ color: theme.textPrimary }}
        >
          iPhone 13 Pro · 128GB
        </div>
        <div 
          className="text-xs mb-6 font-mono"
          style={{ color: theme.accent }}
        >
          QR-A7F3-D9E1-B42C
        </div>

        <div 
          className="flex justify-between text-sm pt-4 border-t"
          style={{ borderColor: theme.border }}
        >
          <div>
            <div 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              Xaridor
            </div>
            <div 
              className="font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Jasur T.
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              Narx
            </div>
            <div 
              className="font-bold"
              style={{ color: theme.accent }}
            >
              $615
            </div>
          </div>
        </div>
      </div>

      <div 
        className="card p-4 mt-4"
        style={{ 
          borderColor: `${theme.warning}40`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div className="flex items-start gap-2">
          <span>⚠️</span>
          <div>
            <div 
              className="text-xs font-semibold mb-1"
              style={{ color: theme.warning }}
            >
              Eslatma
            </div>
            <div 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              90 daqiqa ichida yetib keling
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ LOYALTY TAB ============
function LoyaltyTab({ theme }: { theme: Theme }) {
  const points = 1240;
  const progress = (points / 2000) * 100;

  return (
    <div className="px-5 animate-fade-in-up">
      <h2 
        className="mb-6"
        style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: 700 }}
      >
        Bonus
      </h2>

      <div 
        className="card p-6 mb-4"
        style={{ 
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 40px ' + theme.accent + '10'
        }}
      >
        <div 
          className="text-xs mb-2"
          style={{ color: theme.textMuted }}
        >
          Joriy bonuslar
        </div>
        <div 
          className="text-3xl font-bold mb-4"
          style={{ color: theme.accent }}
        >
          {points.toLocaleString()}
        </div>
        
        <div 
          className="h-2 rounded-full overflow-hidden mb-2"
          style={{ background: theme.border }}
        >
          <div 
            className="h-full rounded-full transition-all duration-1000"
            style={{ 
              width: `${progress}%`, 
              background: theme.gradient,
              boxShadow: `0 0 10px ${theme.accent}50`
            }}
          />
        </div>
        <div 
          className="text-xs"
          style={{ color: theme.textMuted }}
        >
          Gold gacha 760 ball
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { emoji: '🎫', name: "5,000 so'm", points: 500 },
          { emoji: '🔌', name: 'Adapter', points: 300 },
          { emoji: '🛡️', name: 'Laminat', points: 200 },
          { emoji: '✨', name: 'Tozalash', points: 150 },
        ].map((r, i) => (
          <div 
            key={i} 
            className="card p-4 text-center"
            style={{ 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div className="text-2xl mb-2">{r.emoji}</div>
            <div 
              className="text-xs font-medium mb-1"
              style={{ color: theme.textPrimary }}
            >
              {r.name}
            </div>
            <div 
              className="text-xs font-semibold"
              style={{ color: theme.accent }}
            >
              {r.points} ball
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BOTTOM NAV ============
function BottomNav({ activeTab, setActiveTab, theme }: { 
  activeTab: TabType; 
  setActiveTab: (t: TabType) => void; 
  theme: Theme 
}) {
  const tabs = [
    { id: 'vitrina' as TabType, icon: '🏬', label: 'Vitrina' },
    { id: 'chat' as TabType, icon: '💬', label: 'AI' },
    { id: 'tradein' as TabType, icon: '🔄', label: 'Trade' },
    { id: 'qr' as TabType, icon: '🎟️', label: 'Bron' },
    { id: 'loyalty' as TabType, icon: '🏆', label: 'Bonus' },
  ];

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 flex justify-around py-3 pb-6 border-t glass"
      style={{ 
        borderColor: theme.border,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.3)'
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="flex flex-col items-center gap-1 px-3 py-1 transition-all"
          style={{ color: activeTab === tab.id ? theme.accent : theme.textMuted }}
        >
          <div className="text-lg">{tab.icon}</div>
          <div className="text-[10px] font-medium">{tab.label}</div>
        </button>
      ))}
    </div>
  );
}

// ============ ADMIN VIEW ============
function AdminView({ adminTab, setAdminTab, theme }: { 
  adminTab: AdminTabType; 
  setAdminTab: (t: AdminTabType) => void; 
  theme: Theme 
}) {
  return (
    <div 
      className="max-w-6xl mx-auto px-4 md:px-6 animate-fade-in"
    >
      <div 
        className="card p-6 mb-6"
        style={{ 
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          animation: 'fadeInUp 0.6s ease'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 
              className="mb-1"
              style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: 700 }}
            >
              Sardor Tech
            </h2>
            <p 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              Malika bozori · B-qator 45 · $49/oy
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              Bugun
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ color: theme.accent }}
            >
              $3,240
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['dashboard', 'crm', 'voice', 'inventory', 'analytics', 'broadcast'] as AdminTabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
            style={adminTab === tab ? { 
              background: theme.gradient, 
              color: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            } : { 
              background: theme.surface, 
              color: theme.textMuted, 
              border: `1px solid ${theme.border}`
            }}
          >
            {tab === 'dashboard' && '📊 Dashboard'}
            {tab === 'crm' && '👥 CRM'}
            {tab === 'voice' && '🎙️ Voice'}
            {tab === 'inventory' && '📦 Sklad'}
            {tab === 'analytics' && '📈 Analitika'}
            {tab === 'broadcast' && '📢 Broadcast'}
          </button>
        ))}
      </div>

      {adminTab === 'dashboard' && <DashboardTab theme={theme} />}
      {adminTab === 'crm' && <CRMTab theme={theme} />}
      {adminTab === 'voice' && <VoiceTab theme={theme} />}
      {adminTab === 'inventory' && <InventoryTab theme={theme} />}
      {adminTab === 'analytics' && <AnalyticsTab theme={theme} />}
      {adminTab === 'broadcast' && <BroadcastTab theme={theme} />}
    </div>
  );
}

// ============ DASHBOARD TAB ============
function DashboardTab({ theme }: { theme: Theme }) {
  return (
    <div className="animate-fade-in-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Foyda', value: '$780', change: '↑ 24%', color: theme.accent },
          { label: 'Sotilgan', value: '12', sub: 'ta', color: theme.textPrimary },
          { label: 'Bronlar', value: '4', sub: 'aktiv', color: theme.textPrimary },
          { label: 'Mijozlar', value: '8', sub: 'yangi', color: theme.textPrimary },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="card p-4"
            style={{ 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div 
              className="text-xs mb-1"
              style={{ color: theme.textMuted }}
            >
              {stat.label}
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            {stat.change && (
              <div 
                className="text-xs mt-1"
                style={{ color: theme.textMuted }}
              >
                {stat.change}
              </div>
            )}
            {stat.sub && (
              <div 
                className="text-xs mt-1"
                style={{ color: theme.textMuted }}
              >
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      <div 
        className="card p-5"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <h3 
          className="text-sm font-semibold mb-4"
          style={{ color: theme.textPrimary }}
        >
          So'nggi hodisalar
        </h3>
        <div className="space-y-3">
          {[
            { icon: '💰', title: 'Yangi sotuv', desc: 'iPhone 13 Pro - $620', time: '2 daqiqa' },
            { icon: '🎟️', title: 'Bron tasdiqlandi', desc: 'Jasur T. - Galaxy S24', time: '15 daqiqa' },
            { icon: '🔄', title: 'Trade-In', desc: 'iPhone 11 - $210', time: '1 soat' },
          ].map((n, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: theme.surfaceHover }}
            >
              <span className="text-lg">{n.icon}</span>
              <div className="flex-1">
                <div 
                  className="text-xs font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {n.title}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  {n.desc}
                </div>
              </div>
              <div 
                className="text-xs"
                style={{ color: theme.textMuted }}
              >
                {n.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CRM TAB ============
function CRMTab({ theme }: { theme: Theme }) {
  const tierColors: Record<string, string> = { 
    gold: '#d4af37', 
    silver: '#94a3b8', 
    bronze: '#cd7f32' 
  };

  return (
    <div className="animate-fade-in-up">
      <div 
        className="card p-5"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-sm font-semibold"
            style={{ color: theme.textPrimary }}
          >
            Mijozlar bazasi
          </h3>
          <span 
            className="badge badge-primary"
            style={{ 
              background: `${theme.accent}20`, 
              color: theme.accent,
              border: `1px solid ${theme.accent}40`
            }}
          >
            {customers.length} mijoz
          </span>
        </div>
        <div className="space-y-2">
          {customers.map((c, i) => (
            <div 
              key={c.id} 
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ 
                background: theme.surfaceHover,
                animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
              }}
            >
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ 
                  background: `${tierColors[c.tier]}20`, 
                  color: tierColors[c.tier] 
                }}
              >
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    {c.name}
                  </span>
                  <span 
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ 
                      background: `${tierColors[c.tier]}20`, 
                      color: tierColors[c.tier] 
                    }}
                  >
                    {c.tier.toUpperCase()}
                  </span>
                </div>
                <div 
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  {c.points} ball · {c.visits} tashrif
                </div>
              </div>
              <div 
                className="text-sm font-bold"
                style={{ color: theme.accent }}
              >
                ${c.spent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ VOICE TAB ============
function VoiceTab({ theme }: { theme: Theme }) {
  const [state, setState] = useState<'idle' | 'recording' | 'done'>('idle');

  return (
    <div className="animate-fade-in-up">
      <div 
        className="card p-6 text-center"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <h3 
          className="text-sm font-semibold mb-2"
          style={{ color: theme.textPrimary }}
        >
          AI Voice Agent
        </h3>
        <p 
          className="text-xs mb-6"
          style={{ color: theme.textMuted }}
        >
          Telefon qo'ng'iroqlariga AI javob beradi
        </p>

        <button
          onClick={() => { 
            setState('recording'); 
            setTimeout(() => setState('done'), 2000); 
          }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 transition-all"
          style={{ 
            background: state === 'recording' ? theme.danger : theme.gradient,
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 20px ' + (state === 'recording' ? theme.danger : theme.accent) + '40'
          }}
        >
          {state === 'recording' ? '🔴' : '🎤'}
        </button>

        {state === 'recording' && (
          <div 
            className="text-xs"
            style={{ color: theme.textMuted }}
          >
            Qo'ng'iroq qabul qilinmoqda...
          </div>
        )}

        {state === 'done' && (
          <div 
            className="mt-4 p-4 rounded-xl text-left"
            style={{ 
              background: theme.surfaceHover,
              animation: 'scaleIn 0.3s ease'
            }}
          >
            <div 
              className="text-xs mb-2 font-medium"
              style={{ color: theme.accent }}
            >
              ✅ Transkripsiya:
            </div>
            <div 
              className="text-sm italic mb-3"
              style={{ color: theme.textSecondary }}
            >
              "iPhone 13 Pro bormi?"
            </div>
            <div 
              className="text-xs font-medium"
              style={{ color: theme.accent }}
            >
              🧠 Lead yaratildi → CRM ga qo'shildi
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ INVENTORY TAB ============
function InventoryTab({ theme }: { theme: Theme }) {
  return (
    <div className="animate-fade-in-up">
      <div 
        className="card p-5"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <h3 
          className="text-sm font-semibold mb-4"
          style={{ color: theme.textPrimary }}
        >
          AI Talab Bashorati
        </h3>
        <div className="space-y-3">
          {[
            { name: 'iPhone 13 Pro', current: 2, needed: 5, trend: '↑ 40%' },
            { name: 'Galaxy S24', current: 4, needed: 4, trend: '→ stabil' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: theme.surfaceHover }}
            >
              <div>
                <div 
                  className="text-xs font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {item.name}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  Hozir: {item.current} ta
                </div>
              </div>
              <div className="text-right">
                <div 
                  className="text-xs font-bold"
                  style={{ color: item.current < item.needed ? theme.warning : theme.textMuted }}
                >
                  {item.current < item.needed ? `${item.needed} kerak` : 'Yetarli'}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  {item.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ANALYTICS TAB ============
function AnalyticsTab({ theme }: { theme: Theme }) {
  const max = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="animate-fade-in-up">
      <div 
        className="card p-5 mb-4"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <h3 
          className="text-sm font-semibold mb-4"
          style={{ color: theme.textPrimary }}
        >
          Haftalik daromad
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyData.map((d, i) => (
            <div 
              key={d.day} 
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div 
                className="text-[9px]"
                style={{ color: theme.textMuted }}
              >
                ${d.value}
              </div>
              <div 
                className="w-full rounded-t-lg transition-all"
                style={{ 
                  height: `${(d.value / max) * 100}%`, 
                  background: theme.gradient,
                  animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                  boxShadow: `0 0 10px ${theme.accent}30`
                }}
              />
              <div 
                className="text-xs"
                style={{ color: theme.textMuted }}
              >
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "O'rtacha chek", value: '$270' },
          { label: 'Konversiya', value: '68%' },
          { label: 'Sharh', value: '4.2 ★' },
          { label: 'Qaytish', value: '89%' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="card p-4 text-center"
            style={{ 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div 
              className="text-lg font-bold"
              style={{ color: theme.accent }}
            >
              {stat.value}
            </div>
            <div 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BROADCAST TAB ============
function BroadcastTab({ theme }: { theme: Theme }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="animate-fade-in-up">
      <div 
        className="card p-5"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
      >
        <h3 
          className="text-sm font-semibold mb-4"
          style={{ color: theme.textPrimary }}
        >
          Broadcast yuborish
        </h3>
        
        <div className="space-y-2 mb-4">
          {[
            { name: 'Telegram kanal', count: 1240 },
            { name: 'SMS', count: 89 },
            { name: 'WhatsApp', count: 156 },
          ].map((ch, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: theme.surfaceHover }}
            >
              <span 
                className="text-xs"
                style={{ color: theme.textPrimary }}
              >
                {ch.name}
              </span>
              <span 
                className="badge badge-primary"
                style={{ 
                  background: `${theme.accent}20`, 
                  color: theme.accent,
                  border: `1px solid ${theme.accent}40`
                }}
              >
                {ch.count}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSent(true)}
          className="btn btn-primary w-full py-3 text-sm"
        >
          {sent ? '✅ Yuborildi!' : '📤 Yuborish'}
        </button>
      </div>
    </div>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection({ theme }: { theme: Theme }) {
  const features = [
    { icon: '🧠', title: 'AI Sotuvchi', desc: '24/7 narx muzokarasi', tag: 'GPT-4' },
    { icon: '👁️', title: 'Vision Trade-In', desc: '5 soniyada baholash', tag: 'Vision AI' },
    { icon: '🎟️', title: 'Anti-Vozdux QR', desc: '90 daqiqalik bron', tag: 'QR' },
    { icon: '🌐', title: 'Ghost Inventory', desc: 'P2P kliring', tag: 'P2P' },
    { icon: '🎙️', title: 'AI Voice Agent', desc: 'Qo\'ng\'iroqlarga javob', tag: 'Whisper' },
    { icon: '📈', title: 'Dynamic Pricing', desc: 'Narx optimallash', tag: 'AI' },
    { icon: '🏆', title: 'Loyalty CRM', desc: 'Bonus tizimi', tag: 'CRM' },
    { icon: '📢', title: 'Broadcast', desc: 'Multi-kanal', tag: 'Multi' },
    { icon: '💳', title: 'Payme / Click', desc: 'Mahalliy to\'lov', tag: 'Payment' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-20">
      <div className="text-center mb-16">
        <h2 
          className="mb-4"
          style={{ color: theme.textPrimary, fontSize: '32px', fontWeight: 700 }}
        >
          Nima uchun{' '}
          <span 
            className="gradient-text"
            style={{ 
              background: theme.gradient, 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            TechSeller AI
          </span>
          ?
        </h2>
        <p 
          className="text-sm"
          style={{ color: theme.textMuted, maxWidth: '500px', margin: '0 auto' }}
        >
          O'zbekiston bozorlari uchun birinchi to'liq AI savdo tizimi
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="card p-5"
            style={{ 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{f.icon}</span>
              <span 
                className="badge"
                style={{ 
                  background: theme.surface, 
                  color: theme.textMuted, 
                  border: `1px solid ${theme.border}`,
                  fontSize: '10px'
                }}
              >
                {f.tag}
              </span>
            </div>
            <h3 
              className="font-semibold text-sm mb-1"
              style={{ color: theme.textPrimary }}
            >
              {f.title}
            </h3>
            <p 
              className="text-xs"
              style={{ color: theme.textMuted }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
