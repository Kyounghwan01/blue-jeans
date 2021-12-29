import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { logOut } from "features/userSlice";
import usePopup from "hooks/usePopup";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { logoutKakao, withDrawalKakao } from "utils/api/kakao";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [handlePopup] = usePopup();

  const logoutFunc = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      await logoutKakao();
      dispatch(logOut());
      handlePopup("common/Alert", "로그아웃", {
        desc: "로그아웃 하였습니다."
      });
    } catch (e) {
      handlePopup("common/Alert", "로그아웃 실패", {
        desc: (e as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  const withDrawalFunc = async () => {
    try {
      setLoading(true);
      const withDrawlSuccessCallback = async () => {
        const userDoc = doc(db, "users", String(user.id));
        await deleteDoc(userDoc);
      };

      await withDrawalKakao(withDrawlSuccessCallback);
      localStorage.removeItem("token");
      dispatch(logOut());
      handlePopup("common/Alert", "탈퇴 완료", {
        desc: "그동안 청바지를 이용해주셔서 감사합니다."
      });
    } catch (e) {
      handlePopup("common/Alert", "탈퇴 실패", {
        desc: (e as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    handlePopup("common/Alert", "로그아웃", {
      desc: "정말 로그아웃 하시겠어요?",
      isConfirm: true,
      onClose: logoutFunc
    });
  };

  const withDrawal = () => {
    handlePopup("common/Alert", "탈퇴하기", {
      desc: "정말 탈퇴 하시겠어요?",
      isConfirm: true,
      onClose: withDrawalFunc
    });
  };

  return { logout, withDrawal, loading };
};

export default useAuth;
