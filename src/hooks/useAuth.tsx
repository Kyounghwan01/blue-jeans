import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "app/store";
import { logOut } from "features/userSlice";
import usePopup from "hooks/usePopup";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { logoutKakao, withDrawalKakao } from "utils/api/kakao";
import deleteImageFirebase from "utils/api/deleteImageFirebase";
import { QnaType } from "features/types/qnaSliceType";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [handlePopup] = usePopup();

  const logoutFunc = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");

      if (user.loginType === "kakao") {
        await logoutKakao();
      }

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

        // 탈퇴시 1:1 문의 전체 삭제
        deleteQna(user.id || 0);
      };

      if (user.loginType === "kakao") {
        await withDrawalKakao(withDrawlSuccessCallback);
      } else if (user.loginType === "naver") {
        withDrawlSuccessCallback();
        axios.get(
          `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}&access_token=${user.token}&service_provider=NAVER`
        );
      }

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

  const deleteQna = async (id: number | string) => {
    const qnaRef = collection(db, "qna");
    const q = await query(qnaRef, where("userId", "==", id));
    const data = await getDocs(q);
    const deleteQnaList = data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }) as QnaType[];

    deleteQnaList.forEach(qna => {
      const userDoc = doc(db, "qna", String(qna.id));
      deleteDoc(userDoc);
      qna.imgUrl.forEach(url => {
        deleteImageFirebase(url);
      });
    });
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
