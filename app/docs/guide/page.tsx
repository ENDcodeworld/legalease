import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, MessageSquare, Search, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: '用户指南 - LegalEase 文档',
  description: '如何使用 LegalEase 的各项功能',
}

const guides = [
  {
    icon: MessageSquare,
    title: '智能问答',
    description: '学习如何使用 AI 回答法律问题',
    href: '/docs/guide/chat'
  },
  {
    icon: Search,
    title: '法条检索',
    description: '快速查找相关法律法规',
    href: '/docs/guide/laws'
  },
  {
    icon: FileText,
    title: '案例搜索',
    description: '查询类似案例和判决',
    href: '/docs/guide/cases'
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/docs" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4">
            <ExternalLink className="w-4 h-4" />
            <span>返回文档首页</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            用户指南
          </h1>
          
          <p className="text-xl text-gray-600">
            快速掌握 LegalEase 的核心功能
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link 
              key={guide.title}
              href={guide.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <guide.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">快速提示</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>输入问题时尽量具体，如"工伤赔偿包括哪些项目"比"工伤"效果更好</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>AI 的回答基于检索到的法条和案例，底部会标注来源</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">•</span>
              <span>如需更深入分析，建议咨询专业律师</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
