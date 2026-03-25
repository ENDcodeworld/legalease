'use client';

import { useState } from 'react';
import { Calculator, DollarSign, Scale, FileText } from 'lucide-react';

export function LegalCalculator() {
  const [activeTab, setActiveTab] = useState<'labor' | 'traffic' | 'medical' | 'lawsuit'>('labor');
  
  // 工伤计算器
  const [laborData, setLaborData] = useState({
    salary: '',
    injuryLevel: '10', // 1-10级
    age: '',
    keepWorking: true,
  });
  
  const [laborResult, setLaborResult] = useState<any>(null);

  // 诉讼费计算器
  const [lawsuitData, setLawsuitData] = useState({
    claimAmount: '',
    caseType: 'civil', // civil, commercial, administrative
  });
  
  const [lawsuitResult, setLawsuitResult] = useState<number>(0);

  // 计算工伤赔偿
  const calculateLaborCompensation = () => {
    const monthlySalary = parseFloat(laborData.salary);
    const level = parseInt(laborData.injuryLevel);
    
    if (!monthlySalary || !level) return;

    // 一次性伤残补助金 (月工资 × 系数)
    const coefficients = [27, 25, 23, 21, 18, 16, 13, 11, 9, 7];
    const subsidy = monthlySalary * coefficients[level - 1];

    // 停工留薪期工资 (按实际月工资计算，这里简化)
    const retainSalary = monthlySalary * 3; // 假设3个月

    // 医疗补助金和就业补助金 (5级以下)
    let medicalAllowance = 0;
    let employmentAllowance = 0;
    if (level <= 5) {
      medicalAllowance = monthlySalary * 18;
      employmentAllowance = monthlySalary * 50;
    } else if (level <= 6) {
      medicalAllowance = monthlySalary * 16;
      employmentAllowance = monthlySalary * 40;
    } else if (level <= 7) {
      medicalAllowance = monthlySalary * 14;
      employmentAllowance = monthlySalary * 25;
    } else if (level <= 8) {
      medicalAllowance = monthlySalary * 12;
      employmentAllowance = monthlySalary * 15;
    } else if (level <= 9) {
      medicalAllowance = monthlySalary * 10;
      employmentAllowance = monthlySalary * 10;
    } else if (level <= 10) {
      medicalAllowance = monthlySalary * 8;
      employmentAllowance = monthlySalary * 7;
    }

    const total = subsidy + retainSalary + medicalAllowance + employmentAllowance;
    
    setLaborResult({
      subsidy: subsidy.toFixed(2),
      retainSalary: retainSalary.toFixed(2),
      medicalAllowance: medicalAllowance.toFixed(2),
      employmentAllowance: employmentAllowance.toFixed(2),
      total: total.toFixed(2),
      monthlySalary,
      level,
    });
  };

  // 计算诉讼费
  const calculateLawsuitFee = () => {
    const amount = parseFloat(lawsuitData.claimAmount);
    if (!amount) return;

    let fee = 0;
    
    if (amount <= 10000) {
      fee = 50;
    } else if (amount <= 100000) {
      fee = amount * 0.025 - 200;
    } else if (amount <= 200000) {
      fee = amount * 0.02 + 300;
    } else if (amount <= 500000) {
      fee = amount * 0.015 + 1300;
    } else if (amount <= 1000000) {
      fee = amount * 0.01 + 3800;
    } else if (amount <= 2000000) {
      fee = amount * 0.009 + 8800;
    } else {
      fee = amount * 0.008 + 13800;
    }

    setLawsuitResult(Math.max(fee, 50));
  };

  const tabs = [
    { id: 'labor', label: '工伤赔偿', icon: Scale },
    { id: 'traffic', label: '交通事故', icon: FileText },
    { id: 'medical', label: '医疗事故', icon: FileText },
    { id: 'lawsuit', label: '诉讼费', icon: Calculator },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">法律计算器</h3>
            <p className="text-sm text-gray-500">快速计算赔偿金额、诉讼费用等</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {/* 工伤赔偿计算器 */}
        {activeTab === 'labor' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                月工资 (元)
              </label>
              <input
                type="number"
                value={laborData.salary}
                onChange={(e) => setLaborData({ ...laborData, salary: e.target.value })}
                placeholder="例如: 8000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                伤残等级 (1-10级)
              </label>
              <select
                value={laborData.injuryLevel}
                onChange={(e) => setLaborData({ ...laborData, injuryLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <option key={level} value={level}>
                    {level}级伤残
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年龄 (岁)
              </label>
              <input
                type="number"
                value={laborData.age}
                onChange={(e) => setLaborData({ ...laborData, age: e.target.value })}
                placeholder="例如: 35"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                是否保留劳动关系
              </label>
              <button
                onClick={() => setLaborData({ ...laborData, keepWorking: !laborData.keepWorking })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  laborData.keepWorking ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform"
                  style={{
                    left: laborData.keepWorking ? '0.5' : '0.5',
                    transform: laborData.keepWorking ? 'translateX(20px)' : 'translateX(0)',
                  }}
                />
              </button>
            </div>

            <button
              onClick={calculateLaborCompensation}
              className="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              计算赔偿
            </button>

            {laborResult && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">计算结果</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">一次性伤残补助金：</span>
                    <span className="font-mono">¥{laborResult.subsidy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">停工留薪期工资：</span>
                    <span className="font-mono">¥{laborResult.retainSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">工伤医疗补助金：</span>
                    <span className="font-mono">¥{laborResult.medicalAllowance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">伤残就业补助金：</span>
                    <span className="font-mono">¥{laborResult.employmentAllowance}</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-2 flex justify-between font-bold text-green-900">
                    <span>总计：</span>
                    <span className="text-lg">¥{laborResult.total}</span>
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-3">
                  * 以上计算基于《工伤保险条例》，仅供参考。具体金额以社保部门核算为准。
                </p>
              </div>
            )}
          </div>
        )}

        {/* 诉讼费计算器 */}
        {activeTab === 'lawsuit' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                诉讼请求金额 (元)
              </label>
              <input
                type="number"
                value={lawsuitData.claimAmount}
                onChange={(e) => setLawsuitData({ ...lawsuitData, claimAmount: e.target.value })}
                placeholder="例如: 100000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                案件类型
              </label>
              <select
                value={lawsuitData.caseType}
                onChange={(e) => setLawsuitData({ ...lawsuitData, caseType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="civil">民事案件</option>
                <option value="commercial">商事案件</option>
                <option value="administrative">行政案件</option>
              </select>
            </div>

            <button
              onClick={calculateLawsuitFee}
              className="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              计算费用
            </button>

            {lawsuitResult > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">预估诉讼费</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ¥{lawsuitResult.toFixed(2)}
                </div>
                <p className="text-xs text-blue-700">
                  * 根据《诉讼费用交纳办法》计算，最终费用以法院核定为准。财产案件按标的额比例收费，非财产案件按件收费。
                </p>
              </div>
            )}
          </div>
        )}

        {/* 交通事故和医疗事故计算器 - 占位 */}
        {(activeTab === 'traffic' || activeTab === 'medical') && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium mb-2">功能开发中...</p>
            <p className="text-sm">即将支持交通事故赔偿、医疗事故赔偿计算</p>
          </div>
        )}
      </div>
    </div>
  );
}
