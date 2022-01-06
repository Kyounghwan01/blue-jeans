import { useEffect, useState } from "react";
import { NAVER_REDIRECT_URI } from "utils/constants";
import axios from "axios";

const Index = () => {
  // todo: NaverLogin 값을 store에 저장해서 이곳에서 추가로 init 안하도록
  const [naverLoginState, setNaverLoginState] = useState<any>(null);
  const [token, setToken] = useState<string>("");

  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 4, height: "60" }, //버튼의 스타일, 타입, 크기를 지정
    });
    setNaverLoginState(naverLogin);
    const location = window.location.href.split("=")[1];
    const tokens = location.split("&")[0];
    setToken(tokens);
    naverLogin.init();

    naverLogin.getLoginStatus((status) => {
      // todo: 서비스가 사용할 필수 정보 없으면 다시 띄워, cancel 일때 예외처리
      // todo: 로그인 하면 서비스 저장 또는 있는 값 id로 불러오기
      console.log(naverLogin.user);
      /**
       * age: "30-39"
        birthday: "01-23"
        email: "osc9245@naver.com"
        gender: "M"
        id: "H1_M_Ltmuf0LFgblEIxDv71gDCaQwA3Y7vEWuO7yzbU"
        name: "노경환"
        nickname: "노경환"
        profile_image: "https://ssl.pstatic.net/static/pwe/address/img_profile.png"
       */
      if (!naverLogin.gender) {
        alert("성별필수");
        return naverLogin.reprompt();
      }
      console.log(status);
    });
  };

  const logout = () => {
    naverLoginState.logout();
  };

  const withDraw = async () => {
    // cors에러뜨기는 하는데 제대로 아웃은 되네
    const res = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`
    );
    console.log(res);
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div>
      <div id="naverIdLogin" />
      <button onClick={logout}>로그아웃</button>
      <button onClick={withDraw}>탈퇴</button>
    </div>
  );
};

export default Index;
