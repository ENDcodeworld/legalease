'use client';

import {
  Scale,
  MessageSquare,
  Search,
  Briefcase,
  FileText,
  Calculator,
  Smartphone,
  Android,
  Bot,
  Cpu,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">LegalEase</h1>
              <p className="text-primary-600 font-medium">法律援助智能助手</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            让每个人都能轻松获得法律援助。基于 AI 的智能问答、法条检索、案例搜索，完全开源免费。
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <a
              href="/chat"
              className="px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-lg"
            >
              免费试用
            </a>
            <a
              href="https://github.com/ENDcodeworld/legalease"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
            >
              GitHub Stars ⭐
            </a>
          </div>

          {/* 徽章 */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Android className="w-5 h-5" />
              <span>Android APK 支持</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span>PWA 离线可用</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span>多模型支持 (GPT-4 / Claude / Ollama)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            为什么选择 LegalEase？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 功能1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">智能问答</h3>
              <p className="text-gray-600 mb-4">
                输入法律问题，AI 自动检索相关法条和案例，给出专业解答。支持追问和澄清。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ 语义理解准确</li>
                <li>✓ 引用来源可查</li>
                <li>✓ 支持多轮对话</li>
              </ul>
            </div>

            {/* 功能2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">法条检索</h3>
              <p className="text-gray-600 mb-4">
                不用翻厚厚的法典。输入关键词，秒级找到相关法律法规，支持精确匹配和模糊搜索。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ 覆盖民法典全1260条</li>
                <li>✓ 实时更新最新法规</li>
                <li>✓ 显示条文本号</li>
              </ul>
            </div>

            {/* 功能3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">案例搜索</h3>
              <p className="text-gray-600 mb-4">
                查看类似案件的判决结果，了解法官的裁判思路。提高胜诉几率。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ 裁判文书网数据</li>
                <li>✓ 智能相似度匹配</li>
                <li>✓ 提炼关键信息</li>
              </ul>
            </div>

            {/* 功能4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">文书生成</h3>
              <p className="text-gray-600 mb-4">
                自动生成起诉状、答辩状、上诉书等法律文书模板，填写信息即可导出。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ 多种文书模板</li>
                <li>✓ 智能填充信息</li>
                <li>✓ 支持 Word/PDF 导出</li>
              </ul>
            </div>

            {/* 功能5 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">法律计算器</h3>
              <p className="text-gray-600 mb-4">
                诉讼费、工伤赔偿、人身损害赔偿等自动计算，结果准确，公式透明。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ 多项费用合并</li>
                <li>✓ 地区标准差异</li>
                <li>✓ 实时计算结果</li>
              </ul>
            </div>

            {/* 功能6 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">全平台支持</h3>
              <p className="text-gray-600 mb-4">
                Web 应用 + Android APK + PWA，随时随地使用。离线模式下也可查看已缓存的法条。
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ Android 原生应用</li>
                <li>✓ 可安装到主屏幕</li>
                <li>✓ 数据自动同步</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-model Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-8 h-8 text-primary-400" />
              <h2 className="text-2xl font-bold">多模型支持</h2>
            </div>
            <p className="text-gray-300 mb-8">
              LegalEase 不绑定单一 AI 服务商。你可以自由选择最适合的模型：
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">GPT</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">OpenAI GPT-4</h4>
                    <p className="text-xs text-gray-400">最强综合能力</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ 知识全面</li>
                  <li>✓ 推理能力强</li>
                  <li>✓ 响应快速</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Claude</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Anthropic Claude</h4>
                    <p className="text-xs text-gray-400">擅长法律分析</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ 法律领域优化</li>
                  <li>✓ 长文本处理</li>
                  <li>✓ 安全性高</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Ollama</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">本地 Ollama</h4>
                    <p className="text-xs text-gray-400">隐私保护完全离线</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>✓ 数据不外传</li>
                  <li>✓ 免费无限用</li>
                  <li>✓ 可自定义模型</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
              >
                立即体验
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">GitHub Stars 目标</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">开源免费</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-600">广告/收费</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">支持 LegalEase 上 1000 Stars！</h2>
          <p className="text-xl mb-8 opacity-90">
            如果你觉得这个项目有用，请在 GitHub 上给我们一个 Star ⭐
          </p>
          <a
            href="https://github.com/ENDcodeworld/legalease"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Star className="w-6 h-6 fill-current" />
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-primary-500" />
              <span className="text-white font-bold">LegalEase</span>
            </div>
            <p className="text-sm">
              让每个人都能轻松获得法律援助
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">首页</a></li>
              <li><a href="/chat" className="hover:text-white transition-colors">在线试用</a></li>
              <li><a href="/demo" className="hover:text-white transition-colors">演示</a></li>
              <li><a href="/docs" className="hover:text-white transition-colors">文档</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/ENDcodeworld/legalease" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="/ANDROID_BUILD.md" className="hover:text-white transition-colors">APK 构建</a></li>
              <li><a href="/ROADMAP.md" className="hover:text-white transition-colors">开发路线</a></li>
              <li><a href="/CONTRIBUTING.md" className="hover:text-white transition-colors">贡献指南</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">免责声明</h4>
            <p className="text-sm">
              LegalEase 提供的所有信息仅供参考，不构成法律意见。具体案件请咨询执业律师。
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2024 LegalEase. MIT License. 开源项目。</p>
        </div>
      </footer>
    </div>
  );
}
