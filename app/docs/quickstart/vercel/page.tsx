import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Code, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vercel 部署 - LegalEase 文档',
  description: '使用 Vercel 一键部署 LegalEase',
}

export default function VercelDeployPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/docs" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4">
            <ExternalLink className="w-4 h-4" />
            <span>返回文档首页</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vercel 一键部署
          </h1>
          
          <p className="text-xl text-gray-600">
            无需配置，一键部署到 Vercel 平台。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            快速开始
          </h2>
          
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-primary-700">1</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">点击部署按钮</h3>
                <p className="text-gray-600">点击下方按钮，导入你的 GitHub 仓库</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-primary-700">2</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">配置环境变量</h3>
                <p className="text-gray-600">在 Vercel Dashboard 中添加 <code className="bg-gray-100 px-1 rounded">OPENAI_API_KEY</code></p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-primary-700">3</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">等待部署完成</h3>
                <p className="text-gray-600">Vercel 自动构建和部署</p>
              </div>
            </li>
          </ol>

          <div className="mt-8 text-center">
            <a 
              href="https://vercel.com/import/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Flegalease"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <Code className="w-5 h-5" />
              <span>Deploy with Vercel</span>
            </a>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 重要提示</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>Vercel 免费套餐适合小规模使用</li>
            <li>向量数据库需要使用外部服务（推荐 Chroma Cloud）</li>
            <li>请确保遵守 Vercel 的使用条款</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
