export interface OGImageParams {
  title: string;
  theme?: Theme;
  fontSize?: FontSize;
  subtitle?: string;
  author?: string;
}

export type Theme = 'light' | 'dark' | 'gradient' | 'minimal' | 'blog';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ThemeConfig {
  background: string;
  textColor: string;
  secondaryColor: string;
  accentColor?: string;
}
