import { IMenu } from "features/types/foodKioskSliceType";
import { ITicket } from "features/types/transportationKioskSliceType";

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

export const locations = ["전체", "강원도", "충남", "충북", "전남", "경남"];

export const terminals = [
  {
    id: 1,
    label: "내촌",
    word: "ㄴ",
    location: "경기도"
  },
  {
    id: 2,
    label: "삼척",
    word: "ㅅ",
    location: "강원도"
  },
  {
    id: 3,
    label: "상남",
    word: "ㅅ",
    location: "경남"
  },
  {
    id: 4,
    label: "양양",
    word: "ㅇ",
    location: "강원도"
  },
  {
    id: 5,
    label: "원주",
    word: "ㅇ",
    location: "강원도"
  },
  {
    id: 6,
    label: "양평",
    word: "ㅇ",
    location: "경기도"
  },
  {
    id: 7,
    label: "의정부",
    word: "ㅇ",
    location: "경기도"
  },
  {
    id: 8,
    label: "평택",
    word: "ㅍ",
    location: "경기도"
  },
  {
    id: 9,
    label: "당진",
    word: "ㄷ",
    location: "충남"
  },
  {
    id: 10,
    label: "아산",
    word: "ㅇ",
    location: "충남"
  },
  {
    id: 11,
    label: "천안",
    word: "ㅊ",
    location: "충남"
  },
  {
    id: 12,
    label: "단양",
    word: "ㄷ",
    location: "충북"
  },
  {
    id: 13,
    label: "진천",
    word: "ㅈ",
    location: "충북"
  },
  {
    id: 14,
    label: "청주",
    word: "ㅊ",
    location: "충북"
  },
  {
    id: 15,
    label: "목포",
    word: "ㅁ",
    location: "전남"
  },
  {
    id: 16,
    label: "순천",
    word: "ㅅ",
    location: "전남"
  },
  {
    id: 17,
    label: "여수",
    word: "ㅇ",
    location: "전남"
  },
  {
    id: 18,
    label: "마산",
    word: "ㅁ",
    location: "경남"
  },
  {
    id: 19,
    label: "진주",
    word: "ㅈ",
    location: "경남"
  },
  {
    id: 20,
    label: "통영",
    word: "ㅌ",
    location: "경남"
  }
] as {
  id: number;
  label: string;
  word: string;
  location: string;
}[];

export const word = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];

export const busTimeList = [
  {
    id: 1,
    startAt: "10:00",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 19
  },
  {
    id: 2,
    startAt: "10:25",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 17
  },
  {
    id: 3,
    startAt: "11:00",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 8
  },
  {
    id: 4,
    startAt: "11:15",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 15
  },
  {
    id: 5,
    startAt: "12:00",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 1
  },
  {
    id: 6,
    startAt: "12:20",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 9
  },
  {
    id: 7,
    startAt: "12:55",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 9
  },
  {
    id: 8,
    startAt: "13:30",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 11
  },
  {
    id: 9,
    startAt: "14:10",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 9
  },
  {
    id: 10,
    startAt: "14:35",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 3
  },
  {
    id: 11,
    startAt: "15:00",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 8
  },
  {
    id: 12,
    startAt: "15:25",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 12
  },
  {
    id: 13,
    startAt: "16:00",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 15
  },
  {
    id: 14,
    startAt: "16:30",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 19
  },
  {
    id: 15,
    startAt: "17:10",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "common",
    lastSeat: 10
  },
  {
    id: 16,
    startAt: "18:00",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 12
  },
  {
    id: 17,
    startAt: "18:20",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 14
  },
  {
    id: 18,
    startAt: "18:40",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 5
  },
  {
    id: 19,
    startAt: "19:20",
    type: "경",
    company: "청춘고속",
    time: 2.5,
    grade: "common",
    lastSeat: 13
  },
  {
    id: 20,
    startAt: "20:00",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 8
  },
  {
    id: 21,
    startAt: "20:40",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 9
  },
  {
    id: 22,
    startAt: "21:20",
    type: "직",
    company: "청춘고속",
    time: 2,
    grade: "top",
    lastSeat: 17
  }
] as ITicket[];
