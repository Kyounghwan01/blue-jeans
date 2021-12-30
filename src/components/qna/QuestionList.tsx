import { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { useSelector, useDispatch } from "react-redux";
import { getQnaList } from "features/qnaSlice";
import { RootState } from "app/store";
import { QnaType } from "features/types/qnaSliceType";

const QuestionList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { list } = useSelector((state: RootState) => state.qna);

  useEffect(() => {
    getQna();
  }, []);

  const getQna = async () => {
    if (list.length) return;
    const qnaRef = collection(db, "qna");
    const q = await query(
      qnaRef,
      where("status", "!=", "finish"),
      where("id", "==", user.id)
    );
    const data = await getDocs(q);
    const qnaList = data.docs.map(doc => ({
      ...doc.data()
    })) as QnaType[];
    dispatch(getQnaList(qnaList));
  };

  return <article>문의내역</article>;
};

export default QuestionList;
