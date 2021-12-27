import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { logOut } from "features/userSlice";
import usePopup from "hooks/usePopup";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";

const useAuth = () => {
  const { kakao } = useSelector((state: RootState) => state.common);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [handlePopup] = usePopup();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    kakao.Auth.logout(() => {
      dispatch(logOut());
    });
  };

  const withDrawalFunc = async () => {
    kakao.API.request({
      url: "/v1/user/unlink",
      success: async (response: string) => {
        console.log(response);
        const userDoc = doc(db, "users", String(user.id));
        await deleteDoc(userDoc);
      },
      fail: function (error: string) {
        console.log(error);
      },
    });
    // logout해야 token 끊김
    logoutFunc();
  };

  const logout = () => {
    handlePopup("common/Alert", "로그아웃", {
      desc: "정말 로그아웃 하시겠어요?",
      isConfirm: true,
      onClose: logoutFunc,
    });
  };

  const withDrawal = () => {
    handlePopup("common/Alert", "탈퇴하기", {
      desc: "정말 탈퇴 하시겠어요?",
      isConfirm: true,
      onClose: withDrawalFunc,
    });
  };

  return [logout, withDrawal];
};

export default useAuth;
