export const KAKAO_REDIRECT_URI = `${
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://blue-jeans.vercel.app"
}/oauth/kakao/callback`;

export const NAVER_REDIRECT_URI = `${
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://blue-jeans.vercel.app"
}/oauth/naver/callback`;

export const QuestionType = [
  {
    value: "not-choice",
    label: "문의유형을 선택해주세요"
  },
  {
    value: "user-info",
    label: "회원정보"
  },
  {
    value: "using",
    label: "이용안내"
  },
  {
    value: "trouble",
    label: "오류/불편"
  },
  {
    value: "partnership",
    label: "제휴"
  },
  {
    value: "education",
    label: "교육문의"
  },
  {
    value: "etc",
    label: "기타"
  }
];

export const kioskProducts = [
  {
    type: "fork",
    name: "무공돈까스",
    price: 8900
  },
  {
    type: "fork",
    name: "치즈돈까스",
    price: 7900
  },
  {
    type: "fork",
    name: "옛날돈까스",
    price: 7900
  },
  {
    type: "fork",
    name: "함박스테이크",
    price: 8500
  },
  {
    type: "rice",
    name: "돈부리",
    price: 8500
  },
  {
    type: "rice",
    name: "김치볶음밥",
    price: 8500
  },
  {
    type: "noodle",
    name: "칼국수",
    price: 8500
  },
  {
    type: "noodle",
    name: "쌀국수",
    price: 18500
  },
  {
    type: "side",
    name: "밥",
    price: 1000
  },
  {
    type: "side",
    name: "면",
    price: 1000
  },
  {
    type: "drink",
    name: "콜라",
    price: 2000
  },
  {
    type: "drink",
    name: "사이다",
    price: 2000
  },
  {
    type: "drink",
    name: "환타",
    price: 2000
  }
];

export const kioskTab = [
  { type: "fork", label: "돈까스류" },
  { type: "rice", label: "덮밥류" },
  { type: "noodle", label: "면류" },
  { type: "side", label: "사이드류" },
  { type: "drink", label: "음류/주류" }
];
