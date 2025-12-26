import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { parseQueryParams } from '@/lib/utils';
import { THEMES, FONT_SIZES, DEFAULT_THEME, DEFAULT_FONT_SIZE, OG_WIDTH, OG_HEIGHT } from '@/lib/constants';

export const runtime = 'edge';

// Bookk Myungjo 폰트 URL
const BOOKK_BOLD_URL = 'https://cdn.jsdelivr.net/gh/juwoong/bookk-dynamic-subset@v1.3.1/BookkMyungjo-Bold.woff2';
const BOOKK_LIGHT_URL = 'https://cdn.jsdelivr.net/gh/juwoong/bookk-dynamic-subset@v1.3.1/BookkMyungjo-Light.woff2';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = parseQueryParams(searchParams);

  const theme = THEMES[params.theme || DEFAULT_THEME];
  const fontSize = FONT_SIZES[params.fontSize || DEFAULT_FONT_SIZE];
  const themeName = params.theme || DEFAULT_THEME;
  const isGradient = themeName === 'gradient';
  const isBlog = themeName === 'blog';

  // 블로그 테마일 경우 Bookk Myungjo 폰트 로드
  const fonts = isBlog
    ? await Promise.all([
        fetch(BOOKK_BOLD_URL).then((res) => res.arrayBuffer()),
        fetch(BOOKK_LIGHT_URL).then((res) => res.arrayBuffer()),
      ]).then(([bold, light]) => [
        { name: 'Bookk Myungjo', data: bold, weight: 700 as const },
        { name: 'Bookk Myungjo', data: light, weight: 300 as const },
      ])
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 80px',
          background: theme.background,
          position: 'relative',
          fontFamily: isBlog ? '"Bookk Myungjo", serif' : 'sans-serif',
        }}
      >
        {/* 블로그 테마 전용 장식 */}
        {isBlog && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 80,
                right: 80,
                height: 1,
                background: theme.accentColor,
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: 80,
                right: 80,
                height: 1,
                background: theme.accentColor,
                opacity: 0.3,
              }}
            />
          </>
        )}
        {/* 기본 테마 장식 (gradient, blog 제외) */}
        {!isGradient && !isBlog && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 400,
              height: 400,
              background: theme.accentColor || theme.secondaryColor,
              opacity: 0.1,
              borderRadius: '50%',
              transform: 'translate(100px, -100px)',
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize,
              fontWeight: 700,
              color: theme.textColor,
              lineHeight: 1.3,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            {params.title}
          </h1>

          {params.subtitle && (
            <p
              style={{
                fontSize: 28,
                fontWeight: isBlog ? 300 : 400,
                color: theme.secondaryColor,
                margin: '24px 0 0 0',
              }}
            >
              {params.subtitle}
            </p>
          )}
        </div>

        {params.author && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: isBlog ? 300 : 400,
                color: theme.secondaryColor,
              }}
            >
              {params.author}
            </span>
          </div>
        )}

        {/* 하단 바 (blog 테마 제외) */}
        {!isBlog && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              background: theme.accentColor || theme.textColor,
            }}
          />
        )}
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      ...(fonts && { fonts }),
    }
  );
}
