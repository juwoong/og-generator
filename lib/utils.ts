import type { OGImageParams } from './types';
import { DEFAULT_THEME, DEFAULT_FONT_SIZE } from './constants';

export function parseQueryParams(searchParams: URLSearchParams): OGImageParams {
  const title = searchParams.get('title') || 'Untitled';
  const theme = searchParams.get('theme') as OGImageParams['theme'];
  const fontSize = searchParams.get('fontSize') as OGImageParams['fontSize'];
  const subtitle = searchParams.get('subtitle') || undefined;
  const author = searchParams.get('author') || undefined;

  return {
    title,
    theme: theme || DEFAULT_THEME,
    fontSize: fontSize || DEFAULT_FONT_SIZE,
    subtitle,
    author,
  };
}

export function buildOGUrl(baseUrl: string, params: OGImageParams): string {
  const url = new URL('/api/og', baseUrl);

  url.searchParams.set('title', params.title);
  if (params.theme) url.searchParams.set('theme', params.theme);
  if (params.fontSize) url.searchParams.set('fontSize', params.fontSize);
  if (params.subtitle) url.searchParams.set('subtitle', params.subtitle);
  if (params.author) url.searchParams.set('author', params.author);

  return url.toString();
}
