import { useState } from 'react';
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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 998,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Settings Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '380px',
          maxWidth: '100%',
          height: '100vh',
          background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          borderLeft: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e5e5e5'}`,
          zIndex: 999,
          overflowY: 'auto',
          animation: 'slideInRight 0.3s ease',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: theme === 'dark' ? '#fff' : '#000' }}>
            ⚙️ Sozlamalar
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              background: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
              color: theme === 'dark' ? '#fff' : '#000',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Theme Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: theme === 'dark' ? '#a1a1a1' : '#666' }}>
            🎨 Mavzu
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setTheme('light')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: theme === 'light' ? '2px solid #d4af37' : '1px solid #262626',
                background: '#ffffff',
                color: '#000',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              ☀️ Oq
            </button>
            <button
              onClick={() => setTheme('dark')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: theme === 'dark' ? '2px solid #d4af37' : '1px solid #e5e5e5',
                background: '#000000',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              🌙 Qora
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: theme === 'dark' ? '#a1a1a1' : '#666' }}>
            🌍 Til
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: language === lang.code ? '2px solid #d4af37' : `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`,
                  background: theme === 'dark' ? '#0f0f0f' : '#ffffff',
                  color: theme === 'dark' ? '#fff' : '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: language === lang.code ? 600 : 400,
                }}
              >
                <span style={{ fontSize: '20px' }}>{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && <span style={{ marginLeft: 'auto', color: '#d4af37' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Design Section */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: theme === 'dark' ? '#a1a1a1' : '#666' }}>
            ✨ Dizayn
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {designs.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesign(d.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: design === d.id ? '2px solid #d4af37' : `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`,
                  background: theme === 'dark' ? '#0f0f0f' : '#ffffff',
                  color: theme === 'dark' ? '#fff' : '#000',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '24px' }}>{d.emoji}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{d.name}</span>
                  {design === d.id && <span style={{ marginLeft: 'auto', color: '#d4af37' }}>✓</span>}
                </div>
                <div style={{ fontSize: '12px', color: theme === 'dark' ? '#a1a1a1' : '#666', marginLeft: '36px' }}>
                  {d.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
