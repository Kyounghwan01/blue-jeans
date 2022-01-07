import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NAVER_REDIRECT_URI } from "utils/constants";
import { useDispatch } from "react-redux";
import Loading from "components/common/Loading";
import { login } from "features/userSlice";
import setDocFirebase from "utils/api/setDocFirebase";
import { getUsetById } from "utils/api/getUserByToken";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const initializeNaverLogin = () => {
    setLoading(true);
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 4, height: "60" } //버튼의 스타일, 타입, 크기를 지정
    });

    const location = window.location.href.split("=")[1];
    const token = location.split("&")[0];
    localStorage.setItem("token", token);

    naverLogin.init();

    naverLogin.getLoginStatus(async (status: boolean) => {
      if (!status) {
        setLoading(false);
        return router.push("/login");
      }

      if (naverLogin.user.id) {
        const isSuccess = await getUserDataByNaverId(naverLogin.user.id, token);
        if (isSuccess) {
          return router.push("/profile");
        }
      }

      if (
        !(
          naverLogin.user.name &&
          naverLogin.user.email &&
          naverLogin.user.gender
        )
      ) {
        // todo: 시스템 얼랏 말고 앱 얼랏으로 - 디자인 짜면 시작합시다
        alert("이름, 이메일, 성별은 필수값 입니다.");
        return naverLogin.reprompt();
      } else {
        registerUser(naverLogin.user, token);
      }
    });
  };

  const getUserDataByNaverId = async (id: string, token: string) => {
    const user = await getUsetById(id);

    if (user) {
      setLoading(false);
      setDocFirebase({
        dbColumn: "users",
        dbKey: id,
        setType: "selectKey",
        payload: { token }
      });
      dispatch(login(user));
      return true;
    }
    return false;
  };

  const registerUser = async (user: any, token: string) => {
    const { id, name, profile_image, email, gender } = user;

    const payload = {
      id,
      token,
      name: name,
      profileImage: profile_image,
      email: email || "",
      gender: gender,
      admin: [
        2042204892,
        2054570117,
        "H1_M_Ltmuf0LFgblEIxDv71gDCaQwA3Y7vEWuO7yzbU"
      ].includes(id),
      loginType: "naver",
      nickName: name
    };
    setDocFirebase({
      dbColumn: "users",
      dbKey: id,
      setType: "selectKey",
      payload
    });
    localStorage.setItem("token", token);
    dispatch(login(payload));

    setLoading(false);
    router.push("/profile");
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div id="naverIdLogin" />
    </div>
  );
};

export default Index;
