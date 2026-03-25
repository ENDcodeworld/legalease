#!/usr/bin/env python3
"""
LegalEase - 法律数据下载脚本
功能：从官方来源下载最新的法律法规和案例
"""

import requests
import json
import os
from pathlib import Path
import time

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data" / "raw"
LAWS_DIR = DATA_DIR / "laws"
CASES_DIR = DATA_DIR / "cases"

LAWS_DIR.mkdir(parents=True, exist_ok=True)
CASES_DIR.mkdir(parents=True, exist_ok=True)

def download_laws():
    """下载法律法规"""
    print("📚 正在下载法律法规...")
    
    # 这里应该实现真实的下载逻辑
    # 由于官方网站需要特殊处理，这里提供示例数据结构
    
    sample_laws = [
        {
            "id": "civil_code",
            "title": "中华人民共和国民法典",
            "category": "民事",
            "pub_date": "2020-05-28",
            "effective_date": "2021-01-01",
            "source": "全国人民代表大会",
            "source_url": "http://www.npc.gov.cn/npc/c30834/202012/9f0a3e3e3e3e4e3e3e3e3e3e3e3e3e3.shtml",
            "chapters": []
        },
        {
            "id": "labor_law",
            "title": "中华人民共和国劳动法",
            "category": "劳动",
            "pub_date": "2009-08-27",
            "effective_date": "2011-07-01",
            "source": "全国人民代表大会常务委员会",
            "source_url": "http://www.npc.gov.cn",
            "chapters": []
        },
        {
            "id": "contract_law",
            "title": "中华人民共和国合同法",
            "category": "民事",
            "pub_date": "1999-03-15",
            "effective_date": "1999-10-01",
            "source": "全国人民代表大会",
            "source_url": "http://www.npc.gov.cn",
            "chapters": []
        }
    ]
    
    # 注意：实际项目中应该从官方网站API或公开数据源获取
    # 示例：全国人大 API、司法部数据开放平台等
    
    for law in sample_laws:
        filepath = LAWS_DIR / f"{law['id']}.json"
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(law, f, ensure_ascii=False, indent=2)
        print(f"  ✅ {law['title']}")
    
    print(f"✅ 法律法规下载完成（共 {len(sample_laws)} 部）")
    print("⚠️  注意：当前为示例数据，请参考 data/README.md 了解如何获取完整数据")

def download_cases():
    """下载典型案例"""
    print("📖 正在下载案例...")
    
    # 中国裁判文书网有大量公开案例
    # 注意：实际爬取需要遵守robots.txt，考虑使用官方API（如有）
    
    sample_cases = [
        {
            "id": "case_001",
            "case_no": "（2023）京0105民初12345号",
            "title": "张某诉李某民间借贷纠纷案",
            "court": "北京市朝阳区人民法院",
            "date": "2023-10-15",
            "cause": "民间借贷纠纷",
            "type": "民事",
            "judgment_result": "被告李某于本判决生效之日起十日内归还原告张某借款本金人民币50000元及利息...",
            "facts": "原告张某诉称：2021年12月，被告李某因资金周转需要向原告借款50000元...",
            "legal_basis": [],
            "keywords": ["民间借贷", "借款期限", "逾期利息"],
            "source_url": "https://wenshu.court.gov.cn/..."
        },
        {
            "id": "case_002",
            "case_no": "（2023）沪0106民初4567号",
            "title": "王某诉上海某公司劳动争议案",
            "court": "上海市静安区人民法院",
            "date": "2023-09-20",
            "cause": "劳动争议",
            "type": "民事",
            "judgment_result": "一、被告支付原告拖欠工资人民币35,000元...",
            "facts": "原告王某于2022年3月1日入职被告公司，担任销售经理...",
            "legal_basis": [],
            "keywords": ["未签劳动合同", "双倍工资", "拖欠工资"],
            "source_url": "https://wenshu.court.gov.cn/..."
        },
        {
            "id": "case_003",
            "case_no": "（2023）粤0304民初7890号",
            "title": "李某诉张某交通事故人身损害赔偿案",
            "court": "广东省深圳市福田区人民法院",
            "date": "2023-11-15",
            "cause": "交通事故责任纠纷",
            "type": "民事",
            "judgment_result": "一、被告张某赔偿原告李某医疗费45,000元...",
            "facts": "2022年10月15日，被告张某驾驶小轿车...",
            "legal_basis": [],
            "keywords": ["交通事故", "人身损害赔偿", "医疗费"],
            "source_url": "https://wenshu.court.gov.cn/..."
        }
    ]
    
    for case in sample_cases:
        filepath = CASES_DIR / f"{case['id']}.json"
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(case, f, ensure_ascii=False, indent=2)
        print(f"  ✅ {case['title']}")
    
    print(f"✅ 案例下载完成（共 {len(sample_cases)} 个）")
    print("💡 提示：完整案例集可以从中国裁判文书网批量获取")

def main():
    print("🚀 LegalEase 数据下载器\n")
    print("=" * 50)
    
    download_laws()
    print()
    
    download_cases()
    
    print("\n" + "=" * 50)
    print("✨ 数据下载完成！")
    print(f"📁 数据保存在: {DATA_DIR}")
    print("\n📋 后续步骤：")
    print("  1. 运行 npm run data:process 处理数据")
    print("  2. 配置 OPENAI_API_KEY")
    print("  3. 运行 npm run data:embed 生成向量")
    print("\n⚠️  重要：")
    print("   - 当前数据为示例，实际使用需补充完整法律数据库")
    print("   - 案例数据应从裁判文书网官方渠道获取")
    print("   - 定期更新数据以保持法律时效性")

if __name__ == "__main__":
    main()
