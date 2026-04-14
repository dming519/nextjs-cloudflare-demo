export const metadata = {
  title: 'Next.js + Cloudflare Demo',
  description: 'D1 + R2 + KV on Cloudflare Pages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
