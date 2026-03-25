'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText, Scale, Settings } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useSettingsStore, loadSettings, persistSettings } from '../store/useSettingsStore';
import { SettingsPanel } from '../components/SettingsPanel';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: {
    type: 'law' | 'case';
    title: string;
    snippet: string;
    url?: string;
  }[];
  timestamp: Date;
}

export default function ChatPage() {
  const { provider, apiKey, modelName, showSources } = useSettingsStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `你好！我是 LegalEase 法律援助助手。我可以帮你：

1️⃣ **回答法律问题** - 比如"工伤怎么赔偿？"
2️⃣ **检索法条** - 比如"民法典关于合同的规定"
3️⃣ **搜索案例** - 比如"交通事故死亡赔偿案例"
4️⃣ **生成文书** - 比如"帮我生成一份起诉状"

当前使用的模型: **${provider === 'openai' ? 'OpenAI GPT' : provider === 'anthropic' ? 'Anthropic Claude' : 'Ollama ' + modelName}**

请问有什么可以帮你的？`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 加载设置
  useEffect(() => {
    loadSettings();
  }, []);

  // 保存设置到本地存储
  useEffect(() => {
    const timeout = setTimeout(() => {
      persistSettings();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 调用 API，传递当前设置
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input.trim(),
          settings: {
            provider: useSettingsStore.getState().provider,
            apiKey: useSettingsStore.getState().apiKey,
            modelName: useSettingsStore.getState().modelName,
            ollamaBaseUrl: useSettingsStore.getState().ollamaBaseUrl,
          }
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || '抱歉，我遇到了一些问题，请稍后再试。',
        sources: data.sources,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // 演示模式：返回模拟响应
      const demoResponse = getDemoResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: demoResponse.answer,
        sources: demoResponse.sources,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoResponse = (query: string) => {
    // 演示用：简单的规则匹配
    if (query.includes('工伤')) {
      return {
        answer: `根据《工伤保险条例》和《民法典》的相关规定，工伤赔偿主要包括以下项目：

### 1. 医疗费用
- 治疗工伤所需费用符合工伤保险诊疗项目目录、工伤保险药品目录、工伤保险住院服务标准的，从工伤保险基金支付。

### 2. 住院伙食补助费
- 由工伤保险基金按照本地区标准支付。

### 3. 停工留薪期工资
- 职工因工作遭受事故伤害或者患职业病需要暂停工作接受工伤医疗的，在停工留薪期内，原工资福利待遇不变，由所在单位按月支付。

### 4. 一次性伤残补助金
- 根据伤残等级确定，标准为：一级伤残为27个月的本人工资，二级为25个月，三级为23个月，四级为21个月。

### 5. 伤残津贴
- 保留与用人单位的劳动关系，由用人单位安排适当工作。难以安排工作的，由用人单位按月发给伤残津贴。

**法律依据：**
- 《工伤保险条例》第三十条、第三十三条、第三十四条、第三十五条
- 《民法典》第一千一百七十九条

> ⚠️ **注意**：具体赔偿金额需要根据实际情况计算，建议咨询专业律师或当地社保部门。`,
        sources: [
          {
            type: 'law',
            title: '工伤保险条例',
            snippet: '第三十条 职工因工作遭受事故伤害或者患职业病进行治疗，享受工伤医疗待遇...',
            url: 'http://www.npc.gov.cn'
          },
          {
            type: 'law',
            title: '民法典',
            snippet: '第一千一百七十九条 侵害他人造成人身损害的，应当赔偿医疗费、护理费、交通费...',
            url: 'http://www.npc.gov.cn'
          }
        ]
      };
    }

    if (query.includes('离婚')) {
      return {
        answer: `关于离婚，根据《民法典》婚姻家庭编的规定，主要涉及以下几个方面：

### 1. 离婚方式
- **协议离婚**：双方自愿离婚，并对子女抚养、财产分割达成一致，可到民政局办理离婚登记。自2021年1月1日起，协议离婚需要经过30天冷静期。
- **诉讼离婚**：一方不同意离婚或对子女、财产有争议的，可向法院起诉离婚。

### 2. 判决离婚的条件
法院判决离婚的标准是"夫妻感情确已破裂"，以下情形可以认定为感情破裂：
- 重婚或与他人同居
- 实施家庭暴力或虐待、遗弃家庭成员
- 有赌博、吸毒等恶习屡教不改
- 因感情不和分居满二年
- 其他导致夫妻感情破裂的情形

### 3. 子女抚养
离婚后，不满两周岁的子女，以由母亲直接抚养为原则。已满两周岁的，根据双方具体情况判决。子女已满八周岁的，应当尊重其真实意愿。

### 4. 财产分割
夫妻共同财产原则上平均分割，但会考虑照顾子女、女方和无过错方权益等因素。

**法律依据：**
- 《民法典》第一千零七十六条至第一千零八十九条

如需具体咨询，建议提供更多详细信息。`,
        sources: [
          {
            type: 'law',
            title: '民法典 婚姻家庭编',
            snippet: '第一千零七十六条 夫妻双方自愿离婚的，应当签订书面离婚协议，并亲自到婚姻登记机关申请离婚登记...',
            url: 'http://www.npc.gov.cn'
          }
        ]
      };
    }

    // 默认回复
    return {
      answer: `感谢你的提问！你问的是："${query}"

这是一个很好的法律问题。为了给你提供更准确的答案，我需要：

1. **更多细节** - 比如发生的时间、地点、涉及的人员
2. **具体情境** - 是合同纠纷？劳动争议？还是其他？
3. **你的诉求** - 你想解决什么问题？

同时，你可以：
- 📚 查看右侧的"相关法条"和"参考案例"
- 🔍 在下方搜索框输入关键词检索
- 📞 如需正式法律意见，请咨询专业律师

> ⚠️ **免责声明**：本助手提供的所有信息仅供参考，不构成法律意见。具体案件请咨询执业律师。`,
      sources: [
        {
          type: 'law',
          title: '民法典 总则编',
          snippet: '第一条 为了保护民事主体的合法权益，调整民事关系，维护社会和经济秩序，弘扬社会主义核心价值观，根据宪法，制定本法。',
          url: 'http://www.npc.gov.cn'
        }
      ]
    };
  };

  const renderSources = (sources?: Message['sources']) => {
    if (!sources || sources.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-2">参考来源：</p>
        <div className="space-y-1">
          {sources.map((source, idx) => (
            <div key={idx} className="text-xs">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                source.type === 'law' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
              <span className="font-medium text-gray-700">{source.title}</span>
              <span className="text-gray-500 truncate block">{source.snippet}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary-600" />
            <h1 className="text-lg font-bold text-gray-900">LegalEase</h1>
          </div>
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            {provider === 'openai' ? 'GPT-4' : provider === 'anthropic' ? 'Claude' : 'Ollama'}
          </span>
        </div>
        <SettingsPanel />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  {message.role === 'assistant' ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
              
              {message.role === 'assistant' && showSources && renderSources(message.sources)}
              
              <div className="text-xs text-gray-400 mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-600" />
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">思考中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的法律问题... 例如：工伤怎么赔偿？"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
