import { useEffect, useCallback, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { useSelector, useDispatch } from "react-redux";
import { getQnaList, setQna } from "features/qnaSlice";
import { RootState } from "app/store";
import { QnaType } from "features/types/qnaSliceType";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";

const QuestionList = ({
  loading,
  setLoading
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { list, tab } = useSelector((state: RootState) => state.qna);

  useEffect(() => {
    getQna();
  }, [tab]);

  const getQna = async () => {
    setLoading(true);
    if (!user.id) {
      return setLoading(false);
    }
    const qnaRef = collection(db, "qna");

    const constraints = [];
    if (tab === 1) {
      constraints.push(where("userId", "==", user.id));
    }

    const q = await query(qnaRef, ...constraints);
    const data = await getDocs(q);
    const qnaList = data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }) as QnaType[];
    console.log(qnaList);
    dispatch(getQnaList(qnaList));
    setLoading(false);
  };

  const selectQna = useCallback((data: QnaType) => {
    dispatch(setQna(data));
    router.push("/qna/qna-detail");
  }, []);

  return (
    <Block>
      {list.length ? (
        <>
          {list.map((data, index) => (
            <section
              className="list-container"
              key={index}
              data-name={index}
              onClick={() => selectQna(data)}
            >
              <div className="list-container__content">
                <div className="list-container__content__time">
                  {dayjs(data.timestamp).format("YYYY. MM. DD.")}
                </div>
                <div className="list-container__content__title">
                  {data.title}
                </div>
              </div>
              <Chip
                label={data.status === "pending" ? "대기" : "답변완료"}
                color="primary"
                variant={data.status === "pending" ? "outlined" : "filled"}
              />
            </section>
          ))}
        </>
      ) : (
        <>
          {!loading && (
            <section className="no-qna">문의 내역이 없습니다</section>
          )}
        </>
      )}
    </Block>
  );
};

const Block = styled.article`
  padding: 10px 20px;
  height: calc(100% - 48px);
  .MuiChip-root {
    width: 80px;
    font-size: 15px;
  }
  .list-container {
    padding: 13px 0;
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    width: 100%;

    &__content {
      overflow: auto;
      margin-right: 20px;
      &__time {
        color: #bbb;
        font-size: 16px;
        margin-bottom: 5px;
      }
      &__title {
        font-size: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .no-qna {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    img {
      width: 200px;
      height: 100px;
    }
  }
`;

export default QuestionList;
