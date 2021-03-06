import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { login } from "features/userSlice";
import { useDispatch } from "react-redux";
import usePopup from "hooks/usePopup";
import { KAKAO_REDIRECT_URI } from "utils/constants";
import { getKakaoUserToken, getKakaoUser } from "utils/api/kakao";
import setDocFirebase from "utils/api/setDocFirebase";
import { getUsetById } from "utils/api/getUserByToken";
import CallbackLogin from "pages/oauth/CallbackLogin";
import useSelectorTyped from "features/useSelectorTyped";

const Index = () => {
  const dispatch = useDispatch();
  const { handlePopup } = usePopup();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { kakao } = useSelectorTyped(state => state.common);

  useEffect(() => {
    if (kakao) {
      setUsers();
    }
  }, [kakao]);

  const setUsers = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const userProfileData = await getKakaoUser();
      const user = await getUsetById(String(userProfileData.id));

      if (user) {
        setDocFirebase({
          dbColumn: "users",
          dbKey: String(userProfileData.id),
          setType: "selectKey",
          payload: { token }
        });
        dispatch(login(user));
      } else {
        await registerUser(userProfileData, token);
      }

      setLoading(false);
      router.push("/profile");
    } catch (err) {
      setLoading(false);
      handlePopup("common/Alert", "로그인 취소", {
        desc: "로그인을 취소하셨습니다",
        onClose: () => router.push("/login")
      });
    }
  };

  const getToken = async () => {
    const response = await getKakaoUserToken({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code: new URL(window.location.href).searchParams.get("code"),
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET
    });

    // 로그인을 하고 refreshtoken을 다 알아야겠네
    // 접속할때마다  https://vlee.kr/4896
    kakao.Auth.setAccessToken(response.access_token);
    localStorage.setItem("token", response.access_token);
    return response.access_token;
  };

  const registerUser = async (
    userProfileData: { id: number; kakao_account: any },
    token: string
  ) => {
    const { id, kakao_account } = userProfileData;
    const {
      profile,
      email_needs_agreement,
      email,
      has_email,
      gender_needs_agreement,
      has_gender,
      gender
    } = kakao_account;

    const payload = {
      id,
      token,
      name: profile.nickname,
      nickName: profile.nickname,
      profileImage: profile.profile_image_url,
      email: !email_needs_agreement && has_email ? email : "",
      gender: !gender_needs_agreement && has_gender ? gender : "",
      admin: [2042204892, 2054570117].includes(id),
      loginType: "kakao"
    };
    setDocFirebase({
      dbColumn: "users",
      dbKey: String(id),
      setType: "selectKey",
      payload
    });
    dispatch(login(payload));
  };

  return <CallbackLogin loading={loading} />;
};

export default Index;
