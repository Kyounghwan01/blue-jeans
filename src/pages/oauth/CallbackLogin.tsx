import styled from "styled-components";
import KakaoLoginBtn from "assets/svg/kakao-login-btn.svg";
import Ci from "assets/svg/ci.svg";
import NaverLoginBtn from "assets/svg/naver-login-btn.svg";
import Loading from "components/common/Loading";

const CallbackLogin = ({ loading }: { loading: boolean }) => {
  return (
    <LoginBlock>
      <div id="naverIdLogin" />
      {loading && <Loading />}
      <div className="ci txt-c">
        <Ci />
      </div>
      <div className="sub-title txt-c">
        <span>청춘은 바로 지금</span>
        <p>청바지가 여러분의 도전을 응원합니다!</p>
      </div>
      <div className="big-logo" />

      <div className="login">
        <NaverLoginBtn width="100%" height="60px" />
        <KakaoLoginBtn width="100%" height="60px" />

        <div className="login__not-login txt-c">로그인하지 않고 둘러보기</div>
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
  #naverIdLogin {
    display: none;
  }
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

export default CallbackLogin;
