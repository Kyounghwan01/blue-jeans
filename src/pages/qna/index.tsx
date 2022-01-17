import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicLayout from "components/common/BasicLayout";
import Question from "components/qna/Question";
import QuestionList from "components/qna/QuestionList";
import withAuth from "components/common/withAuth";
import { setTab } from "features/qnaSlice";
import { RootState } from "app/store";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useQuery } from "react-query";
import { getQnaList } from "features/qnaSlice";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { QnaType } from "features/types/qnaSliceType";

const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { tab } = useSelector((state: RootState) => state.qna);

  const getQna = async (payload: { queryKey: unknown[] }) => {
    if (!payload.queryKey[1]) {
      return;
    }
    const qnaRef = collection(db, "qna");

    const constraints = [];
    if (tab === 1) {
      constraints.push(where("userId", "==", payload.queryKey[1]));
    }

    const data = await getDocs(await query(qnaRef, ...constraints));
    return data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  };

  const { isLoading } = useQuery(["getQna", user.id], getQna, {
    enabled: tab === 1,
    refetchOnWindowFocus: false,
    onSuccess: (data: QnaType[]) => {
      dispatch(getQnaList(data));
    },
  });

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      dispatch(setTab(newValue));
    },
    []
  );

  return (
    <BasicLayout
      headerTitle="1:1 문의"
      back={true}
      footer={false}
      loading={isLoading}
    >
      <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
        <Tab label="문의하기" />
        <Tab label="문의내역" />
        {user.admin && <Tab label="문의답변" />}
      </Tabs>
      {!tab ? <Question /> : <QuestionList loading={isLoading} />}
    </BasicLayout>
  );
};

export default withAuth(Index);
