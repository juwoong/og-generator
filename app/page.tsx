'use client';

import { useState, useEffect, useCallback } from 'react';
import type { OGImageParams } from '@/lib/types';
import { buildOGUrl } from '@/lib/utils';

export default function Home() {
  const [params, setParams] = useState<OGImageParams>({
    title: '블로그 제목을 입력하세요',
    date: '',
    tags: [],
    location: '',
    author: 'Juwoong',
  });

  const [tagsInput, setTagsInput] = useState('');
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

  const updateParam = useCallback(
    <K extends keyof OGImageParams>(key: K, value: OGImageParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
      setImageKey((k) => k + 1);
    },
    []
  );

  const handleTagsChange = useCallback(
    (value: string) => {
      setTagsInput(value);
      const tags = value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      updateParam('tags', tags);
    },
    [updateParam]
  );

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
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
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
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-300"
                >
                  날짜
                </label>
                <input
                  id="date"
                  type="text"
                  value={params.date || ''}
                  onChange={(e) => updateParam('date', e.target.value)}
                  placeholder="2025-01-01"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-300"
                >
                  태그 (쉼표로 구분)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagsInput}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="React, Next.js, TypeScript"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-300"
                >
                  위치
                </label>
                <input
                  id="location"
                  type="text"
                  value={params.location || ''}
                  onChange={(e) => updateParam('location', e.target.value)}
                  placeholder="Seoul, Korea"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-300"
                >
                  작성자
                </label>
                <input
                  id="author"
                  type="text"
                  value={params.author || ''}
                  onChange={(e) => updateParam('author', e.target.value)}
                  placeholder="Juwoong"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
