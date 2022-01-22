import { IMenu } from "features/types/foodKioskSliceType";

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
    price: 8900,
    img: "",
    desc: "무공돈까스가 맛있다는 코멘트",
    side: [
      {
        name: "공깃밥",
        price: 1000,
        img: ""
      },
      {
        name: "돈까스 추가",
        price: 3000,
        img: ""
      }
    ]
  },
  {
    type: "fork",
    name: "치즈돈까스",
    price: 7900,
    img: "",
    desc: "치즈돈까스가 맛있다는 코멘트",
    side: [
      {
        name: "공깃밥",
        price: 1000,
        img: ""
      },
      {
        name: "돈까스 추가",
        price: 3000,
        img: ""
      },
      {
        name: "돈까스 두개 추가",
        price: 4500,
        img: ""
      }
    ]
  },
  {
    type: "fork",
    name: "옛날돈까스",
    price: 7900,
    img: "",
    desc: "옛날돈가 맛있다는 코멘트",
    side: [
      {
        name: "돈까스 추가",
        price: 3000,
        img: ""
      },
      {
        name: "돈까스 두개 추가",
        price: 4500,
        img: ""
      }
    ]
  },
  {
    type: "fork",
    name: "함박스테이크",
    price: 8500,
    img: "",
    desc: ""
  },
  {
    type: "rice",
    name: "돈부리",
    price: 8500,
    img: "",
    desc: ""
  },
  {
    type: "rice",
    name: "김치볶음밥",
    price: 8500,
    img: "",
    desc: ""
  },
  {
    type: "noodle",
    name: "칼국수",
    price: 8500,
    img: "",
    desc: ""
  },
  {
    type: "noodle",
    name: "쌀국수",
    price: 18500,
    img: "",
    desc: ""
  },
  {
    type: "side",
    name: "밥",
    price: 1000,
    img: "",
    desc: ""
  },
  {
    type: "side",
    name: "면",
    price: 1000,
    img: "",
    desc: ""
  },
  {
    type: "drink",
    name: "콜라",
    price: 2000,
    img: "",
    desc: ""
  },
  {
    type: "drink",
    name: "사이다",
    price: 2000,
    img: "",
    desc: ""
  },
  {
    type: "drink",
    name: "환타",
    price: 2000,
    img: "",
    desc: ""
  }
] as IMenu[];

export const kioskTab = [
  { type: "fork", label: "돈까스류" },
  { type: "rice", label: "덮밥류" },
  { type: "noodle", label: "면류" },
  { type: "side", label: "사이드류" },
  { type: "drink", label: "음류/주류" }
];

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
export const quilFormats = [
  "header",
  "font",
  "size",
  "bold",
  "color",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" }
//     ],
//     ["link", "image", "video"],
//     [{ color: [] }], // dropdown with defaults from theme
//     ["clean"]
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false
//   }
// };
