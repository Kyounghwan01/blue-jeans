export const food = {
  basicRoute: "/education/kiosk/food/tutorial",
  components: [
    {
      step: "Intro",
      title: "주문시작",
      header: false,
      hint: [{ desc: "주문하기 버튼을 클릭해주세요!" }]
    },
    {
      step: "Main",
      title: "메뉴 선택",
      header: false,
      hint: [
        { desc: "무공 돈까스를 클릭해주세요!" },
        { desc: "무공 돈까스에 공깃밥을 추가해주세요!" },
        { desc: "무공 돈까스를 하나 더 추가해주세요!" },
        { desc: "결제 버튼을 클릭해주세요!" }
      ]
    }
  ]
};

export const transportation = {
  basicRoute: "/education/kiosk/transportation/tutorial",
  components: [
    {
      step: "Intro",
      title: "키오스크 체험",
      header: false
    },
    {
      step: "Mission",
      title: "미션",
      header: false
    },
    {
      step: "BuyStart",
      title: "구매 시작",
      header: false
    },
    {
      step: "BuyTicket",
      title: "티켓 구매",
      header: false
    },
    {
      step: "Main",
      title: "메뉴 선택",
      header: false,
      hint: [
        { desc: "무공 돈까스를 클릭해주세요!" },
        { desc: "무공 돈까스에 공깃밥을 추가해주세요!" },
        { desc: "무공 돈까스를 하나 더 추가해주세요!" },
        { desc: "결제 버튼을 클릭해주세요!" }
      ]
    }
  ]
};
