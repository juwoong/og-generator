'use client';

import { useState, useEffect, useCallback } from 'react';
import type { OGImageParams, Theme, FontSize } from '@/lib/types';
import { buildOGUrl } from '@/lib/utils';
import { THEMES, FONT_SIZES, DEFAULT_THEME, DEFAULT_FONT_SIZE } from '@/lib/constants';

const themeLabels: Record<Theme, string> = {
  light: '라이트',
  dark: '다크',
  gradient: '그라디언트',
  minimal: '미니멀',
};

const fontSizeLabels: Record<FontSize, string> = {
  sm: '작게',
  md: '보통',
  lg: '크게',
  xl: '아주 크게',
};

export default function Home() {
  const [params, setParams] = useState<OGImageParams>({
    title: '블로그 제목을 입력하세요',
    theme: DEFAULT_THEME,
    fontSize: DEFAULT_FONT_SIZE,
    subtitle: '',
    author: '',
  });

  const [copied, setCopied] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [ogUrl, setOgUrl] = useState('');

  useEffect(() => {
    const baseUrl = window.location.origin;
    setOgUrl(buildOGUrl(baseUrl, params));
  }, [params]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [ogUrl]);

  const updateParam = useCallback(<K extends keyof OGImageParams>(
    key: K,
    value: OGImageParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    setImageKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">OG Image Generator</h1>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Control Panel */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold">설정</h2>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  제목
                </label>
                <textarea
                  id="title"
                  value={params.title}
                  onChange={(e) => updateParam('title', e.target.value)}
                  placeholder="블로그 제목을 입력하세요"
                  rows={2}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300">
                  부제목 (선택)
                </label>
                <input
                  id="subtitle"
                  type="text"
                  value={params.subtitle || ''}
                  onChange={(e) => updateParam('subtitle', e.target.value)}
                  placeholder="부제목을 입력하세요"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                  작성자 (선택)
                </label>
                <input
                  id="author"
                  type="text"
                  value={params.author || ''}
                  onChange={(e) => updateParam('author', e.target.value)}
                  placeholder="작성자 이름"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">테마</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(THEMES) as Theme[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateParam('theme', theme)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        params.theme === theme
                          ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {themeLabels[theme]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">글자 크기</label>
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(FONT_SIZES) as FontSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateParam('fontSize', size)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        params.fontSize === size
                          ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {fontSizeLabels[size]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* URL Copy Section */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">생성된 URL</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={ogUrl}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {copied ? '복사됨!' : '복사'}
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-400">HTML에 추가할 메타 태그:</p>
                <pre className="bg-gray-800 rounded-lg p-3 text-xs text-gray-300 overflow-x-auto">
                  {`<meta property="og:image" content="${ogUrl}" />`}
                </pre>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-900 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">미리보기</h2>

            <div className="relative aspect-[1200/630] bg-gray-800 rounded-lg overflow-hidden">
              {ogUrl && (
                <img
                  key={imageKey}
                  src={ogUrl}
                  alt="OG Image Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <p className="text-sm text-gray-500 text-center">
              1200 x 630 px (OG 이미지 권장 크기)
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          Built with Vercel OG
        </div>
      </footer>
    </div>
  );
}
