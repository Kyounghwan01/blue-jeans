import { useEffect } from "react";
import { NAVER_REDIRECT_URI } from "utils/constants";
const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 4, height: "60" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
