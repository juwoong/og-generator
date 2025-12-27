import type { OGImageParams } from './types';

export function parseQueryParams(searchParams: URLSearchParams): OGImageParams {
  const title = searchParams.get('title') || 'Untitled';
  const date = searchParams.get('date') || undefined;
  const tagsParam = searchParams.get('tags');
  const tags = tagsParam ? tagsParam.split(',').map((t) => t.trim()) : undefined;
  const location = searchParams.get('location') || undefined;
  const author = searchParams.get('author') || 'Juwoong';

  return {
    title,
    date,
    tags,
    location,
    author,
  };
}

export function buildOGUrl(baseUrl: string, params: OGImageParams): string {
  const url = new URL('/api/og', baseUrl);

  url.searchParams.set('title', params.title);
  if (params.date) url.searchParams.set('date', params.date);
  if (params.tags?.length) url.searchParams.set('tags', params.tags.join(','));
  if (params.location) url.searchParams.set('location', params.location);
  if (params.author && params.author !== 'Juwoong') url.searchParams.set('author', params.author);

  return url.toString();
}
