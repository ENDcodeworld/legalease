'use client';

import { FileText, Court, Calendar, Scale } from 'lucide-react';

interface CaseCardProps {
  caseNo: string;
  title: string;
  court: string;
  date: string;
  cause: string;
  judgment: string;
}

export function CaseCard({ caseNo, title, court, date, cause, judgment }: CaseCardProps) {
  return (
    <div className="case-card">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Court className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              {cause}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
          
          <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h4>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {judgment}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{court}</span>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <span>查看详情</span>
              <Scale className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
