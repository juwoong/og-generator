import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { parseQueryParams } from '@/lib/utils';
import { OG_WIDTH, OG_HEIGHT } from '@/lib/types';

export const runtime = 'edge';

const PRETENDARD_BOLD_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf';
const PRETENDARD_MEDIUM_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.otf';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = parseQueryParams(searchParams);

  const [boldFont, mediumFont] = await Promise.all([
    fetch(PRETENDARD_BOLD_URL).then((res) => res.arrayBuffer()),
    fetch(PRETENDARD_MEDIUM_URL).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: '#fafaf8',
          fontFamily: 'Pretendard',
        }}
      >
        {/* 상단: 제목 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 40,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.3,
              margin: 0,
              wordBreak: 'keep-all',
            }}
          >
            {params.title}
          </h1>
        </div>

        {/* 하단: 날짜, 태그, 작성자 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 날짜 + 위치 */}
            {(params.date || params.location) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {params.date && (
                  <span style={{ fontSize: 28, color: '#999999', fontWeight: 500 }}>
                    {params.date}
                  </span>
                )}
                {params.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#999999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{ fontSize: 28, color: '#999999', fontWeight: 500 }}>
                      {params.location}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 태그 */}
            {params.tags && params.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 12 }}>
                {params.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 24,
                      color: '#b33a3a',
                      fontWeight: 500,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 작성자 */}
          <span style={{ fontSize: 28, color: '#333333', fontWeight: 700 }}>
            {params.author}
          </span>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: 'Pretendard', data: boldFont, weight: 700 },
        { name: 'Pretendard', data: mediumFont, weight: 500 },
      ],
    }
  );
}
