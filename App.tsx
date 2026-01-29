
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  PhoneCall,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  GanttChartSquare,
  Scale,
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Save,
  Trash2,
  Eye,
  Search,
  BookOpen,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  Smartphone,
  TrendingUp,
  Wallet,
  HandCoins,
  BadgePercent,
  Landmark,
  UserCheck,
  Target,
  Zap,
  Quote,
  List,
  MessageCircleQuestion,
  CreditCard,
  Coins,
  Ticket,
  Gamepad2
} from 'lucide-react';

// --- Security ---
const ALLOWED_IP = '115.144.74.99';

// --- Types ---
interface BlogPost {
  id: number;
  title: string;
  category: '금융/재테크' | '대출꿀팁' | '투자/주식' | '복지/정책' | '생활꿀팁';
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  readTime: string;
  author: string;
  tags: string[];
}

type ViewState = 'home' | 'blog' | 'blog-detail' | 'admin';

// --- Data Generator (High-Quality Content Engine) ---
const generateFullContent = (): BlogPost[] => {
  const categories: BlogPost['category'][] = ['금융/재테크', '대출꿀팁', '투자/주식', '복지/정책', '생활꿀팁'];
  
  // Topic Database Update
  const topicDatabase = {
    '금융/재테크': [
      "소액결제 현금화 및 신용카드 현금화 안전 이용 가이드",
      "상품권 현금화 수수료 비교 및 가장 싼 곳 찾는 법",
      "정보이용료(콘텐츠이용료) 현금화와 소액결제의 차이점",
      "신용카드 잔여 한도 대출(카드깡)의 위험성과 합법적 대안",
      "휴대폰 소액결제 정책 미납 뚫는 방법의 진실",
      "구글 기프트카드 현금화 사기 유형 BEST 5",
      "컬쳐랜드/해피머니 상품권 매입 시세표 실시간 확인",
      "모바일 티머니/캐시비 교통카드 잔액 현금 환불 꿀팁",
      "급전 마련: 전당포 vs IT 전당포 vs 소액결제 비교",
      "아이폰 휴대폰 결제 차단 해제 및 한도 상향법",
      "SKT/KT/LG U+ 통신사별 소액결제 차단 및 해지 방법",
      "신용카드 포인트 현금화: 숨은 돈 100% 찾는 법",
      "페이코/네이버페이 포인트 현금화 루트 총정리",
      "중고나라/당근마켓 안전결제 사기 피하는 법",
      "통신 연체자 휴대폰 개통 및 소액결제 가능 여부",
      "비트코인 결제 가능한 가맹점 및 현금화 ATM 위치",
      "해외 결제 가능한 선불카드 발급 및 사용법",
      "지역화폐(서울사랑상품권) 구매 및 현금 영수증 처리",
      "앱테크 추천: 걷기만 해도 돈이 쌓이는 만보기 어플",
      "설문조사 알바 사이트 수익 인증 및 현금 출금 후기"
    ],
    '대출꿀팁': [
      "무직자 비상금 대출 승인율 99% 높이는 실전 전략",
      "정부지원 햇살론15 vs 최저신용자 특례보증 자격 비교",
      "1금융권 신용대출 금리 비교 및 최저 금리 받는 법",
      "기대출 과다자가 추가 대출 받는 현실적인 방법 3가지",
      "전세자금대출 거절 사유 1위 분석과 해결 가이드",
      "신용점수 500점대, 600점대 현실적인 자금 마련 루트",
      "대출 중개 플랫폼 이용 시 절대 속으면 안 되는 사기 유형",
      "금리인하요구권: 은행에 이자 깎아달라고 당당히 말하는 법",
      "학자금 대출 생활비 대출 신청 기간 및 조건 완벽 정리",
      "주택담보대출 LTV, DTI, DSR 용어 완벽 해설과 계산법",
      "신용카드 소지자 대출(카드론) vs 현금서비스 신용등급 영향",
      "자동차 담보 대출(오토론) 무입고 진행 시 주의사항",
      "개인회생 중 대출 가능할까? 인가 후 대출 상품 정리",
      "P2P 대출 투자의 위험성과 차입자 입장에서의 장단점",
      "대환대출 플랫폼 이용 가이드: 고금리에서 저금리로 갈아타기",
      "마이너스 통장 개설 조건 및 이자 계산 방식의 비밀",
      "청년 전용 버팀목 전세자금대출 HUG vs HF 보증 차이",
      "사업자 대출 시 소상공인 진흥공단 정책 자금 활용법",
      "불법 사채(개인돈) 이용 시 겪게 되는 실제 피해 사례",
      "채무조정 제도: 신용회복위원회 프리워크아웃 신청 자격"
    ],
    '투자/주식': [
      "월 100만원 배당금 받기 위한 미국 배당주 포트폴리오",
      "ISA 계좌(개인종합자산관리계좌) 만기 해지 전략 및 세금 혜택",
      "공모주 청약 균등배정 vs 비례배정 수익률 극대화 비법",
      "미국 주식 양도소득세 250만원 공제 활용 절세 노하우",
      "ETF 투자로 연금저축펀드 수익률 연 10% 달성하기",
      "비트코인 반감기 이후 가상자산 시장 전망과 투자 원칙",
      "금리 인하 시기 채권 투자 전략: 장기채 vs 단기채 선택",
      "주식 차트 보는 법: 이동평균선과 골든크로스 실전 매매",
      "부동산 리츠(REITs) 투자로 1만원으로 건물주 되는 법",
      "엔저 현상 활용 엔화 투자(환테크) 및 환차익 실현 타이밍",
      "달러 예금 vs 달러 RP: 안전하게 달러 불리는 방법",
      "ELS(주가연계증권) 낙인(Knock-In) 위험성과 수익 구조",
      "워렌 버핏의 가치 투자 철학: 저평가 우량주 찾는 법",
      "금(Gold) 투자 방법 비교: KRX 금시장 vs 골드바 구매",
      "STO(토큰 증권) 시대 개막: 조각 투자의 미래와 기회",
      "IRP(개인형 퇴직연금) 계좌 개설 및 세액공제 한도 꽉 채우기",
      "CMA 통장 금리 비교: 파킹통장으로 월급 관리하는 법",
      "로보어드바이저 투자 장단점 및 추천 서비스 비교",
      "나스닥 QQQ vs S&P500 SPY: 장기 적립식 투자 승자는?",
      "재무제표 보는 법: PER, PBR, ROE 핵심 지표 3분 정리"
    ],
    '복지/정책': [
      "2024년 근로장려금 정기/반기 신청 자격 및 지급일 조회",
      "청년도약계좌 vs 청년희망적금 환승 및 중도해지 유불리 분석",
      "부모급여(영아수당) 100만원 인상 소식 및 소급 적용 여부",
      "경기도 청년기본소득 분기별 신청 방법 및 사용처 안내",
      "국민취업지원제도 1유형 vs 2유형 구직촉진수당 차이점",
      "내 집 마련 디딤돌 대출 소득 요건 완화와 신혼부부 혜택",
      "에너지 바우처 신청 자격 및 여름/겨울 지원 금액 총정리",
      "기초생활수급자 생계급여 선정 기준 및 탈락 사유 분석",
      "K-패스(구 알뜰교통카드) 교통비 최대 53% 환급 받는 방법",
      "서울시 청년 월세 지원금 월 20만원 신청 가이드",
      "임산부 친환경 농산물 꾸러미 신청 및 바우처 사용법",
      "첫만남이용권 국민행복카드 바우처 신청 및 사용처",
      "고효율 가전제품 구매비용 10% 환급 신청 사이트",
      "청년 내일채움공제 폐지? 현존하는 중소기업 청년 혜택",
      "실업급여 수급 조건 및 구직 활동 인정 범위 (2024 개정)",
      "평생교육바우처 신청 자격 및 연 35만원 카드 발급",
      "노인 기초연금 수급 자격 및 모의 계산 (소득인정액)",
      "다자녀 가구 혜택: 전기요금 감면부터 자동차 취등록세 면제",
      "국민내일배움카드 발급 자격 및 국비지원 교육 신청",
      "주거급여 신청 자격 및 1인 가구 월세 지원 금액"
    ],
    '생활꿀팁': [
      "잠자는 카드 포인트 통합 조회하고 계좌로 현금 입금 받기",
      "알뜰폰 요금제 0원 요금제 비교 및 번호이동 셀프 개통",
      "자동차세 연납 신청으로 5% 세금 즉시 할인 받는 법",
      "연말정산 13월의 월급 만들기: 신용카드 vs 체크카드 황금비율",
      "전기요금 폭탄 피하는 에어컨 제습 모드의 진실과 오해",
      "폐가전 제품 무상 수거 서비스(순환거버넌스) 이용 방법",
      "해외여행 환전 수수료 0원 카드(트래블로그/월렛) 비교",
      "실비 보험 청구 서류 간소화 및 1만원 미만 소액 청구 팁",
      "스팸 전화/문자 완벽 차단하는 '두낫콜' 서비스 활용법",
      "대형 폐기물 스티커 가격표 및 편의점/인터넷 구매 방법",
      "여권 재발급 온라인 신청 방법 및 소요 기간 (정부24)",
      "운전면허증 갱신 기간 초과 시 과태료 및 인터넷 접수",
      "착한운전 마일리지 신청하고 벌점 감경 받는 꿀팁",
      "탄소중립포인트 가입하고 현금 인센티브 받는 방법",
      "유튜브 프리미엄 우회 없이 싸게 이용하는 통신사 제휴",
      "넷플릭스 계정 공유 금지 대처법 및 요금제 비교",
      "카카오톡 멀티프로필 설정 방법 및 확인하는 법",
      "주정차 위반 과태료 조회 및 사전 납부 감경 혜택",
      "건강검진 대상자 조회 및 안 받으면 과태료 얼마?",
      "쓰레기 무단 투기 신고 포상금 및 벌금 기준"
    ]
  };

  // Expanded Image Pool for Uniqueness (Avoids Duplicate Content Penalty)
  const categoryImageIds = {
    '금융/재테크': [
      "1563013544-824ae1b704d3", "1580519542036-c47de6196ba5", "1556742049-0cfed4f7a07d", 
      "1601597111158-2fceff292b5c", "1579621970563-ebec7560ff3e", "1620712943543-0a3f17b44502"
    ],
    '대출꿀팁': [
      "1554224155-6726b3ff858f", "1579621970792-282f23331c40", "1565514020179-0222d7b2801e",
      "1450101499163-c8848c66ca85", "1526304640581-d334cdbbf45e", "1642543491804-00d3d57d5943"
    ],
    '투자/주식': [
      "1611974714024-4607a55d46ed", "1590283603385-17ffb3a7f29f", "1642543491804-00d3d57d5943",
      "1612178925255-25e2a640cae8", "1621261263792-710e2f5b6f00", "1518183214570-e64687985790"
    ],
    '복지/정책': [
      "1450101499163-c8848c66ca85", "1517048676732-d65bc937f952", "1532622785990-d2c36a76f5a6",
      "1454165804606-c3d57bc86b40", "1529156069898-49953e39b3ac", "1486406140526-aba804f60986"
    ],
    '생활꿀팁': [
      "1526304640581-d334cdbbf45e", "1532622785990-d2c36a76f5a6", "1434030216411-0b793f4b4173",
      "1516321318423-f06f85e504b3", "1496065187959-7f07b8353c55", "1504384308090-c54beed199c8"
    ]
  };

  const allPosts: BlogPost[] = [];
  let idCounter = 1;

  categories.forEach((category) => {
    const topics = topicDatabase[category];
    topics.forEach((title, index) => {
      // Pick a unique image from the pool based on index
      const imagePool = categoryImageIds[category];
      const imageId = imagePool[index % imagePool.length];
      const imageUrl = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=1200`;

      const currentId = idCounter++;
      
      // 1번 게시글: 소액결제/신용카드 현금화 (Ultra SEO Optimized)
      if (currentId === 1) {
        allPosts.push({
          id: currentId,
          title: "소액결제 현금화 및 신용카드 현금화: 안전한 비상금 마련 루트와 주의사항 (2024 필독)",
          category: '금융/재테크',
          date: '2024-05-30',
          readTime: '12분',
          author: '금융전략팀 김안심',
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200", 
          tags: ['소액결제현금화', '신용카드현금화', '비상금', '상품권매입', '안전업체'],
          summary: "급전이 필요할 때 찾는 소액결제 및 신용카드 현금화 서비스. 티켓, 상품권 매입 방식의 차이부터 정식 등록 업체 확인법, 수수료 절약 꿀팁까지 금융 전문가가 분석한 안전 이용 수칙을 공개합니다.",
          content: `
            <div class="space-y-10 text-slate-800">
              <!-- Intro -->
              <div class="border-b border-slate-200 pb-8">
                <span class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4">금융/재테크 베스트</span>
                <h1 class="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-6 leading-snug">소액결제 현금화 vs 신용카드 현금화<br/>안전하게 비상금 마련하는 법</h1>
                <p class="text-lg text-slate-600 leading-relaxed font-medium">
                  월세, 통신비, 병원비 등 급하게 현금이 필요할 때, 복잡한 대출 심사 없이 이용 가능한 <strong>'소액결제 현금화'</strong>와 <strong>'신용카드 현금화'</strong>가 주목받고 있습니다. 
                  하지만 이를 악용한 불법 업체나 과도한 수수료 피해 사례도 늘고 있습니다. 본 가이드에서는 <strong>안전한 현금화 루트</strong>와 <strong>정식 업체 구별법</strong>을 명확히 제시합니다.
                </p>
              </div>

              <!-- TOC -->
              <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <span class="text-blue-600">●</span> CONTENTS
                </h4>
                <ul class="space-y-3 text-sm font-bold text-slate-600">
                  <li class="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">1</span>
                    소액결제 현금화란? (방식과 한도)
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">2</span>
                    신용카드 현금화의 종류 (상품권 vs 타인 결제)
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">3</span>
                    수수료 비교 및 정식 업체 확인 체크리스트
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">4</span>
                    자주 묻는 질문 (정책, 미납 시 이용 가능 여부)
                  </li>
                </ul>
              </div>

              <!-- Section 1 -->
              <div>
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                  01. 소액결제 현금화의 이해
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                  소액결제 현금화란 SKT, KT, LG U+ 등 통신사에서 제공하는 <strong>휴대폰 소액결제 한도(최대 100만원)</strong>를 이용하여 모바일 상품권이나 정보이용료(콘텐츠 이용료)를 결제한 후, 이를 매입 업체에 판매하여 현금을 확보하는 방식입니다.
                </p>
                
                <div class="grid md:grid-cols-2 gap-4 mb-8">
                  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Smartphone class="text-blue-600 w-5 h-5" /></div>
                    <h3 class="font-bold text-slate-900 text-lg mb-2">통신사 소액결제</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                      컬쳐랜드, 해피머니 등 모바일 문화상품권을 구매하여 판매하는 방식입니다. 수수료가 비교적 낮고(10~20% 내외) 진행 속도가 빠릅니다.
                    </p>
                  </div>
                  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Zap class="text-indigo-600 w-5 h-5" /></div>
                    <h3 class="font-bold text-slate-900 text-lg mb-2">정보이용료(콘텐츠이용료)</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                      구글 플레이스토어, 원스토어 등에서 게임 아이템이나 재화를 결제하여 판매하는 방식입니다. 소액결제가 차단되었을 때 대안으로 사용되지만 수수료가 높습니다.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Section 2 -->
              <div class="mt-16">
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                  02. 신용카드 현금화 주의사항
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                  신용카드 현금화(카드깡)는 신용카드의 잔여 한도를 이용해 물품을 허위로 구매하거나 상품권을 구매해 현금을 융통하는 행위입니다. 
                  금융법 위반 소지가 있으므로 반드시 <strong>합법적인 테두리(상품권 구매 후 개인 간 거래 등)</strong> 안에서 이루어져야 합니다.
                </p>
                <div class="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-row gap-4 items-start">
                   <div class="flex-shrink-0 mt-1">
                      <AlertTriangle class="text-red-500 w-6 h-6" />
                   </div>
                   <div>
                      <strong class="block text-red-700 mb-2 text-lg">⚠️ 불법 카드깡 경고</strong>
                      <p class="text-red-800/80 text-sm leading-relaxed">
                        실물 거래 없이 카드를 결제하고 수수료를 뗀 현금을 받는 행위는 '여신전문금융업법' 위반입니다. 
                        적발 시 금융질서 문란자로 등재되어 <strong>최대 7년간 모든 금융 거래가 정지</strong>될 수 있습니다. 
                        안심 가이드에서는 합법적인 상품권 매매 방식만을 안내합니다.
                      </p>
                   </div>
                </div>
              </div>

              <!-- Section 3: Comparison Table -->
              <div class="mt-16">
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                  03. 안전한 업체 선정 기준 (필독)
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                  수많은 업체 중 '먹튀' 없는 안전한 곳을 찾으려면 다음 3가지 기준을 반드시 확인해야 합니다.
                </p>

                <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                  <table class="w-full text-left text-sm text-slate-600">
                    <thead class="bg-slate-900 text-white">
                      <tr>
                        <th class="p-4 font-bold">확인 항목</th>
                        <th class="p-4 font-bold">정식 안전 업체</th>
                        <th class="p-4 font-bold bg-red-500/90">불법 사기 업체</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td class="p-4 font-bold text-slate-900">사업자 등록</td>
                        <td class="p-4 text-blue-600 font-bold">국세청 조회 가능 (정식 등록)</td>
                        <td class="p-4">미등록 또는 타인 명의</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900">상담 방식</td>
                        <td class="p-4">유선 전화, 홈페이지, 카톡 채널</td>
                        <td class="p-4">텔레그램, 개인 카톡만 고집</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900">입금 시간</td>
                        <td class="p-4">3분~5분 이내 즉시 입금</td>
                        <td class="p-4">전산 오류 핑계로 지연 후 잠적</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900">요구 서류</td>
                        <td class="p-4">본인 확인 최소 절차</td>
                        <td class="p-4">비밀번호, 등본 등 과도한 정보 요구</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Section 4 -->
              <div class="mt-16">
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                  04. 자주 묻는 질문 (FAQ)
                </h2>
                <div class="space-y-4">
                  <details class="group bg-slate-50 p-5 rounded-2xl cursor-pointer border border-transparent hover:border-blue-200 transition open:bg-white open:shadow-md">
                    <summary class="flex justify-between items-center font-bold text-slate-800 list-none text-lg">
                      <span>Q. 휴대폰 미납 상태인데 소액결제 현금화가 가능한가요?</span>
                      <span class="transition group-open:rotate-180 text-blue-600">▼</span>
                    </summary>
                    <p class="text-slate-600 mt-4 leading-relaxed pl-4 border-l-2 border-slate-200 text-sm">
                      통신사 정책에 따라 다르지만, 단순 미납(정책 불가) 상태라도 이용 가능한 <strong>'정책 뚫기' 노하우</strong>를 가진 정식 업체들이 있습니다. 
                      단, 장기 연체로 발신 정지 상태라면 이용이 제한될 수 있으니 전문 상담원에게 가능 여부를 조회해보는 것이 좋습니다.
                    </p>
                  </details>
                  <details class="group bg-slate-50 p-5 rounded-2xl cursor-pointer border border-transparent hover:border-blue-200 transition open:bg-white open:shadow-md">
                    <summary class="flex justify-between items-center font-bold text-slate-800 list-none text-lg">
                      <span>Q. 현금화 수수료는 보통 얼마인가요?</span>
                      <span class="transition group-open:rotate-180 text-blue-600">▼</span>
                    </summary>
                    <p class="text-slate-600 mt-4 leading-relaxed pl-4 border-l-2 border-slate-200 text-sm">
                      업체마다, 그리고 월말/월초 시세에 따라 다릅니다. 보통 <strong>상품권류는 80~90%</strong> 정도 매입하며, <strong>정보이용료는 60~70%</strong> 선에서 형성됩니다. 
                      터무니없이 높은 금액(95% 이상)을 준다는 곳은 개인 정보를 노리는 사기일 확률이 높으니 주의하세요.
                    </p>
                  </details>
                  <details class="group bg-slate-50 p-5 rounded-2xl cursor-pointer border border-transparent hover:border-blue-200 transition open:bg-white open:shadow-md">
                    <summary class="flex justify-between items-center font-bold text-slate-800 list-none text-lg">
                      <span>Q. 24시간 언제든 가능한가요?</span>
                      <span class="transition group-open:rotate-180 text-blue-600">▼</span>
                    </summary>
                    <p class="text-slate-600 mt-4 leading-relaxed pl-4 border-l-2 border-slate-200 text-sm">
                      네, 대부분의 메이저 업체들은 365일 24시간 자동화 시스템이나 당직 상담원을 운영하여 새벽에도 즉시 입금이 가능합니다. 급한 비상금이 필요할 때 유용하게 활용할 수 있습니다.
                    </p>
                  </details>
                </div>
              </div>

              <!-- Conclusion -->
              <div class="mt-16 pt-8 border-t border-slate-200 text-center bg-blue-50/50 rounded-3xl p-8">
                <p class="text-xl font-black text-slate-900 mb-4">
                  "급할수록 돌아가라"는 말이 있습니다.<br/>검증된 정식 업체에서 안전하게 거래하세요.
                </p>
                <p class="text-slate-500 mb-8 text-sm">
                  Safe Pay Guide는 수년간의 빅데이터를 통해 검증된 안전 업체 정보만을 제공합니다.
                </p>
                <button class="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center gap-3 mx-auto">
                   <PhoneCall class="w-5 h-5" /> 무료 실시간 한도 조회 및 상담
                </button>
              </div>
            </div>
          `
        });
        return; // End of Post 1
      }
      
      // 2번 게시글: 상품권 현금화 (Ultra SEO Optimized)
      if (currentId === 2) {
        allPosts.push({
          id: currentId,
          title: "상품권 현금화 수수료 비교: 컬쳐랜드/해피머니 90% 매입의 진실과 안전 거래법",
          category: '금융/재테크',
          date: '2024-06-02',
          readTime: '8분',
          author: '금융전략팀 김안심',
          imageUrl: "https://images.unsplash.com/photo-1628151016020-00d3d57d5943?auto=format&fit=crop&q=80&w=1200", // Gift card/voucher related
          tags: ['상품권현금화', '컬쳐랜드', '해피머니', '북앤라이프', '구글기프트카드'],
          summary: "컬쳐랜드, 해피머니, 북앤라이프 등 모바일 상품권 현금화 시세와 수수료 구조를 완벽 분석합니다. '수수료 5%' 광고의 함정과 정식 사업자 인증 업체를 통한 안전한 현금 교환 방법을 알아보세요.",
          content: `
            <div class="space-y-10 text-slate-800">
              <!-- Intro -->
              <div class="border-b border-slate-200 pb-8">
                <span class="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-4">금융/재테크 추천</span>
                <h1 class="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-6 leading-snug">상품권 현금화 수수료의 모든 것<br/>컬쳐랜드·해피머니 90% 매입 가능할까?</h1>
                <p class="text-lg text-slate-600 leading-relaxed font-medium">
                  많은 분들이 선물 받은 상품권이나 소액결제로 구매한 <strong>컬쳐랜드, 해피머니 상품권</strong>을 현금으로 교환하기 위해 매입처를 찾습니다. 
                  하지만 업체마다 수수료가 천차만별이고, 사기 피해도 빈번합니다. 본 글에서는 <strong>상품권별 평균 매입 시세</strong>와 <strong>안전한 거래 방법</strong>을 정리해 드립니다.
                </p>
              </div>

              <!-- TOC -->
              <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <span class="text-indigo-600">●</span> CONTENTS
                </h4>
                <ul class="space-y-3 text-sm font-bold text-slate-600">
                  <li class="flex items-center gap-3 cursor-pointer hover:text-indigo-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">1</span>
                    상품권 종류별 평균 매입 수수료 (시세표)
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-indigo-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">2</span>
                    '매입가 95%?' 과장 광고와 사기 수법 주의
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-indigo-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">3</span>
                    상품권 현금화 진행 절차 (PIN 번호 전송)
                  </li>
                </ul>
              </div>

              <!-- Section 1: Rate Table -->
              <div>
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
                  01. 상품권 현금화 매입 시세표 (평균)
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                  상품권 현금화 수수료는 <strong>시장의 수요와 공급</strong>, 그리고 <strong>월말/월초 시점</strong>에 따라 변동됩니다. 아래는 일반적인 정식 업체들의 평균 매입 시세입니다.
                </p>
                
                <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-lg mb-8">
                  <table class="w-full text-left text-sm text-slate-600">
                    <thead class="bg-slate-900 text-white">
                      <tr>
                        <th class="p-4 font-bold">상품권 종류</th>
                        <th class="p-4 font-bold">평균 매입가 (현금 지급률)</th>
                        <th class="p-4 font-bold hidden md:table-cell">비고</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td class="p-4 font-bold text-slate-900 flex items-center gap-2">
                           <div class="w-2 h-2 bg-orange-500 rounded-full"></div> 컬쳐랜드 (문화상품권)
                        </td>
                        <td class="p-4 text-red-600 font-bold">85% ~ 90%</td>
                        <td class="p-4 hidden md:table-cell text-xs text-slate-500">가장 거래량이 많고 시세가 안정적</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900 flex items-center gap-2">
                           <div class="w-2 h-2 bg-yellow-400 rounded-full"></div> 해피머니 상품권
                        </td>
                        <td class="p-4 text-red-600 font-bold">85% ~ 90%</td>
                        <td class="p-4 hidden md:table-cell text-xs text-slate-500">사용처가 다양하여 인기 높음</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900 flex items-center gap-2">
                           <div class="w-2 h-2 bg-pink-500 rounded-full"></div> 북앤라이프 (도서)
                        </td>
                        <td class="p-4 text-slate-600 font-bold">80% ~ 85%</td>
                        <td class="p-4 hidden md:table-cell text-xs text-slate-500">컬쳐랜드/해피머니 대비 소폭 낮음</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900 flex items-center gap-2">
                           <div class="w-2 h-2 bg-green-500 rounded-full"></div> 구글 기프트코드
                        </td>
                        <td class="p-4 text-slate-600 font-bold">70% ~ 80%</td>
                        <td class="p-4 hidden md:table-cell text-xs text-slate-500">정보이용료 기반, 수수료가 높음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p class="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                  ※ 위 시세는 시장 상황에 따라 실시간으로 1~2% 정도 차이가 발생할 수 있습니다. 정확한 금액은 반드시 상담을 통해 확인하세요.
                </p>
              </div>

              <!-- Section 2: Scam Alert -->
              <div class="mt-16">
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
                  02. "수수료 5%? 95% 매입?" 사기 주의보
                </h2>
                <div class="grid md:grid-cols-2 gap-6">
                   <div class="bg-red-50 p-6 rounded-3xl border border-red-100">
                      <h3 class="font-bold text-red-700 mb-4 flex items-center gap-2">
                         <AlertTriangle class="w-5 h-5 flex-shrink-0" /> 전형적인 사기 패턴
                      </h3>
                      <ul class="space-y-3 text-sm text-red-900/80">
                         <li class="flex gap-2">
                            <span class="font-bold text-red-600">1.</span> 타 업체보다 터무니없이 높은 가격(95% 이상) 제시
                         </li>
                         <li class="flex gap-2">
                            <span class="font-bold text-red-600">2.</span> 카카오톡 프로필이 자주 바뀌거나 신생 계정
                         </li>
                         <li class="flex gap-2">
                            <span class="font-bold text-red-600">3.</span> PIN 번호만 먼저 받고 입금을 미루며 잠적
                         </li>
                      </ul>
                   </div>
                   <div class="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                      <h3 class="font-bold text-blue-700 mb-4 flex items-center gap-2">
                         <ShieldCheck class="w-5 h-5 flex-shrink-0" /> 안전 거래 팁
                      </h3>
                       <ul class="space-y-3 text-sm text-blue-900/80">
                         <li class="flex gap-2">
                            <span class="font-bold text-blue-600">1.</span> 평균 시세(85~90%)를 준수하는 업체 선택
                         </li>
                         <li class="flex gap-2">
                            <span class="font-bold text-blue-600">2.</span> 홈페이지에 사업자 번호가 명시된 정식 업체
                         </li>
                         <li class="flex gap-2">
                            <span class="font-bold text-blue-600">3.</span> '더치트' 등 사기 이력 조회 필수
                         </li>
                      </ul>
                   </div>
                </div>
              </div>

              <!-- Section 3: Process -->
              <div class="mt-16">
                 <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
                  03. 현금화 진행 절차 (초간단 3단계)
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div class="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:-translate-y-1 transition shadow-sm">
                      <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-indigo-600">1</div>
                      <h4 class="font-bold text-slate-900 mb-2">상담 및 시세 확인</h4>
                      <p class="text-xs text-slate-500">전문 상담원에게 보유한 상품권 종류와 현재 매입가를 확인합니다.</p>
                   </div>
                   <div class="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:-translate-y-1 transition shadow-sm">
                      <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-indigo-600">2</div>
                      <h4 class="font-bold text-slate-900 mb-2">핀(PIN) 번호 전달</h4>
                      <p class="text-xs text-slate-500">상품권의 핀 번호를 문자로 전송하거나, 소액결제로 직접 구매합니다.</p>
                   </div>
                   <div class="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:-translate-y-1 transition shadow-sm">
                      <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-indigo-600">3</div>
                      <h4 class="font-bold text-slate-900 mb-2">즉시 현금 입금</h4>
                      <p class="text-xs text-slate-500">핀 번호 확인 즉시(보통 3분 이내) 본인 계좌로 수수료를 제외한 금액이 입금됩니다.</p>
                   </div>
                </div>
              </div>

              <!-- CTA -->
              <div class="mt-16 pt-8 border-t border-slate-200 text-center bg-indigo-50/50 rounded-3xl p-8">
                <p class="text-xl font-black text-slate-900 mb-4">
                  가지고 계신 상품권, 가장 비싸게 파는 법?<br/>정답은 "정식 업체 비교"입니다.
                </p>
                <div class="flex flex-col md:flex-row justify-center gap-4 mt-8">
                   <button class="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                     <Ticket class="w-5 h-5" /> 내 상품권 시세 조회하기
                   </button>
                   <button class="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                     <MessageCircleQuestion class="w-5 h-5" /> 카카오톡 1:1 문의
                   </button>
                </div>
              </div>
            </div>
          `
        });
        return; // End of Post 2
      }

      // 3번 게시글: 정보이용료(콘텐츠이용료) 현금화 (Ultra SEO Optimized)
      if (currentId === 3) {
        allPosts.push({
          id: currentId,
          title: "정보이용료(콘텐츠이용료) 현금화 vs 소액결제: 차이점과 수수료 폭탄 피하는 법",
          category: '금융/재테크',
          date: '2024-06-05',
          readTime: '10분',
          author: '금융전략팀 김안심',
          imageUrl: "https://images.unsplash.com/photo-1556742102-803310506e2e?auto=format&fit=crop&q=80&w=1200", 
          tags: ['정보이용료현금화', '콘텐츠이용료', '구글결제현금화', '리니지m', '원스토어'],
          summary: "휴대폰 소액결제 한도가 꽉 찼을 때 이용하는 정보이용료(구글 콘텐츠이용료). 결제 방식의 차이점부터 수수료가 비싼 이유, 그리고 구글 계정 해킹을 막기 위한 안전 수칙을 알아봅니다.",
          content: `
            <div class="space-y-10 text-slate-800">
              <!-- Intro -->
              <div class="border-b border-slate-200 pb-8">
                 <span class="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-4">금융/재테크 이슈</span>
                <h1 class="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-6 leading-snug">정보이용료 vs 소액결제<br/>왜 수수료 차이가 날까?</h1>
                <p class="text-lg text-slate-600 leading-relaxed font-medium">
                  많은 분들이 <strong>'소액결제'</strong>와 <strong>'정보이용료(콘텐츠이용료)'</strong>를 혼동합니다. 
                  하지만 이 둘은 한도, 결제처, 그리고 가장 중요한 <strong>수수료</strong>에서 큰 차이가 있습니다. 
                  소액결제 한도가 막혔을 때 대안으로 사용되는 정보이용료 현금화의 구조와 주의사항을 심층 분석합니다.
                </p>
              </div>

               <!-- TOC -->
              <div class="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h4 class="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <span class="text-purple-600">●</span> CONTENTS
                </h4>
                <ul class="space-y-3 text-sm font-bold text-slate-600">
                  <li class="flex items-center gap-3 cursor-pointer hover:text-purple-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">1</span>
                    소액결제와 정보이용료의 결정적 차이점 (비교표)
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-purple-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">2</span>
                    정보이용료 수수료가 비싼 이유 (구글 수수료 구조)
                  </li>
                  <li class="flex items-center gap-3 cursor-pointer hover:text-purple-600 transition">
                    <span class="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">3</span>
                    보안 경고: 구글 계정 요구 업체는 100% 사기?
                  </li>
                </ul>
              </div>

              <!-- Section 1: Comparison -->
              <div>
                <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-purple-600 pl-4">
                  01. 소액결제 vs 정보이용료 완벽 비교
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                  가장 큰 차이는 <strong>'어디서 결제되는가'</strong>입니다. 소액결제는 통신사가 주관하지만, 정보이용료는 구글/애플 등 앱스토어가 주관합니다.
                </p>

                <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-lg mb-8">
                  <table class="w-full text-left text-sm text-slate-600">
                    <thead class="bg-slate-900 text-white">
                      <tr>
                        <th class="p-4 font-bold">구분</th>
                        <th class="p-4 font-bold">소액결제 (휴대폰결제)</th>
                        <th class="p-4 font-bold bg-purple-600">정보이용료 (콘텐츠이용료)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td class="p-4 font-bold text-slate-900">주요 사용처</td>
                        <td class="p-4">쇼핑몰, 배달앱, 상품권 구매</td>
                        <td class="p-4 font-bold text-purple-700">구글 플레이, 게임 아이템, 유료 앱</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900">최대 한도</td>
                        <td class="p-4">월 최대 100만원</td>
                        <td class="p-4">월 최대 100만원 (별도 한도)</td>
                      </tr>
                      <tr>
                        <td class="p-4 font-bold text-slate-900">현금화 방식</td>
                        <td class="p-4">상품권(컬쳐/해피) 구매 후 판매</td>
                        <td class="p-4">리니지M 등 게임 재화 결제 후 판매</td>
                      </tr>
                       <tr>
                        <td class="p-4 font-bold text-slate-900">차단 여부</td>
                        <td class="p-4">통신사 차단 시 이용 불가</td>
                        <td class="p-4">소액결제 차단돼도 이용 가능 (경우에 따라)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Section 2: Why High Fee? -->
              <div class="mt-16">
                 <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-purple-600 pl-4">
                  02. 정보이용료 수수료는 왜 비쌀까?
                </h2>
                <p class="text-lg leading-relaxed text-slate-700 mb-6">
                   일반 소액결제(상품권) 수수료가 10~15% 수준인 반면, 정보이용료는 <strong>30~40% 이상의 높은 수수료</strong>가 발생합니다. 그 이유는 유통 구조 때문입니다.
                </p>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <div class="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                      <Gamepad2 class="text-purple-600 w-6 h-6" />
                    </div>
                    <h3 class="font-bold text-slate-900 mb-2 text-lg">구글/애플 수수료 30%</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                      구글 플레이스토어나 애플 앱스토어에서 결제 시, 플랫폼 사가 기본적으로 <strong>30%의 수수료를 선취</strong>합니다. 
                      따라서 10만원을 결제해도 실제 가치는 7만원 수준에서 시작하게 됩니다.
                    </p>
                  </div>
                  <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                     <div class="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                      <HandCoins class="text-purple-600 w-6 h-6" />
                    </div>
                    <h3 class="font-bold text-slate-900 mb-2 text-lg">게임사/환전 수수료</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">
                      결제한 게임 아이템을 다시 현금으로 거래하는 과정에서 발생하는 감가상각과 대행업체의 마진이 포함되므로 최종 수령액은 더 낮아질 수밖에 없습니다.
                    </p>
                  </div>
                </div>
              </div>

               <!-- Section 3: Security Warning -->
              <div class="mt-16">
                 <h2 class="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-l-4 border-purple-600 pl-4">
                  03. [주의] 구글 계정을 알려달라고 한다면?
                </h2>
                <div class="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col md:flex-row gap-6 items-center">
                   <div class="bg-white p-4 rounded-full shadow-md shrink-0">
                      <ShieldAlert class="text-red-500 w-8 h-8" />
                   </div>
                   <div class="text-center md:text-left">
                      <h3 class="text-xl font-black text-red-700 mb-2">절대 비밀번호를 공유하지 마세요!</h3>
                      <p class="text-red-900/80 leading-relaxed font-medium">
                        일부 불법 업체들이 "대리 결제"를 명목으로 <strong>구글 계정 아이디와 비밀번호</strong>를 요구합니다. 
                        이는 개인정보 도용, 추가 불법 결제 피해로 이어질 수 있는 <strong>100% 사기 행위</strong>입니다. 
                        정식 업체는 본인이 직접 결제한 후 아이템이나 코드를 전달하는 방식(선물하기 등)으로만 거래합니다.
                      </p>
                   </div>
                </div>
              </div>

              <!-- Conclusion -->
              <div class="mt-16 pt-8 border-t border-slate-200 text-center bg-purple-50/50 rounded-3xl p-8">
                <p class="text-xl font-black text-slate-900 mb-4">
                  복잡한 정보이용료, 혼자 고민하지 마세요.<br/>전문가가 안전한 루트를 안내해 드립니다.
                </p>
                <div class="flex flex-col md:flex-row justify-center gap-4 mt-8">
                   <button class="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                     <Zap class="w-5 h-5" /> 실시간 수수료 확인하기
                   </button>
                   <button class="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2">
                     <PhoneCall class="w-5 h-5" /> 24시 무료 상담 연결
                   </button>
                </div>
              </div>
            </div>
          `
        });
        return; // End of Post 3
      }
      
      // Generic posts for remaining IDs
      allPosts.push({
        id: currentId,
        title: title,
        category: category,
        date: `2024-${String(Math.floor(Math.random() * 5) + 5).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        readTime: `${Math.floor(Math.random() * 5) + 3}분`,
        author: "금융전략팀 김안심",
        imageUrl: imageUrl,
        tags: [category, "현금화꿀팁", "비상금", "안심정보"],
        summary: `${title}에 대한 심층 분석과 전문가의 조언을 담았습니다. 정보의 홍수 속에서 가장 정확하고 안전한 금융 솔루션을 확인하세요.`,
        content: `
          <div class="space-y-8 text-slate-800">
             <div class="border-b pb-6">
              <h1 class="text-3xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">${title}</h1>
              <p class="text-lg text-slate-600 leading-relaxed">
                2024년 최신 금융 트렌드를 반영한 <strong>${category}</strong> 핵심 가이드입니다. 
                잘못된 정보로 인한 금전적 손실을 막고, 효율적인 자산 관리를 위한 노하우를 공개합니다.
              </p>
            </div>
            <!-- Standard Placeholder Content -->
             <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 class="font-bold text-slate-900 mb-3 text-sm uppercase">목차</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li>1. ${title} 핵심 요약</li>
                <li>2. 주의해야 할 리스크 분석</li>
                <li>3. 전문가의 실전 조언</li>
              </ul>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mt-8">1. 핵심 내용 심층 분석</h3>
            <p class="text-lg text-slate-700 leading-relaxed">
              본 주제는 최근 경제 상황에서 매우 중요하게 다뤄지고 있습니다. 특히 초기 접근 방식에 따라 결과가 크게 달라질 수 있으므로 신중한 접근이 필요합니다.
            </p>
            <div class="my-8 rounded-3xl overflow-hidden shadow-lg">
              <img src="${imageUrl}" alt="${title}" class="w-full h-auto object-cover" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mt-8">2. 전문가의 조언</h3>
            <p class="text-lg text-slate-700 leading-relaxed">
              공식적인 채널을 통해 정보를 확인하는 습관이 중요합니다. 궁금한 점은 언제든 전문가 상담을 통해 해결하시기 바랍니다.
            </p>
             <div class="mt-12 pt-8 border-t border-slate-200">
              <button class="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">관련 정보 더 보기</button>
            </div>
          </div>
        `
      });
    });
  });

  return allPosts;
};

const BLOG_DATA = generateFullContent();

// --- Components ---

const Navbar = ({ onViewChange, currentView, onAdminTry }: { onViewChange: (v: ViewState) => void, currentView: ViewState, onAdminTry: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['금융/재테크', '대출꿀팁', '투자/주식', '복지/정책', '생활꿀팁'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('home')}>
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-all duration-300 shadow-blue-200 shadow-lg">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-slate-800'}`}>SAFE PAY</span>
        </div>

        <div className="hidden xl:flex items-center gap-8">
           <button onClick={() => onViewChange('home')} className={`text-sm font-bold transition ${currentView === 'home' ? 'text-blue-600' : 'text-slate-500 hover:text-blue-400'}`}>HOME</button>
           {menuItems.map(item => (
             <button 
                key={item} 
                onClick={() => onViewChange('blog')} 
                className={`text-sm font-bold transition ${currentView === 'blog' ? 'text-slate-700 hover:text-blue-600' : 'text-slate-500 hover:text-blue-400'}`}
             >
               {item}
             </button>
           ))}
          <button onClick={() => onViewChange('blog')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-blue-600 transition shadow-xl shadow-slate-200">전체보기</button>
        </div>

        <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b py-8 px-8 space-y-6 flex flex-col shadow-2xl animate-in fade-in slide-in-from-top-4">
          <button onClick={() => { onViewChange('home'); setIsMenuOpen(false); }} className="text-left font-black text-slate-900 text-lg">홈으로</button>
          {menuItems.map(item => (
             <button 
                key={item} 
                onClick={() => { onViewChange('blog'); setIsMenuOpen(false); }} 
                className="text-left font-bold text-slate-600 text-lg hover:text-blue-600"
             >
               {item}
             </button>
           ))}
          <button className="bg-blue-600 text-white py-4 rounded-2xl font-black mt-4">24시 실시간 상담</button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 bg-[#fafbfc] overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] -z-10 hidden lg:block"></div>
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm mb-8 animate-bounce">
          <TrendingUp className="text-blue-600 w-4 h-4" />
          <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Premium Financial Guide</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
          소액결제·신용카드 현금화<br />
          <span className="text-blue-600">안전 가이드</span>의 기준
        </h1>
        <p className="text-lg text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
          급한 비상금이 필요할 때, 가장 안전하고 합리적인 방법을 제시합니다. 상품권 매입부터 신용카드 현금화, 휴대폰 소액결제 이용 시 주의사항까지 전문가가 직접 검증한 정보를 확인하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <button onClick={onExplore} className="bg-blue-600 text-white px-10 py-5 rounded-[20px] font-black text-sm tracking-widest hover:bg-slate-900 transition-all duration-300 shadow-2xl shadow-blue-200 flex items-center justify-center gap-3">
            현금화 정보 보기 <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-[20px] font-black text-sm tracking-widest hover:bg-slate-50 transition flex items-center justify-center gap-3">
            <PhoneCall className="w-5 h-5" /> 안심 업체 상담
          </button>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-[50px] blur-3xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <img 
          src="https://images.unsplash.com/photo-1579621970792-282f23331c40?q=80&w=1200&auto=format&fit=crop" 
          alt="소액결제 및 신용카드 현금화 안전 가이드 메인 이미지" 
          className="relative rounded-[50px] shadow-2xl border border-white w-full object-cover aspect-[4/3]"
        />
        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[30px] shadow-2xl hidden xl:block border border-slate-50">
          <div className="flex items-center gap-5">
            <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center"><ShieldCheck className="text-blue-600 w-6 h-6" /></div>
            <div>
              <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Safety Check</div>
              <div className="text-2xl font-black text-slate-900 tracking-tighter">100% Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CategoryGrid = () => (
  <section id="guide" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tighter">금융 생활의 모든 솔루션</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">분야별 전문가들이 직접 작성한 검증된 정보를 확인하고 합리적인 금융 선택을 시작하세요.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { icon: <Coins className="text-blue-600" />, title: '금융/재테크', color: 'bg-blue-50', desc: '소액결제 및 신용카드 현금화 안전 가이드' },
          { icon: <HandCoins className="text-orange-600" />, title: '대출꿀팁', color: 'bg-orange-50', desc: '비상금 대출 및 정부 지원 정책 금리 비교' },
          { icon: <TrendingUp className="text-purple-600" />, title: '투자/주식', color: 'bg-purple-50', desc: '배당주, 공모주 청약 및 절세 계좌 전략' },
          { icon: <Landmark className="text-indigo-600" />, title: '복지/정책', color: 'bg-indigo-50', desc: '국가지원금, 청년 정책 자금 수혜 정보' },
          { icon: <BadgePercent className="text-green-600" />, title: '생활꿀팁', color: 'bg-green-50', desc: '통신비 절감, 포인트 현금화 노하우' }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[40px] border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center lg:text-left">
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner mx-auto lg:mx-0`}>{item.icon}</div>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter">{item.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlogSection = ({ onPostClick }: { onPostClick: (p: BlogPost) => void }) => {
  const [activeTab, setActiveTab] = useState('전체');
  const [visibleItems, setVisibleItems] = useState(15);
  const tabs = ['전체', '금융/재테크', '대출꿀팁', '투자/주식', '복지/정책', '생활꿀팁'];

  const filtered = useMemo(() => {
    return activeTab === '전체' ? BLOG_DATA : BLOG_DATA.filter(p => p.category === activeTab);
  }, [activeTab]);

  useEffect(() => {
    setVisibleItems(15);
  }, [activeTab]);

  return (
    <section className="py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tighter italic">FINANCE INSIGHT</h2>
            <p className="text-slate-500 font-medium">금융 분야별 전문가가 직접 작성한 {BLOG_DATA.length}개의 핵심 가이드</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 rounded-full text-xs font-black tracking-widest transition-all ${activeTab === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.slice(0, visibleItems).map((post) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 cursor-pointer flex flex-col h-full"
              onClick={() => onPostClick(post)}
            >
              <div className="relative h-60 overflow-hidden shrink-0">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest border border-white/50">{post.category}</div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Calendar className="w-3.5 h-3.5" /> {post.date} 
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <BookOpen className="w-3.5 h-3.5" /> {post.readTime}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition tracking-tighter line-clamp-2">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium flex-grow">{post.summary}</p>
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between mt-auto">
                  <span className="text-slate-900 font-black text-xs tracking-widest uppercase">READ ARTICLE</span>
                  <div className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition duration-500"><ArrowRight className="w-4 h-4" /></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visibleItems < filtered.length && (
          <div className="mt-24 text-center">
            <button 
                onClick={() => setVisibleItems(filtered.length)}
                className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-2xl"
            >
                전체 콘텐츠 보기 ({filtered.length}+)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const PostDetail = ({ post, onBack }: { post: BlogPost, onBack: () => void }) => (
  <section className="pt-48 pb-32 bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black text-xs tracking-widest mb-12 transition-all group">
        <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" /> 목록으로 돌아가기
      </button>

      <div className="flex items-center gap-3 mb-8">
        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">{post.category}</span>
        <span className="text-slate-300 text-xs font-bold">{post.date}</span>
      </div>

      <h1 className="text-3xl lg:text-5xl font-black text-slate-900 mb-12 leading-[1.2] tracking-tighter">{post.title}</h1>
      
      <div className="rounded-[50px] overflow-hidden mb-16 shadow-2xl border-8 border-slate-50">
        <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover" />
      </div>

      <div className="prose prose-slate max-w-none prose-lg lg:prose-xl prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:leading-relaxed text-slate-700">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex flex-wrap gap-2 mt-12 mb-20">
        {post.tags.map(tag => (
          <span key={tag} className="text-slate-500 text-sm font-bold bg-slate-100 px-4 py-2 rounded-full">#{tag}</span>
        ))}
      </div>

      <div className="mt-24 p-12 bg-slate-900 rounded-[50px] text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative border-4 border-blue-600/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
        <div className="relative z-10 text-center md:text-left">
          <h4 className="text-3xl font-black mb-4 tracking-tighter italic">현금화 관련 실시간 상담</h4>
          <p className="text-slate-400 font-medium">안전한 정식 업체에서 한도와 수수료를 확인하세요.</p>
        </div>
        <button className="relative z-10 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl shadow-blue-500/20 flex items-center gap-3 shrink-0">
          <PhoneCall className="w-5 h-5" /> 비밀 상담 연결
        </button>
      </div>
    </div>
  </section>
);

const AdminDashboard = ({ onExit }: { onExit: () => void }) => (
  <div className="min-h-screen bg-slate-950 text-white flex">
    <aside className="w-80 border-r border-white/5 p-10 flex flex-col">
      <div className="flex items-center gap-3 mb-20">
        <div className="bg-blue-600 p-2 rounded-lg"><Lock className="w-5 h-5" /></div>
        <span className="font-black italic tracking-tighter text-xl">ADMIN CORE</span>
      </div>
      <nav className="flex-grow space-y-4">
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 text-blue-400 font-black text-xs tracking-widest"><LayoutDashboard className="w-4 h-4" /> DASHBOARD</button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:bg-white/5 font-black text-xs tracking-widest transition"><PlusCircle className="w-4 h-4" /> NEW POST</button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:bg-white/5 font-black text-xs tracking-widest transition"><Smartphone className="w-4 h-4" /> LOGS</button>
      </nav>
      <button onClick={onExit} className="flex items-center gap-4 px-6 py-4 text-red-400 font-black text-xs tracking-widest hover:bg-red-500/10 rounded-2xl transition"><LogOut className="w-4 h-4" /> EXIT SYSTEM</button>
    </aside>
    <main className="flex-grow p-16">
      <div className="grid grid-cols-3 gap-10 mb-16">
        {[
          { label: 'DAILY VISITS', val: '24,812', up: '+12%' },
          { label: 'POSTS SYNC', val: '100+', up: 'STABLE' },
          { label: 'SYSTEM IP', val: ALLOWED_IP, up: 'AUTH' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 p-10 rounded-[40px] border border-white/5">
            <div className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-4">{stat.label}</div>
            <div className="text-4xl font-black mb-2">{stat.val}</div>
            <div className="text-blue-500 text-[10px] font-black">{stat.up}</div>
          </div>
        ))}
      </div>
      <div className="bg-white/5 rounded-[40px] border border-white/5 p-12 overflow-hidden">
        <h2 className="text-2xl font-black mb-10 tracking-tighter">RECENT ACTIVITY</h2>
        <div className="space-y-6">
          {BLOG_DATA.slice(0, 5).map(post => (
            <div key={post.id} className="flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 transition border border-transparent hover:border-white/10">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black">#{post.id}</div>
                <div>
                  <div className="font-bold text-white mb-1">{post.title}</div>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">{post.category} | {post.date}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition"><Eye className="w-4 h-4" /></button>
                <button className="bg-white/10 p-3 rounded-xl hover:bg-red-500/20 text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

// --- Main App Logic ---

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => {});
  }, []);

  const handleAdminTry = () => {
    if (userIp === ALLOWED_IP) {
      setView('admin');
      window.scrollTo(0, 0);
    }
  };

  const onPostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setView('blog-detail');
    window.scrollTo(0, 0);
  };

  if (view === 'admin') return <AdminDashboard onExit={() => setView('home')} />;

  return (
    <div className="bg-white selection:bg-blue-600 selection:text-white">
      <Navbar 
        onViewChange={(v) => { setView(v); setSelectedPost(null); }} 
        currentView={view}
        onAdminTry={handleAdminTry} 
      />

      <main>
        {view === 'home' && (
          <>
            <Hero onExplore={() => setView('blog')} />
            <CategoryGrid />
            <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative z-10">
                  <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-tight tracking-tighter italic uppercase border-l-8 border-blue-600 pl-8">WHY US?</h2>
                  <div className="space-y-10">
                    {[
                      { icon: <CheckCircle2 className="text-blue-500 w-10 h-10" />, t: '정식 사업자 인증', d: '국세청에 정식 등록된 안전한 상품권 매입 업체만을 안내합니다.' },
                      { icon: <Target className="text-blue-500 w-10 h-10" />, t: '최저 수수료 보장', d: '업계 평균보다 낮은 합리적인 수수료율과 투명한 정산 시스템을 지향합니다.' },
                      { icon: <Zap className="text-blue-500 w-10 h-10" />, t: '24시간 즉시 입금', d: '365일 언제나 신청 즉시 5분 이내 입금되는 신속한 시스템을 갖추었습니다.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="flex-shrink-0 mt-1 transition-transform group-hover:scale-125 duration-300">{item.icon}</div>
                        <div>
                          <h4 className="text-xl font-black mb-3 italic tracking-tight uppercase">{item.t}</h4>
                          <p className="text-slate-400 font-medium leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[60px] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-40 transition duration-1000"></div>
                    <ShieldAlert className="w-16 h-16 text-blue-500 mb-8" />
                    <h3 className="text-3xl font-black mb-8 tracking-tighter italic uppercase">Safety Check</h3>
                    <ul className="space-y-6 mb-12">
                      <li className="flex items-center gap-4 text-lg font-bold text-slate-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div> 불법 카드깡 및 대출 사기 근절
                      </li>
                      <li className="flex items-center gap-4 text-lg font-bold text-slate-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div> 개인정보 보호법 철저 준수
                      </li>
                      <li className="flex items-center gap-4 text-lg font-bold text-slate-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div> 보이스피싱 및 스미싱 예방 캠페인
                      </li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white py-5 rounded-[25px] font-black tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-2xl shadow-blue-500/20">안전 거래 가이드 다운로드</button>
                  </div>
                </div>
              </div>
            </section>
            <BlogSection onPostClick={onPostClick} />
          </>
        )}

        {view === 'blog' && <BlogSection onPostClick={onPostClick} />}
        {view === 'blog-detail' && selectedPost && <PostDetail post={selectedPost} onBack={() => setView('blog')} />}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={handleAdminTry}>
                <div className="bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-black italic tracking-tighter">SAFE PAY GUIDE</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-10">
                대한민국 No.1 소액결제 현금화 정보 플랫폼.<br />
                우리는 깨끗하고 안전한 모바일 결제 문화를 지향하며,<br />
                불법 금융 행위 근절에 앞장섭니다.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 transition"><ExternalLink className="w-4 h-4 text-slate-400" /></div>
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 transition"><Smartphone className="w-4 h-4 text-slate-400" /></div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs tracking-widest uppercase mb-8 text-slate-400">Information</h4>
              <ul className="space-y-4 font-bold text-slate-600 text-sm">
                <li><button onClick={() => setView('home')} className="hover:text-blue-600 transition">메인 홈</button></li>
                <li><button onClick={() => setView('blog')} className="hover:text-blue-600 transition">전체 콘텐츠</button></li>
                <li><a href="#guide" className="hover:text-blue-600 transition">이용 안내</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">개인정보 처리방침</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs tracking-widest uppercase mb-8 text-slate-400">Customer Center</h4>
              <p className="text-slate-900 font-black text-2xl tracking-tighter mb-4 italic">16XX-XXXX</p>
              <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 tracking-tighter uppercase">365 Days 24/7 Fast Support</p>
              <button className="bg-slate-900 text-white w-full py-4 rounded-2xl font-black text-[10px] tracking-widest hover:bg-blue-600 transition">카카오톡 상담 바로가기</button>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100">
            <div className="text-[10px] text-slate-400 font-medium leading-loose mb-10 max-w-4xl">
              책임 한계 고지: 본 사이트는 정보 제공만을 목적으로 하며 어떠한 금융 거래도 직접 수행하지 않습니다. 
              게시된 정보의 이용으로 발생하는 경제적 손실 및 법적 문제에 대해 플랫폼은 책임을 지지 않습니다. 
              불법 스팸, 명의 도용 결제, 허위 수익 유도, 불법 카드깡 등의 행위는 관계 법령에 따라 처벌될 수 있음을 강력히 고지합니다.
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-black text-slate-300 tracking-widest uppercase">© 2024 SAFE PAY GUIDE NETWORK. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6 text-[10px] font-black text-slate-300 tracking-widest uppercase">
                <a href="#" className="hover:text-slate-900 transition">Privacy Policy</a>
                <a href="#" className="hover:text-slate-900 transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
