import type { Theme, ThemeConfig, FontSize } from './types';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const THEMES: Record<Theme, ThemeConfig> = {
  light: {
    background: '#ffffff',
    textColor: '#1a1a1a',
    secondaryColor: '#666666',
    accentColor: '#3b82f6',
  },
  dark: {
    background: '#0f172a',
    textColor: '#f8fafc',
    secondaryColor: '#94a3b8',
    accentColor: '#60a5fa',
  },
  gradient: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    secondaryColor: '#e2e8f0',
    accentColor: '#fbbf24',
  },
  minimal: {
    background: '#fafafa',
    textColor: '#18181b',
    secondaryColor: '#71717a',
  },
  blog: {
    background: '#f9f7f3',
    textColor: '#2c2c2c',
    secondaryColor: '#6b6b6b',
    accentColor: '#8b7355',
  },
};

export const FONT_SIZES: Record<FontSize, number> = {
  sm: 48,
  md: 56,
  lg: 64,
  xl: 72,
};

export const DEFAULT_THEME: Theme = 'dark';
export const DEFAULT_FONT_SIZE: FontSize = 'lg';
