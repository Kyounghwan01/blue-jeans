import { useEffect } from "react";
import { NAVER_REDIRECT_URI } from "utils/constants";
const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false,
      loginButton: { color: "green", type: 4, height: "60" }
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
