import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicLayout from "components/common/BasicLayout";
import Question from "components/qna/Question";
import QuestionList from "components/qna/QuestionList";
import { setTab } from "features/qnaSlice";
import { RootState } from "app/store";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { tab } = useSelector((state: RootState) => state.qna);

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
      loading={loading}
    >
      <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
        <Tab label="문의하기" />
        <Tab label="문의내역" />
        {user.admin && <Tab label="문의답변" />}
      </Tabs>
      {!tab ? (
        <Question />
      ) : (
        <QuestionList loading={loading} setLoading={setLoading} />
      )}
    </BasicLayout>
  );
};

export default Index;
