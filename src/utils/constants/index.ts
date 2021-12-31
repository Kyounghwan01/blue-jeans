export const KAKAO_REDIRECT_URI = `${
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://blue-jeans.vercel.app"
}/oauth/kakao/callback`;
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
