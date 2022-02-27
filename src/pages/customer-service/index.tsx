import { useRouter } from "next/router";
import BasicLayout from "components/common/BasicLayout";
import CustomList from "components/common/CustomList";
import List from "@mui/material/List";

const Index = () => {
  const router = useRouter();

  return (
    <BasicLayout headerTitle="고객센터" back={true} footer={false}>
      <List>
        <CustomList title="1:1 문의" func={() => router.push("/qna")} />
        <CustomList title="자주 묻는 질문" func={() => router.push("/faq")} />
        <CustomList title="이용약관" func={() => {}} />
        <CustomList title="개인정보처리방침" func={() => {}} />
      </List>
    </BasicLayout>
  );
};

export default Index;
