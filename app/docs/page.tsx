import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  MessageSquare, 
  Search, 
  FileText, 
  Calculator,
  Star,
  GitBranch,
  Users,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: '文档 - LegalEase',
  description: 'LegalEase 法律援助智能助手完整文档',
};

const sections = [
  {
    title: '快速开始',
    icon: Rocket,
    description: '5 分钟快速部署 LegalEase',
    link: '/docs/quickstart',
    items: [
      { name: 'Docker 部署', href: '/docs/quickstart/docker' },
      { name: 'Vercel 部署', href: '/docs/quickstart/vercel' },
      { name: '本地运行', href: '/docs/quickstart/local' },
    ]
  },
  {
    title: '用户指南',
    icon: BookOpen,
    description: '如何使用 LegalEase 的各项功能',
    link: '/docs/guide',
    items: [
      { name: '智能问答', href: '/docs/guide/chat' },
      { name: '法条检索', href: '/docs/guide/laws' },
      { name: '案例搜索', href: '/docs/guide/cases' },
      { name: '文书生成', href: '/docs/guide/documents' },
      { name: '计算器', href: '/docs/guide/calculator' },
    ]
  },
  {
    title: '开发者指南',
    icon: Code,
    description: '如何为 LegalEase 贡献代码',
    link: '/docs/developer',
    items: [
      { name: '开发环境搭建', href: '/docs/developer/setup' },
      { name: '数据格式规范', href: '/docs/developer/data-format' },
      { name: 'API 参考', href: '/docs/developer/api' },
      { name: '架构设计', href: '/docs/developer/architecture' },
      { name: '测试指南', href: '/docs/developer/testing' },
    ]
  },
  {
    title: '数据管理',
    icon: Container,
    description: '法律数据的处理与更新',
    link: '/docs/data',
    items: [
      { name: '数据来源', href: '/docs/data/sources' },
      { name: '数据处理流程', href: '/docs/data/pipeline' },
      { name: '定期更新', href: '/docs/data/update' },
      { name: '数据贡献', href: '/docs/data/contribute' },
    ]
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">LegalEase 文档</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            完整的项目文档，帮助你快速上手并为 LegalEase 做贡献
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    <Link href={section.link} className="hover:text-primary-600 transition-colors">
                      {section.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2 group"
                        >
                          <Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 快速链接 */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">准备好开始了吗？</h3>
            <p className="text-primary-100 mb-6">
              跟着我们的快速开始指南，5 分钟部署你的 LegalEase 实例
            </p>
            <Link 
              href="/docs/quickstart/docker"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              <span>立即开始</span>
            </Link>
          </div>
        </div>

        {/* 贡献者指南 */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">参与贡献</h3>
            <Link href="/CONTRIBUTING.md" className="text-primary-600 hover:text-primary-700 font-medium">
              查看完整指南 →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">报告问题</h4>
              <p className="text-sm text-gray-600">
                发现 Bug？告诉我们，我们会尽快修复
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">提交 PR</h4>
              <p className="text-sm text-gray-600">
                修复 Bug 或添加新功能，欢迎 Pull Request
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">贡献数据</h4>
              <p className="text-sm text-gray-600">
                提供法律数据，帮助完善知识库
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
