'use client';

import { FileText, Scale, ExternalLink } from 'lucide-react';

interface LawArticle {
  id: string;
  law_title: string;
  chapter: string;
  article_number: string;
  article_title: string;
  content: string;
}

interface LawCardProps {
  article: LawArticle;
}

export function LawCard({ article }: LawCardProps) {
  return (
    <div className="law-article bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-300 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">{article.law_title}</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {article.article_number} {article.article_title}
          </h4>
          <p className="text-gray-700 leading-relaxed">{article.content}</p>
        </div>
        <button className="text-gray-400 hover:text-primary-600 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
