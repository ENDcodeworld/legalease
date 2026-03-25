#!/usr/bin/env ts-node

/**
 * LegalEase - 法律数据处理器
 * 功能：将原始法律数据转换为向量数据库格式
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Law {
  id: string;
  title: string;
  category: string;
  pub_date: string;
  effective_date: string;
  source: string;
  source_url: string;
  chapters: {
    id: string;
    title: string;
    articles: {
      id: string;
      number: string;
      title: string;
      content: string;
    }[];
  }[];
}

interface ProcessedArticle {
  id: string;
  law_id: string;
  law_title: string;
  chapter: string;
  article_number: string;
  article_title: string;
  content: string;
  full_text: string;
  category: string;
  embedding?: number[];
}

function processLaws(inputDir: string, outputDir: string): ProcessedArticle[] {
  const articles: ProcessedArticle[] = [];

  // 读取所有法律文件
  const files = readFileSync(join(__dirname, inputDir))
    .toString()
    .split('\n')
    .filter(f => f.endsWith('.json'));

  for (const file of files) {
    const law: Law = JSON.parse(readFileSync(join(__dirname, inputDir, file)).toString());

    for (const chapter of law.chapters) {
      for (const article of chapter.articles) {
        const processed: ProcessedArticle = {
          id: article.id,
          law_id: law.id,
          law_title: law.title,
          chapter: chapter.title,
          article_number: article.number,
          article_title: article.title,
          content: article.content,
          full_text: `${law.title} ${chapter.title} ${article.number} ${article.title} ${article.content}`,
          category: law.category,
        };
        articles.push(processed);
      }
    }
  }

  // 输出处理后的数据
  mkdirSync(join(__dirname, outputDir), { recursive: true });
  writeFileSync(
    join(__dirname, outputDir, 'articles.json'),
    JSON.stringify(articles, null, 2)
  );

  console.log(`✅ 处理完成：共生成 ${articles.length} 条法条`);
  return articles;
}

function processCases(inputDir: string, outputDir: string): any[] {
  const cases: any[] = [];

  const files = readFileSync(join(__dirname, inputDir))
    .toString()
    .split('\n')
    .filter(f => f.endsWith('.json'));

  for (const file of files) {
    const caseData = JSON.parse(readFileSync(join(__dirname, inputDir, file)).toString());
    cases.push({
      ...caseData,
      full_text: `${caseData.case_no} ${caseData.title} ${caseData.facts} ${caseData.judgment_result} ${caseData.legal_basis.join(' ')}`
    });
  }

  mkdirSync(join(__dirname, outputDir), { recursive: true });
  writeFileSync(
    join(__dirname, outputDir, 'cases.json'),
    JSON.stringify(cases, null, 2)
  );

  console.log(`✅ 处理完成：共生成 ${cases.length} 条案例`);
  return cases;
}

// 执行处理
console.log('🚀 开始处理法律数据...\n');

const articles = processLaws('../data/laws', '../data/processed');
const cases = processCases('../data/cases', '../data/processed');

console.log('\n✨ 所有数据处理完成！');
console.log(`📚 法条数量：${articles.length}`);
console.log(`📖 案例数量：${cases.length}`);
