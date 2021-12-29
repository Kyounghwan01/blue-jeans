import { useDispatch } from "react-redux";
import { setKakao } from "features/commonSlice";
import { login } from "features/userSlice";
import { UserSliceStateType } from "features/types/userSliceType";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore/lite";
import { db } from "utils/api/firebase";

const useGetUsers = () => {
  const dispatch = useDispatch();

  const getUserToFirebaseForToken = async (token: string) => {
    const usersCollectionRef = collection(db, "users");
    const q = await query(usersCollectionRef, where("token", "==", token));
    const data = await getDocs(q);
    const user = data.docs.map(doc => ({
      ...doc.data()
    }))[0] as UserSliceStateType;

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
    const kakao = window.Kakao;
    if (!kakao.Auth) {
      const kakaoClientKey = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
      if (kakaoClientKey) {
        kakao.init(kakaoClientKey);
        dispatch(setKakao(kakao));
      }
    }

    const localToken = localStorage.getItem("token");
    if (localToken) {
      getUserToFirebaseForToken(localToken);
    } else {
      const token = kakao?.Auth?.getAccessToken();
      if (token) {
        const res = await kakao.API.request({ url: "/v2/user/me" });
        getUserToFirebaseForId(String(res.id));
      }
    }
  };

  return [getUsers];
};

export default useGetUsers;
