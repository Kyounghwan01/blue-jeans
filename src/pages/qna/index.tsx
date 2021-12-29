import { useState, useCallback } from "react";
import BasicLayout from "components/common/BasicLayout";
import Question from "components/qna/Question";
import QuestionList from "components/qna/QuestionList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Index = () => {
  const [tab, setTab] = useState(0);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  return (
    <BasicLayout headerTitle="1:1 문의" back={true} footer={false}>
      <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
        <Tab label="문의하기" />
        <Tab label="문의내역" />
      </Tabs>
      {!tab ? <Question setTab={setTab} /> : <QuestionList />}
    </BasicLayout>
  );
};

export default Index;
