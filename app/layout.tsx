import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OG Image Generator',
  description: 'Generate beautiful Open Graph images for your blog posts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
