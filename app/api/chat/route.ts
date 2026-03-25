import { NextRequest, NextResponse } from 'next/server';
import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';

// 初始化 ChromaDB
const chroma = new ChromaClient({
  path: process.env.CHROMA_PERSIST_DIR 
    ? `file://${process.env.CHROMA_PERSIST_DIR}`
    : 'http://localhost:8000',
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  modelName: 'gpt-4-turbo-preview',
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 1. 生成查询向量
    const queryEmbedding = await embeddings.embedQuery(message);

    // 2. 搜索法条
    const lawCollection = await chroma.getCollection({ name: 'legal_articles' });
    const lawResults = await lawCollection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 3,
    });

    // 3. 搜索案例
    const caseCollection = await chroma.getCollection({ name: 'legal_cases' });
    const caseResults = await caseCollection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 2,
    });

    // 4. 构建上下文
    let context = '';
    const sources = [];

    if (lawResults.documents?.[0]) {
      context += '## 相关法条：\n';
      for (let i = 0; i < lawResults.documents[0].length; i++) {
        const doc = lawResults.documents[0][i];
        const metadata = lawResults.metadatas?.[0][i];
        context += `${i + 1}. ${doc}\n\n`;
        sources.push({
          type: 'law',
          title: metadata?.law_title || '法条',
          snippet: doc.substring(0, 150) + '...',
        });
      }
    }

    if (caseResults.documents?.[0]) {
      context += '## 相关案例：\n';
      for (let i = 0; i < caseResults.documents[0].length; i++) {
        const doc = caseResults.documents[0][i];
        const metadata = caseResults.metadatas?.[0][i];
        context += `${i + 1}. ${doc}\n\n`;
        sources.push({
          type: 'case',
          title: metadata?.case_no || '案例',
          snippet: doc.substring(0, 150) + '...',
        });
      }
    }

    // 5. 构建 Prompt
    const prompt = `你是一个专业的法律助手，请根据以下参考信息回答用户的问题。

${context}

用户问题：${message}

请提供：
1. 清晰、准确的法律分析
2. 引用具体的法条内容
3. 给出实用的行动建议
4. 标注免责声明：你的回答仅供参考，不构成法律意见

回答要用中文，使用 Markdown 格式，条理清晰。`;

    // 6. 调用 LLM
    const answer = await llm.invoke(prompt);

    return NextResponse.json({
      answer,
      sources: sources.slice(0, 3), // 最多返回 3 个来源
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
