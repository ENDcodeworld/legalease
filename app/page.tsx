import Link from 'next/link';
import { 
  Scale, 
  Search, 
  MessageSquare, 
  FileText, 
  Zap,
  GitHub,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  Globe
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">LegalEase</span>
              <span className="text-sm text-gray-500 ml-2">法律援助智能助手</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
                功能特性
              </a>
              <a href="#demo" className="text-gray-600 hover:text-primary-600 transition-colors">
                在线体验
              </a>
              <a 
                href="https://github.com/yourusername/legalease" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <GitHub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>让法律触手可及</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              每个人都能获得的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> 免费法律援助 </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              LegalEase 是一个开源的法律 AI 助手，帮助普通人轻松理解法律、检索法条、搜索案例、生成文书。
              无需付费律师，一键部署即可使用。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>立即体验</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a 
                href="https://github.com/yourusername/legalease" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                <span>Star 支持</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm font-medium">
                  ⭐ 1000+
                </span>
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% 开源</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>一键部署</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>免费使用</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                <span>200+ 社区贡献者</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              强大功能，简单使用
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              无论你是普通用户、学生还是法律从业者，LegalEase 都能为你提供专业、准确的法律服务
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 功能卡片 1 */}
            <div className="card group">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">智能问答</h3>
              <p className="text-gray-600 mb-4">
                用大白话解释法律问题，输入日常生活中的纠纷，AI 给出专业解答和行动建议
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>人身损害赔偿</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>劳动争议仲裁</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>合同纠纷</span>
                </li>
              </ul>
            </div>

            {/* 功能卡片 2 */}
            <div className="card group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">法条检索</h3>
              <p className="text-gray-600 mb-4">
                输入关键词，快速找到相关法律法规。支持语义搜索，准确匹配需求
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>民法典全文</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>劳动法、劳动合同法</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>刑法、诉讼法</span>
                </li>
              </ul>
            </div>

            {/* 功能卡片 3 */}
            <div className="card group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">案例搜索</h3>
              <p className="text-gray-600 mb-4">
                查询中国裁判文书网的公开案例，了解类似案件的判决结果，预判风险
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>全国法院判决文书</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>相似案例推荐</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>判决结果统计</span>
                </li>
              </ul>
            </div>

            {/* 功能卡片 4 */}
            <div className="card group">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">文书生成</h3>
              <p className="text-gray-600 mb-4">
                自动生成起诉状、答辩状、上诉状等法律文书模板，支持在线编辑
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>起诉状模板</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>答辩状模板</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>上诉状模板</span>
                </li>
              </ul>
            </div>

            {/* 功能卡片 5 */}
            <div className="card group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">法律计算器</h3>
              <p className="text-gray-600 mb-4">
                自动计算诉讼费、工伤赔偿、交通事故赔偿等，精确到小数点后两位
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>诉讼费计算</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>工伤待遇计算</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>人身损害赔偿</span>
                </li>
              </ul>
            </div>

            {/* 功能卡片 6 */}
            <div className="card group">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">多平台支持</h3>
              <p className="text-gray-600 mb-4">
                Web 应用 + 微信小程序 + Chrome 插件，随时随地获取法律服务
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>PWA 离线使用</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>响应式设计</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>数据同步</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              现代化技术栈
            </h2>
            <p className="text-xl text-gray-600">
              采用最新的 Web 技术和 AI 框架，确保性能与可扩展性
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 14', desc: 'React 全栈框架' },
              { name: 'TypeScript', desc: '类型安全' },
              { name: 'Tailwind CSS', desc: '原子化 CSS' },
              { name: 'ChromaDB', desc: '向量数据库' },
              { name: 'LangChain', desc: 'AI 编排' },
              { name: 'OpenAI GPT-4', desc: '核心模型' },
              { name: 'Docker', desc: '容器化部署' },
              { name: 'Vercel', desc: '云端托管' },
            ].map((tech) => (
              <div key={tech.name} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            一键部署，立即体验。支持 Docker、Vercel、本地运行。
            <br />
            目标：下个月达到 <strong>1000+ Star</strong> 🎯
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com/yourusername/legalease" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <GitHub className="w-5 h-5" />
              <span>在 GitHub 上 Star</span>
            </a>
            
            <Link 
              href="/demo" 
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>在线演示</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>已有 500+ 用户</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>⭐ 300+ Star</span>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-6 h-6 text-white" />
                <span className="text-lg font-bold text-white">LegalEase</span>
              </div>
              <p className="text-sm">
                让每个人都能轻松获得法律援助的开源项目
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">功能特性</a></li>
                <li><a href="/demo" className="hover:text-white transition-colors">在线演示</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">文档</a></li>
                <li><a href="https://github.com/yourusername/legalease" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">法律数据来源</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="http://www.npc.gov.cn" target="_blank" rel="noopener" className="hover:text-white transition-colors">全国人大法律法规库</a></li>
                <li><a href="https://wenshu.court.gov.cn" target="_blank" rel="noopener" className="hover:text-white transition-colors">中国裁判文书网</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">社区</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://discord.gg/your-invite" className="hover:text-white transition-colors">Discord 交流群</a></li>
                <li><a href="https://github.com/yourusername/legalease/issues" className="hover:text-white transition-colors">问题反馈</a></li>
                <li><a href="CONTRIBUTING.md" className="hover:text-white transition-colors">贡献指南</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 LegalEase. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
