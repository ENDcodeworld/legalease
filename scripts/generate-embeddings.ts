#!/usr/bin/env ts-node

/**
 * LegalEase - 向量嵌入生成器
 * 功能：为法律条文和案例生成向量嵌入，存入 ChromaDB
 */

import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateEmbeddings() {
  console.log('🚀 开始生成向量嵌入...\n');

  // 初始化 ChromaDB
  const chroma = new ChromaClient({
    path: 'http://localhost:8000', // 或使用本地路径
  });

  // 初始化 OpenAI Embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // 读取处理后的数据
  const articles = JSON.parse(
    readFileSync(join(__dirname, '../data/processed/articles.json')).toString()
  );
  const cases = JSON.parse(
    readFileSync(join(__dirname, '../data/processed/cases.json')).toString()
  );

  console.log(`📚 加载 ${articles.length} 条法条`);
  console.log(`📖 加载 ${cases.length} 条案例`);

  // 创建/获取集合
  const lawCollection = await chroma.getOrCreateCollection({
    name: 'legal_articles',
    metadata: { description: '法律条文向量集合' },
  });

  const caseCollection = await chroma.getOrCreateCollection({
    name: 'legal_cases',
    metadata: { description: '案例向量集合' },
  });

  // 批量插入法条
  console.log('\n🔄 正在处理法条...');
  const articleIds: string[] = [];
  const articleTexts: string[] = [];
  const articleMetadatas: any[] = [];

  for (const article of articles) {
    articleIds.push(article.id);
    articleTexts.push(article.full_text);
    articleMetadatas.push({
      law_id: article.law_id,
      law_title: article.law_title,
      chapter: article.chapter,
      article_number: article.article_number,
      category: article.category,
      type: 'law',
    });
  }

  const articleEmbeddings = await embeddings.embedDocuments(articleTexts);

  await lawCollection.add({
    ids: articleIds,
    embeddings: articleEmbeddings,
    documents: articleTexts,
    metadatas: articleMetadatas,
  });

  console.log(`✅ 已插入 ${articles.length} 条法条`);

  // 批量插入案例
  console.log('\n🔄 正在处理案例...');
  const caseIds: string[] = [];
  const caseTexts: string[] = [];
  const caseMetadatas: any[] = [];

  for (const caseItem of cases) {
    caseIds.push(caseItem.id);
    caseTexts.push(caseItem.full_text);
    caseMetadatas.push({
      case_no: caseItem.case_no,
      court: caseItem.court,
      cause: caseItem.cause,
      judgment_result: caseItem.judgment_result,
      type: 'case',
    });
  }

  const caseEmbeddings = await embeddings.embedDocuments(caseTexts);

  await caseCollection.add({
    ids: caseIds,
    embeddings: caseEmbeddings,
    documents: caseTexts,
    metadatas: caseMetadatas,
  });

  console.log(`✅ 已插入 ${cases.length} 条案例`);

  console.log('\n✨ 向量嵌入生成完成！');
  console.log('📊 总计：', articles.length + cases.length, '条记录');
}

generateEmbeddings().catch(console.error);
