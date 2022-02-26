import styled from "styled-components";
import { useRouter } from "next/router";
import { KAKAO_REDIRECT_URI } from "utils/constants";
import NaverLogin from "components/common/NaverLogin";
import withoutLogin from "components/common/withoutLogin";
import Ci from "assets/svg/ci.svg";
import KakaoLoginBtn from "assets/svg/kakao-login-btn.svg";

const Login = () => {
  const router = useRouter();

  const kakaoAuthRedirect = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
    );
  };

  const notLogin = () => {
    router.push("/");
  };

  return (
    <LoginBlock>
      <div className="ci txt-c">
        <Ci />
      </div>
      <div className="sub-title txt-c">
        <span>청춘은 바로 지금</span>
        <p>청바지가 여러분의 도전을 응원합니다!</p>
      </div>
      <div className="big-logo" />

      <div className="login">
        <NaverLogin />
        <KakaoLoginBtn width="100%" height="60px" onClick={kakaoAuthRedirect} />

        <div className="login__not-login txt-c" onClick={notLogin}>
          로그인하지 않고 둘러보기
        </div>
      </div>
    </LoginBlock>
  );
};

const LoginBlock = styled.div`
  height: 100vh;
  background: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .ci {
    padding: 60px 0 10px;
  }
  .sub-title {
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
    span {
      font-weight: bold;
    }
  }
  .big-logo {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    background: white;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  header {
    font-size: 12px;
    text-align: center;
  }

  article img {
    width: 100%;
    height: 50px;
  }

  .login {
    padding: 0 20px 30px 20px;
    &__not-login {
      margin-top: 30px;
      color: white;
      font-size: 18px;
    }
  }
`;

export default withoutLogin(Login);
// export default Login;
