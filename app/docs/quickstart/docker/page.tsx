import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ExternalLink, Code, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Docker 部署 - LegalEase 文档',
  description: '使用 Docker 快速部署 LegalEase 法律援助智能助手',
}

const steps = [
  {
    step: 1,
    title: '前置准备',
    items: [
      '安装 Docker 20+',
      '安装 Docker Compose 2+',
      '获取 OpenAI API Key',
    ]
  },
  {
    step: 2,
    title: '克隆项目',
    code: `git clone https://github.com/yourusername/legalease.git
cd legalease`
  },
  {
    step: 3,
    title: '配置环境',
    code: `cp .env.example .env
# 编辑 .env 文件，填入 OPENAI_API_KEY`
  },
  {
    step: 4,
    title: '启动服务',
    code: `docker-compose up -d

# 查看日志
docker-compose logs -f`
  },
  {
    step: 5,
    title: '访问应用',
    content: '打开浏览器访问: http://localhost:3000',
    link: 'http://localhost:3000'
  }
]

export default function DockerDeployPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/docs" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4">
            <ExternalLink className="w-4 h-4" />
            <span>返回文档首页</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Docker 部署
          </h1>
          
          <p className="text-xl text-gray-600">
            最简单、最快捷的部署方式，5 分钟完成安装。
          </p>
        </div>

        {/* 步骤 */}
        <div className="space-y-6">
          {steps.map((item) => (
            <div key={item.step} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-primary-700">
                  {item.step}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h2>
                  
                  {item.code && (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                      <code>{item.code}</code>
                    </pre>
                  )}
                  
                  {item.content && (
                    <p className="text-gray-700 mb-3">{item.content}</p>
                  )}
                  
                  {item.link && (
                    <Link 
                      href={item.link}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>访问应用</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  
                  {item.items && (
                    <ul className="space-y-2">
                      {item.items.map((subItem, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 配置说明 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-4">📋 环境变量说明</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left">变量名</th>
                  <th className="px-4 py-2 text-left">必需</th>
                  <th className="px-4 py-2 text-left">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                <tr>
                  <td className="px-4 py-3 font-mono text-blue-800">OPENAI_API_KEY</td>
                  <td className="px-4 py-3 text-green-700">✓ 必需</td>
                  <td className="px-4 py-3">OpenAI API 密钥（sk-...）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-blue-800">ANTHROPIC_API_KEY</td>
                  <td className="px-4 py-3 text-gray-500">可选</td>
                  <td className="px-4 py-3">Anthropic Claude API 密钥（可选）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-blue-800">CHROMA_PERSIST_DIR</td>
                  <td className="px-4 py-3 text-gray-500">可选</td>
                  <td className="px-4 py-3">向量数据库持久化路径（默认：/app/data/chroma）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 故障排查 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🔧 故障排查
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">容器无法启动</h4>
              <p className="text-sm text-gray-600">
                检查 Docker 日志：<code className="bg-gray-100 px-1 rounded">docker-compose logs app</code>
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">API 返回 500 错误</h4>
              <p className="text-sm text-gray-600">
                确认 <code className="bg-gray-100 px-1 rounded">OPENAI_API_KEY</code> 配置正确且有效。
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">向量检索慢</h4>
              <p className="text-sm text-gray-600">
                增加 Docker 容器的 CPU/内存资源，或使用 Chroma Cloud 服务。
              </p>
            </div>
          </div>
        </div>

        {/* 下一步 */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">部署成功？</h3>
          <p className="text-primary-100 mb-6">
            现在你可以开始使用 LegalEase 了！探索更多功能：
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/docs/guide/chat"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              学习使用
            </Link>
            <Link 
              href="/docs/data/sources"
              className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              添加数据
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
