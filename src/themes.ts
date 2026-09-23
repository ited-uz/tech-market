export type ThemeId = 'midnight' | 'arctic' | 'neon';

export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  
  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  surface: string;
  surfaceHover: string;
  
  // Borders
  border: string;
  borderLight: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Accent
  accent: string;
  accentLight: string;
  accentDark: string;
  gradient: string;
  
  // Status
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export const themes: Record<ThemeId, Theme> = {
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    emoji: '🌙',
    
    bgPrimary: '#000000',
    bgSecondary: '#0a0a0a',
    bgTertiary: '#111111',
    surface: '#0f0f0f',
    surfaceHover: '#161616',
    
    border: '#1a1a1a',
    borderLight: '#262626',
    
    textPrimary: '#ffffff',
    textSecondary: '#a1a1a1',
    textMuted: '#525252',
    
    accent: '#d4af37',
    accentLight: '#f5d67b',
    accentDark: '#a88a2a',
    gradient: 'linear-gradient(135deg, #d4af37, #f5d67b)',
    
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#3b82f6',
  },
  
  arctic: {
    id: 'arctic',
    name: 'Arctic',
    emoji: '❄️',
    
    bgPrimary: '#fafafa',
    bgSecondary: '#ffffff',
    bgTertiary: '#f5f5f5',
    surface: '#ffffff',
    surfaceHover: '#f9f9f9',
    
    border: '#e5e5e5',
    borderLight: '#d4d4d4',
    
    textPrimary: '#0a0a0a',
    textSecondary: '#525252',
    textMuted: '#a3a3a3',
    
    accent: '#2563eb',
    accentLight: '#60a5fa',
    accentDark: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
    
    success: '#16a34a',
    warning: '#ca8a04',
    danger: '#dc2626',
    info: '#2563eb',
  },
  
  neon: {
    id: 'neon',
    name: 'Neon',
    emoji: '⚡',
    
    bgPrimary: '#0a0a0a',
    bgSecondary: '#111111',
    bgTertiary: '#1a1a1a',
    surface: '#141414',
    surfaceHover: '#1a1a1a',
    
    border: '#262626',
    borderLight: '#333333',
    
    textPrimary: '#fafafa',
    textSecondary: '#a3a3a3',
    textMuted: '#525252',
    
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentDark: '#9333ea',
    gradient: 'linear-gradient(135deg, #a855f7, #06b6d4)',
    
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#f43f5e',
    info: '#06b6d4',
  },
};
