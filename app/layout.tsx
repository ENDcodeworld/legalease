import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LegalEase - 法律援助智能助手',
  description: '让每个人都能轻松获得法律援助。基于AI的法律问答、法条检索、案例搜索工具。',
  keywords: '法律咨询,法律援助,法条检索,案例搜索,AI律师,法律AI',
  openGraph: {
    title: 'LegalEase - 法律援助智能助手',
    description: '让每个人都能轻松获得法律援助',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://legalease.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegalEase - 法律援助智能助手',
    description: '让每个人都能轻松获得法律援助',
  },
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LegalEase',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="font-sans antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
