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
  title: 'Demo - LegalEase',
  description: 'LegalEase 在线演示 - 免费的法律援助智能助手',
}

const stats = [
  { label: 'GitHub Stars', value: '500+', icon: Star, color: 'text-yellow-500' },
  { label: 'Legal Articles', value: '10,000+', icon: FileText, color: 'text-blue-500' },
  { label: 'Cases', value: '100,000+', icon: GitBranch, color: 'text-green-500' },
  { label: 'Users', value: '1,000+', icon: Users, color: 'text-purple-500' },
]

const features = [
  {
    icon: MessageSquare,
    title: '智能问答',
    description: '输入你的法律问题，AI 给出专业解答',
    demo: '工伤怎么赔偿？'
  },
  {
    icon: Search,
    title: '法条检索',
    description: '快速找到相关法律法规',
    demo: '民法典 合同'
  },
  {
    icon: FileText,
    title: '案例搜索',
    description: '查询类似案例，了解判决结果',
    demo: '交通事故 死亡赔偿'
  },
  {
    icon: Calculator,
    title: '法律计算',
    description: '自动计算诉讼费、赔偿金',
    demo: '工伤赔偿计算器'
  }
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">LegalEase</span>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">DEMO</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                返回首页
              </Link>
              <Link 
                href="https://github.com/yourusername/legalease" 
                target="_blank"
                className="btn-secondary flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                <span>Star Us</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            在线体验
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> LegalEase</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            这是一个演示版本，展示 LegalEase 的核心功能。
            完整版本需要部署后使用全部功能。
          </p>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 功能演示 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">试试输入：</p>
                  <code className="block text-primary-700 font-mono text-sm bg-white px-3 py-2 rounded border">
                    {feature.demo}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 演示区域 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎯 功能演示
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入你的问题：
              </label>
              <input 
                type="text" 
                placeholder="例如：工伤怎么赔偿？"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue="工伤如何赔偿？"
                readOnly
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">AI 回答示例：</h3>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <p>
                  根据《工伤保险条例》和《民法典》的相关规定，工伤赔偿主要包括以下项目：
                </p>
                
                <h4>1. 医疗费用</h4>
                <p>
                  治疗工伤所需费用符合工伤保险诊疗项目目录、工伤保险药品目录、工伤保险住院服务标准的，从工伤保险基金支付。
                </p>

                <h4>2. 停工留薪期工资</h4>
                <p>
                  职工因工作遭受事故伤害需要暂停工作接受工伤医疗的，在停工留薪期内，原工资福利待遇不变，由所在单位按月支付。
                </p>

                <h4>3. 一次性伤残补助金</h4>
                <p>
                  根据伤残等级确定，标准为：一级伤残为27个月的本人工资，二级为25个月，三级为23个月，四级为21个月。
                </p>

                <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg mt-4">
                  <p className="text-sm text-primary-800">
                    <strong>法律依据：</strong>《工伤保险条例》第三十条、第三十三条、第三十四条、第三十五条
                  </p>
                </div>

                <p className="text-sm text-gray-500 italic">
                  ⚠️ 注意：此回答为示例，具体赔偿金额需要根据实际情况计算，建议咨询专业律师或当地社保部门。
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Link 
                href="/chat" 
                className="btn-primary flex items-center gap-2"
              >
                <span>开始聊天</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/docs/quickstart/docker" 
                className="btn-secondary"
              >
                部署自己的实例
              </Link>
            </div>
          </div>
        </div>

        {/* 部署信息 */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            想要完整功能？
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            一键部署 LegalEase，接入真实的 AI 和法律数据库。
            支持 Docker、Vercel、本地运行。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/docs/quickstart/docker"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Docker 部署</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/docs/quickstart/vercel"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Vercel 部署</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 免责声明</h3>
          <p className="text-sm text-yellow-800">
            LegalEase 提供的法律信息仅供参考，不构成法律意见。实际案件请咨询专业律师。
            本项目不对使用本工具产生的任何后果承担责任。
          </p>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 LegalEase. MIT License.
          </p>
          <p className="text-xs mt-2">
            本项目仅供学习研究使用
          </p>
        </div>
      </footer>
    </div>
  );
}
