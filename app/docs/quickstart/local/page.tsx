import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Terminal, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: '本地运行 - LegalEase 文档',
  description: '在本地开发环境运行 LegalEase',
}

const steps = [
  {
    step: 1,
    title: '克隆并安装依赖',
    code: `git clone https://github.com/yourusername/legalease.git
cd legalease
npm install`
  },
  {
    step: 2,
    title: '配置环境变量',
    code: `cp .env.example .env.local
# 编辑 .env.local 填入你的 API Key`,
    desc: '需要 OpenAI API Key 或 Anthropic API Key'
  },
  {
    step: 3,
    title: '准备数据',
    code: `npm run data:process
npm run data:embed`,
    desc: '首次运行需要下载和处理法律数据'
  },
  {
    step: 4,
    title: '启动开发服务器',
    code: 'npm run dev',
    result: '访问 http://localhost:3000'
  }
]

export default function LocalRunPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/docs" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4">
            <ExternalLink className="w-4 h-4" />
            <span>返回文档首页</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            本地开发环境
          </h1>
          
          <p className="text-xl text-gray-600">
            适合开发者调试和二次开发。
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((item) => (
            <div key={item.step} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-blue-700">
                  {item.step}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h2>
                  
                  {item.desc && (
                    <p className="text-gray-600 mb-3">{item.desc}</p>
                  )}
                  
                  {item.code && (
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>
                      <button 
                        onClick={() => navigator.clipboard.writeText(item.code)}
                        className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        复制
                      </button>
                    </div>
                  )}
                  
                  {item.result && (
                    <p className="mt-3 text-green-700 font-medium">
                      ✓ {item.result}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-primary-600" />
              <h3 className="font-semibold text-gray-900">开发命令</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><code className="bg-gray-100 px-1 rounded">npm run dev</code> - 启动开发服务器</li>
              <li><code className="bg-gray-100 px-1 rounded">npm run build</code> - 构建生产版本</li>
              <li><code className="bg-gray-100 px-1 rounded">npm run lint</code> - 代码检查</li>
              <li><code className="bg-gray-100 px-1 rounded">npm run data:process</code> - 处理数据</li>
              <li><code className="bg-gray-100 px-1 rounded">npm run data:embed</code> - 生成向量</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-600" />
              <h3 className="font-semibold text-gray-900">开发环境要求</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Node.js 18+</li>
              <li>Python 3.10+ (数据处理)</li>
              <li>OpenAI API Key</li>
              <li>ChromaDB (本地或远程)</li>
              <li>至少 4GB 可用内存</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
