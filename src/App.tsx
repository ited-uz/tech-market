import { useState, useEffect, useRef, useMemo } from 'react';

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

// ============ COLOR CONSTANTS (Luxury Psychology) ============
const colors = {
  bg: '#000000',
  bgSecondary: '#0a0a0a',
  bgTertiary: '#111111',
  accent: '#d4af37',
  accentLight: '#f5d67b',
  text: '#ffffff',
  textSecondary: '#a1a1a1',
  textMuted: '#525252',
  border: '#1a1a1a',
  borderHover: '#262626',
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
};

// ============ MAIN APP ============
export default function App() {
  const [mode, setMode] = useState<ModeType>('miniapp');
  const [activeTab, setActiveTab] = useState<TabType>('vitrina');
  const [adminTab, setAdminTab] = useState<AdminTabType>('dashboard');

  return (
    <div style={{ 
      background: colors.bg, 
      color: colors.text, 
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Ambient Background (Subtle gold glow) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 20%, ${colors.accent}08 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${colors.accent}05 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header - Macro whitespace (80px) */}
      <header style={{ paddingTop: '80px', paddingBottom: '64px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass"
          style={{ 
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'fadeInDown 0.6s ease'
          }}
        >
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.success,
              animation: 'pulse 2s infinite',
              boxShadow: `0 0 8px ${colors.success}`
            }}
          />
          <span style={{ color: colors.textSecondary, fontSize: '13px', fontWeight: 500 }}>
            AI Sotuvchi faol
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 700, 
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          animation: 'fadeInUp 0.8s ease'
        }}>
          <span className="gradient-text">TechSeller</span>
          <span> AI</span>
        </h1>
        
        <p style={{ 
          color: colors.textMuted, 
          fontSize: '16px', 
          maxWidth: '500px', 
          margin: '0 auto',
          lineHeight: 1.6,
          animation: 'fadeInUp 1s ease'
        }}>
          O'zbekiston bozorlari uchun birinchi to'liq AI savdo tizimi
        </p>
      </header>

      {/* Controls - Macro whitespace */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '80px', position: 'relative', zIndex: 1 }}>
        {/* Mode Switch */}
        <div 
          className="card"
          style={{ 
            padding: '6px',
            display: 'flex',
            gap: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            animation: 'fadeInUp 0.8s ease 0.2s both'
          }}
        >
          <button
            onClick={() => setMode('miniapp')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: mode === 'miniapp' ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : 'transparent',
              color: mode === 'miniapp' ? '#000' : colors.textMuted,
              boxShadow: mode === 'miniapp' ? `0 2px 8px rgba(0,0,0,0.3), 0 0 20px ${colors.accent}30` : 'none',
              transform: mode === 'miniapp' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            📱 Mini-App
          </button>
          <button
            onClick={() => setMode('admin')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: mode === 'admin' ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : 'transparent',
              color: mode === 'admin' ? '#000' : colors.textMuted,
              boxShadow: mode === 'admin' ? `0 2px 8px rgba(0,0,0,0.3), 0 0 20px ${colors.accent}30` : 'none',
              transform: mode === 'admin' ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            🏪 Admin
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
        {mode === 'miniapp' ? (
          <>
            <MiniAppView activeTab={activeTab} setActiveTab={setActiveTab} />
            <FeaturesSection />
          </>
        ) : (
          <AdminView adminTab={adminTab} setAdminTab={setAdminTab} />
        )}
      </div>

      {/* Footer - Macro whitespace */}
      <footer 
        style={{ 
          textAlign: 'center', 
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: `1px solid ${colors.border}`,
          position: 'relative',
          zIndex: 1
        }}
      >
        <p style={{ color: colors.textMuted, fontSize: '13px' }}>
          TechSeller AI © 2026 · O'zbekiston bozorlari uchun maxsus
        </p>
        <p style={{ color: colors.textMuted, fontSize: '11px', marginTop: '8px', opacity: 0.6 }}>
          Powered by GPT-4 Vision · Whisper · Telegram · Payme · Click
        </p>
      </footer>
    </div>
  );
}

// ============ MINI APP VIEW ============
function MiniAppView({ activeTab, setActiveTab }: { 
  activeTab: TabType; 
  setActiveTab: (t: TabType) => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px', marginBottom: '80px' }}>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div style={{ height: '100%', overflowY: 'auto', paddingTop: '48px', paddingBottom: '96px', background: colors.bg }}>
          {activeTab === 'vitrina' && <VitrinaTab />}
          {activeTab === 'chat' && <ChatTab />}
          {activeTab === 'tradein' && <TradeInTab />}
          {activeTab === 'qr' && <QRTab />}
          {activeTab === 'loyalty' && <LoyaltyTab />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

// ============ VITRINA TAB ============
function VitrinaTab() {
  const [filter, setFilter] = useState('all');
  
  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div style={{ padding: '0 20px', animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', color: colors.text }}>
          Vitrina
        </h2>
        <div 
          className="badge badge-primary"
          style={{ 
            background: `${colors.accent}20`, 
            color: colors.accent,
            border: `1px solid ${colors.accent}40`
          }}
        >
          1$ = 12,850
        </div>
      </div>
      
      {/* Filters - Micro whitespace */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {[
          { id: 'all', label: 'Hammasi' },
          { id: 'iphone', label: 'iPhone' },
          { id: 'samsung', label: 'Samsung' },
          { id: 'laptop', label: 'Noutbuk' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              background: filter === f.id ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : colors.bgSecondary,
              color: filter === f.id ? '#000' : colors.textSecondary,
              boxShadow: filter === f.id ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              border: filter === f.id ? 'none' : `1px solid ${colors.border}`
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      {/* Products Grid - Bento style */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {filtered.map((p, i) => (
          <div
            key={p.id}
            className="card"
            style={{ 
              padding: '16px',
              position: 'relative',
              overflow: 'hidden',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {p.tag && (
              <div 
                className="badge"
                style={{ 
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: `${colors.accent}20`, 
                  color: colors.accent,
                  border: `1px solid ${colors.accent}40`,
                  fontSize: '10px'
                }}
              >
                {p.tag}
              </div>
            )}
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{p.emoji}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.title}
            </div>
            <div style={{ fontSize: '12px', marginBottom: '12px', color: colors.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.spec}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: colors.accent }}>
                ${p.price}
              </div>
              {p.battery && (
                <div style={{ fontSize: '12px', color: colors.textMuted }}>
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
function ChatTab() {
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div 
        className="glass"
        style={{ 
          padding: '16px 20px',
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
              color: '#000',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px ' + colors.accent + '30'
            }}
          >
            AI
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>
              Sardor (AI)
            </div>
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: colors.success }}>
              <span 
                style={{ 
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: colors.success,
                  animation: 'pulse 2s infinite',
                  boxShadow: `0 0 6px ${colors.success}`
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
        style={{ 
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '480px'
        }}
      >
        {messages.map(msg => (
          <div 
            key={msg.id} 
            style={{ 
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fadeInUp 0.3s ease'
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: '14px',
                maxWidth: '80%',
                background: msg.sender === 'user' ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : colors.bgSecondary,
                color: msg.sender === 'user' ? '#000' : colors.text,
                border: msg.sender === 'user' ? 'none' : `1px solid ${colors.border}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'fadeIn 0.3s ease' }}>
            <div 
              style={{ 
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                display: 'flex',
                gap: '4px',
                background: colors.bgSecondary,
                border: `1px solid ${colors.border}`
              }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  style={{ 
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: colors.textMuted,
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
        className="glass"
        style={{ 
          padding: '16px 20px',
          borderTop: `1px solid ${colors.border}`
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto' }}>
          {quickReplies.map(q => (
            <button
              key={q}
              onClick={() => setInput(q)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontWeight: 500,
                background: colors.bgSecondary,
                color: colors.textSecondary,
                border: `1px solid ${colors.border}`
              }}
            >
              {q}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            placeholder="Xabar yozing..."
            className="input"
            style={{ flex: 1 }}
          />
          <button 
            onClick={send} 
            className="btn-primary"
            style={{ padding: '0 20px' }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ TRADE-IN TAB ============
function TradeInTab() {
  const [state, setState] = useState<'upload' | 'loading' | 'result'>('upload');

  const startAnalysis = () => {
    setState('loading');
    setTimeout(() => setState('result'), 2000);
  };

  return (
    <div style={{ padding: '0 20px', animation: 'fadeInUp 0.4s ease' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', color: colors.text }}>
        Trade-In
      </h2>
      <p style={{ fontSize: '14px', marginBottom: '24px', color: colors.textMuted }}>
        Skrinshot yuklang — AI 5 soniyada baholaydi
      </p>

      {state === 'upload' && (
        <div
          onClick={startAnalysis}
          className="card"
          style={{ 
            padding: '32px',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            border: `2px dashed ${colors.border}`
          }}
        >
          <div style={{ fontSize: '56px', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>📸</div>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: colors.text }}>
            Skrinshot yuklang
          </div>
          <div style={{ fontSize: '12px', color: colors.textMuted }}>
            Battery Health sahifasi
          </div>
          <div style={{ fontSize: '12px', marginTop: '16px', fontWeight: 500, color: colors.accent }}>
            ⚡ 5 soniyada natija
          </div>
        </div>
      )}

      {state === 'loading' && (
        <div 
          className="card"
          style={{ 
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          <div 
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              border: `4px solid ${colors.accent}`,
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite'
            }}
          />
          <div style={{ fontSize: '14px', fontWeight: 500, color: colors.accent }}>
            AI tahlil qilmoqda...
          </div>
        </div>
      )}

      {state === 'result' && (
        <div 
          className="card"
          style={{ 
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: 'scaleIn 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '20px' }}>✅</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>
              Tahlil yakunlandi
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            {[
              ['Model:', 'iPhone 11 · 128GB', colors.text],
              ['Batareya:', '83%', colors.accent],
              ['Bozor narxi:', '$260', colors.text],
            ].map(([label, val, color], i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none'
                }}
              >
                <span style={{ color: colors.textMuted }}>{label}</span>
                <span style={{ fontWeight: 600, color }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px' }}>
              <span style={{ fontWeight: 600, color: colors.accent }}>Taklif:</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: colors.accent }}>$210</span>
            </div>
          </div>
          <button 
            className="btn-primary"
            style={{ 
              width: '100%',
              padding: '12px',
              marginTop: '16px',
              fontSize: '14px'
            }}
          >
            💬 AI bilan gaplashish
          </button>
        </div>
      )}
    </div>
  );
}

// ============ QR TAB ============
function QRTab() {
  const [time, setTime] = useState(90 * 60);

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');

  return (
    <div style={{ padding: '0 20px', animation: 'fadeInUp 0.4s ease' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', color: colors.text }}>
        VIP Bron
      </h2>
      <p style={{ fontSize: '14px', marginBottom: '24px', color: colors.textMuted }}>
        Anti-Vozdux: vaqt tugasa, boshqaga sotiladi
      </p>

      <div 
        className="card"
        style={{ 
          padding: '24px',
          textAlign: 'center',
          boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 40px ${colors.accent}15`
        }}
      >
        <div 
          style={{ 
            fontSize: '40px',
            fontWeight: 700,
            marginBottom: '8px',
            color: colors.accent,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {h}:{m}:{s}
        </div>
        <div style={{ fontSize: '12px', marginBottom: '24px', color: colors.textMuted }}>
          Qolgan vaqt
        </div>

        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: colors.text }}>
          iPhone 13 Pro · 128GB
        </div>
        <div 
          style={{ 
            fontSize: '12px',
            marginBottom: '24px',
            fontFamily: 'monospace',
            color: colors.accent
          }}
        >
          QR-A7F3-D9E1-B42C
        </div>

        <div 
          style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            paddingTop: '16px',
            borderTop: `1px solid ${colors.border}`
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>Xaridor</div>
            <div style={{ fontWeight: 600, color: colors.text }}>Jasur T.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>Narx</div>
            <div style={{ fontWeight: 700, color: colors.accent }}>$615</div>
          </div>
        </div>
      </div>

      <div 
        className="card"
        style={{ 
          padding: '16px',
          marginTop: '16px',
          borderColor: `${colors.warning}40`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span>⚠️</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: colors.warning }}>
              Eslatma
            </div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>
              90 daqiqa ichida yetib keling
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ LOYALTY TAB ============
function LoyaltyTab() {
  const points = 1240;
  const progress = (points / 2000) * 100;

  return (
    <div style={{ padding: '0 20px', animation: 'fadeInUp 0.4s ease' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em', color: colors.text }}>
        Bonus
      </h2>

      <div 
        className="card"
        style={{ 
          padding: '24px',
          marginBottom: '16px',
          boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 40px ${colors.accent}10`
        }}
      >
        <div style={{ fontSize: '12px', marginBottom: '8px', color: colors.textMuted }}>
          Joriy bonuslar
        </div>
        <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: colors.accent }}>
          {points.toLocaleString()}
        </div>
        
        <div 
          style={{ 
            height: '8px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '8px',
            background: colors.border
          }}
        >
          <div 
            style={{ 
              height: '100%',
              borderRadius: '4px',
              transition: 'width 1s ease',
              width: `${progress}%`,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
              boxShadow: `0 0 10px ${colors.accent}50`
            }}
          />
        </div>
        <div style={{ fontSize: '12px', color: colors.textMuted }}>
          Gold gacha 760 ball
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[
          { emoji: '🎫', name: "5,000 so'm", points: 500 },
          { emoji: '🔌', name: 'Adapter', points: 300 },
          { emoji: '🛡️', name: 'Laminat', points: 200 },
          { emoji: '✨', name: 'Tozalash', points: 150 },
        ].map((r, i) => (
          <div 
            key={i} 
            className="card"
            style={{ 
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{r.emoji}</div>
            <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '4px', color: colors.text }}>
              {r.name}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.accent }}>
              {r.points} ball
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BOTTOM NAV ============
function BottomNav({ activeTab, setActiveTab }: { 
  activeTab: TabType; 
  setActiveTab: (t: TabType) => void;
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
      className="glass"
      style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 24px',
        borderTop: `1px solid ${colors.border}`,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.3)'
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 12px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: activeTab === tab.id ? colors.accent : colors.textMuted
          }}
        >
          <div style={{ fontSize: '18px' }}>{tab.icon}</div>
          <div style={{ fontSize: '10px', fontWeight: 500 }}>{tab.label}</div>
        </button>
      ))}
    </div>
  );
}

// ============ ADMIN VIEW ============
function AdminView({ adminTab, setAdminTab }: { 
  adminTab: AdminTabType; 
  setAdminTab: (t: AdminTabType) => void;
}) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', animation: 'fadeIn 0.3s ease' }}>
      <div 
        className="card"
        style={{ 
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          animation: 'fadeInUp 0.6s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', letterSpacing: '-0.01em', color: colors.text }}>
              Sardor Tech
            </h2>
            <p style={{ fontSize: '12px', color: colors.textMuted }}>
              Malika bozori · B-qator 45 · $49/oy
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>Bugun</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: colors.accent }}>$3,240</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {(['dashboard', 'crm', 'voice', 'inventory', 'analytics', 'broadcast'] as AdminTabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              background: adminTab === tab ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : colors.bgSecondary,
              color: adminTab === tab ? '#000' : colors.textMuted,
              boxShadow: adminTab === tab ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              border: adminTab === tab ? 'none' : `1px solid ${colors.border}`
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

      {adminTab === 'dashboard' && <DashboardTab />}
      {adminTab === 'crm' && <CRMTab />}
      {adminTab === 'voice' && <VoiceTab />}
      {adminTab === 'inventory' && <InventoryTab />}
      {adminTab === 'analytics' && <AnalyticsTab />}
      {adminTab === 'broadcast' && <BroadcastTab />}
    </div>
  );
}

// ============ DASHBOARD TAB ============
function DashboardTab() {
  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Foyda', value: '$780', change: '↑ 24%', color: colors.accent },
          { label: 'Sotilgan', value: '12', sub: 'ta', color: colors.text },
          { label: 'Bronlar', value: '4', sub: 'aktiv', color: colors.text },
          { label: 'Mijozlar', value: '8', sub: 'yangi', color: colors.text },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="card"
            style={{ 
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div style={{ fontSize: '12px', marginBottom: '4px', color: colors.textMuted }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            {stat.change && <div style={{ fontSize: '12px', marginTop: '4px', color: colors.textMuted }}>{stat.change}</div>}
            {stat.sub && <div style={{ fontSize: '12px', marginTop: '4px', color: colors.textMuted }}>{stat.sub}</div>}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.text }}>
          So'nggi hodisalar
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: '💰', title: 'Yangi sotuv', desc: 'iPhone 13 Pro - $620', time: '2 daqiqa' },
            { icon: '🎟️', title: 'Bron tasdiqlandi', desc: 'Jasur T. - Galaxy S24', time: '15 daqiqa' },
            { icon: '🔄', title: 'Trade-In', desc: 'iPhone 11 - $210', time: '1 soat' },
          ].map((n, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: colors.bgTertiary
              }}
            >
              <span style={{ fontSize: '18px' }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.text }}>{n.title}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>{n.desc}</div>
              </div>
              <div style={{ fontSize: '12px', color: colors.textMuted }}>{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CRM TAB ============
function CRMTab() {
  const tierColors: Record<string, string> = { gold: '#d4af37', silver: '#94a3b8', bronze: '#cd7f32' };

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card" style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>Mijozlar bazasi</h3>
          <span 
            className="badge badge-primary"
            style={{ background: `${colors.accent}20`, color: colors.accent, border: `1px solid ${colors.accent}40` }}
          >
            {customers.length} mijoz
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {customers.map((c, i) => (
            <div 
              key={c.id} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: colors.bgTertiary,
                animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
              }}
            >
              <div 
                style={{ 
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: `${tierColors[c.tier]}20`,
                  color: tierColors[c.tier]
                }}
              >
                {c.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: colors.text }}>{c.name}</span>
                  <span 
                    style={{ 
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontWeight: 500,
                      background: `${tierColors[c.tier]}20`,
                      color: tierColors[c.tier]
                    }}
                  >
                    {c.tier.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>{c.points} ball · {c.visits} tashrif</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.accent }}>${c.spent}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ VOICE TAB ============
function VoiceTab() {
  const [state, setState] = useState<'idle' | 'recording' | 'done'>('idle');

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card" style={{ padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: colors.text }}>AI Voice Agent</h3>
        <p style={{ fontSize: '12px', marginBottom: '24px', color: colors.textMuted }}>
          Telefon qo'ng'iroqlariga AI javob beradi
        </p>

        <button
          onClick={() => { setState('recording'); setTimeout(() => setState('done'), 2000); }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            margin: '0 auto 16px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: state === 'recording' ? colors.danger : `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
            color: '#fff',
            boxShadow: `0 4px 12px rgba(0,0,0,0.4), 0 0 20px ${state === 'recording' ? colors.danger : colors.accent}40`
          }}
        >
          {state === 'recording' ? '🔴' : '🎤'}
        </button>

        {state === 'recording' && (
          <div style={{ fontSize: '12px', color: colors.textMuted }}>Qo'ng'iroq qabul qilinmoqda...</div>
        )}

        {state === 'done' && (
          <div 
            style={{ 
              marginTop: '16px',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'left',
              background: colors.bgTertiary,
              animation: 'scaleIn 0.3s ease'
            }}
          >
            <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: 500, color: colors.accent }}>✅ Transkripsiya:</div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '12px', color: colors.textSecondary }}>"iPhone 13 Pro bormi?"</div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: colors.accent }}>🧠 Lead yaratildi → CRM ga qo'shildi</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ INVENTORY TAB ============
function InventoryTab() {
  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card" style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.text }}>AI Talab Bashorati</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'iPhone 13 Pro', current: 2, needed: 5, trend: '↑ 40%' },
            { name: 'Galaxy S24', current: 4, needed: 4, trend: '→ stabil' },
          ].map((item, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '12px',
                background: colors.bgTertiary
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.text }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>Hozir: {item.current} ta</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: item.current < item.needed ? colors.warning : colors.textMuted }}>
                  {item.current < item.needed ? `${item.needed} kerak` : 'Yetarli'}
                </div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>{item.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ ANALYTICS TAB ============
function AnalyticsTab() {
  const max = Math.max(...weeklyData.map(d => d.value));

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card" style={{ padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.text }}>Haftalik daromad</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', height: '128px' }}>
          {weeklyData.map((d, i) => (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '9px', color: colors.textMuted }}>${d.value}</div>
              <div 
                style={{ 
                  width: '100%',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease',
                  height: `${(d.value / max) * 100}%`,
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                  animation: `fadeInUp 0.4s ease ${i * 0.05}s both`,
                  boxShadow: `0 0 10px ${colors.accent}30`
                }}
              />
              <div style={{ fontSize: '12px', color: colors.textMuted }}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[
          { label: "O'rtacha chek", value: '$270' },
          { label: 'Konversiya', value: '68%' },
          { label: 'Sharh', value: '4.2 ★' },
          { label: 'Qaytish', value: '89%' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="card"
            style={{ 
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 700, color: colors.accent }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BROADCAST TAB ============
function BroadcastTab() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card" style={{ padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.text }}>Broadcast yuborish</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {[
            { name: 'Telegram kanal', count: 1240 },
            { name: 'SMS', count: 89 },
            { name: 'WhatsApp', count: 156 },
          ].map((ch, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '12px',
                background: colors.bgTertiary
              }}
            >
              <span style={{ fontSize: '12px', color: colors.text }}>{ch.name}</span>
              <span 
                className="badge badge-primary"
                style={{ background: `${colors.accent}20`, color: colors.accent, border: `1px solid ${colors.accent}40` }}
              >
                {ch.count}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSent(true)}
          className="btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '14px' }}
        >
          {sent ? '✅ Yuborildi!' : '📤 Yuborish'}
        </button>
      </div>
    </div>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em', color: colors.text }}>
          Nima uchun <span className="gradient-text">TechSeller AI</span>?
        </h2>
        <p style={{ fontSize: '14px', color: colors.textMuted, maxWidth: '500px', margin: '0 auto' }}>
          O'zbekiston bozorlari uchun birinchi to'liq AI savdo tizimi
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {features.map((f, i) => (
          <div
            key={f.title}
            className="card"
            style={{ 
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              animation: `fadeInUp 0.4s ease ${i * 0.05}s both`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{f.icon}</span>
              <span 
                className="badge"
                style={{ 
                  background: colors.bgSecondary, 
                  color: colors.textMuted, 
                  border: `1px solid ${colors.border}`,
                  fontSize: '10px'
                }}
              >
                {f.tag}
              </span>
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: colors.text }}>{f.title}</h3>
            <p style={{ fontSize: '12px', color: colors.textMuted }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
