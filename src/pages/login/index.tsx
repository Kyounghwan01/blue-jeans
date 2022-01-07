import styled from "styled-components";
import { useRouter } from "next/router";
import { KAKAO_REDIRECT_URI } from "utils/constants";
import NaverLogin from "components/common/NaverLogin";
import withoutLogin from "components/common/withoutLogin";

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
      <main>
        <article>it 시대가 무서운 시니어를 응원합니다!</article>
        <article>
          <img
            src="/static/image/auth/kakao-login-btn.png"
            alt="카카오로그인버튼"
            onClick={kakaoAuthRedirect}
          />

          <NaverLogin />

          <div onClick={notLogin}>로그인하지 않고 둘러보기</div>
        </article>
      </main>
    </LoginBlock>
  );
};

const LoginBlock = styled.div`
  padding: 20px 30px;
  height: 100vh;
  header {
    font-size: 12px;
    text-align: center;
  }

  article img {
    width: 100%;
    height: 50px;
  }
`;

export default withoutLogin(Login);
// export default Login;
