import { useEffect } from "react";
import { NAVER_REDIRECT_URI } from "utils/constants";
import NaverLoginBtn from "assets/svg/naver-login-btn.svg";

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: "60" }
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    const element: HTMLElement = document.getElementById("naverIdLogin")
      ?.firstChild as HTMLElement;
    element.click();
  };

  return (
    <>
      <div id="naverIdLogin" style={{ display: "none" }} />
      <NaverLoginBtn onClick={handleNaverLogin} width="100%" height="60px" />
    </>
  );
};

export default NaverLogin;
