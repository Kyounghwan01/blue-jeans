import { useDispatch } from "react-redux";
import { setKakao } from "features/commonSlice";
import { login } from "features/userSlice";
import { UserSliceStateType } from "features/types/userSliceType";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { getKakaoUser } from "utils/api/kakao";
import { getUserByToken } from "utils/api/getUserByToken";

const useGetUsers = () => {
  const dispatch = useDispatch();

  const getUserToFirebaseForToken = async (token: string) => {
    const user = await getUserByToken(token);
    if (!user) return;
    dispatch(login(user));
  };

  const getUserToFirebaseForId = async (id: string) => {
    const userDoc = doc(db, "users", id);
    const user = await (await getDoc(userDoc)).data();

    if (!user) return;
    dispatch(login(user as UserSliceStateType));
    localStorage.setItem("token", user.token);
  };

  const getUsers = async () => {
    // 필요할때 세팅하는게 좋을꺼같은데
    const kakao = window.Kakao;
    if (!kakao.Auth) {
      const kakaoClientKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
      if (kakaoClientKey) {
        kakao.init(kakaoClientKey);
        dispatch(setKakao(kakao));
      }
    }

    // todo: 어떤 매체로 로그인했는지 필요, naver init 여기서 시작하고 store에 넣기
    const localToken = localStorage.getItem("token");
    if (localToken) {
      getUserToFirebaseForToken(localToken);
    } else {
      const token = kakao?.Auth?.getAccessToken();
      if (token) {
        const res = await getKakaoUser();
        getUserToFirebaseForId(String(res.id));
      }
    }
  };

  return [getUsers];
};

export default useGetUsers;
