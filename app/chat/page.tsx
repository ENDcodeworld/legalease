'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText, Scale } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 LegalEase 法律援助助手。我可以帮你：\n\n1️⃣ **回答法律问题** - 比如"工伤怎么赔偿？"\n2️⃣ **检索法条** - 比如"民法典关于合同的规定"\n3️⃣ **搜索案例** - 比如"交通事故死亡赔偿案例"\n4️⃣ **生成文书** - 比如"帮我生成一份起诉状"\n\n请问有什么可以帮你的？',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      // 调用 API（这里需要实现真实的 API 调用）
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() }),
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

    // 默认响应
    return {
      answer: `感谢你的提问！作为一个演示版本，我目前只能简单回答关于**工伤**和**离婚**的问题。

你可以尝试问我：
- "工伤怎么赔偿？"
- "离婚财产怎么分割？"
- "起诉需要准备什么材料？"

完整版本已接入真实的法律数据库，可以回答更多法律问题。`,
      sources: []
    };
  };

  const quickQuestions = [
    '工伤如何赔偿？',
    '离婚财产怎么分割？',
    '交通事故赔偿标准',
    '民间借贷利息规定',
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Scale className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">LegalEase</h1>
            <p className="text-sm text-gray-500">法律援助智能助手</p>
          </div>
        </div>
      </header>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary-600" />
                </div>
              )}
              
              <div className={`max-w-3xl ${message.role === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-h3:text-lg prose-p:my-2 prose-ul:my-2 prose-li:my-1">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>

                {/* 来源引用 */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.sources.map((source, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-2"
                      >
                        <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{source.title}</span>
                          <p className="line-clamp-2">{source.snippet}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString('zh-CN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                  <span className="text-gray-600">正在思考...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 快捷问题 */}
      {messages.length === 1 && (
        <div className="px-4 py-2">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 mb-2">快速提问：</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 输入框 */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的法律问题，比如：'工伤怎么赔偿？'"
            className="flex-1 input-field"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn-primary px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>发送</span>
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-2">
          由 AI 生成的内容仅供参考，不构成法律意见。具体案件请咨询专业律师。
        </p>
      </div>
    </div>
  );
}
