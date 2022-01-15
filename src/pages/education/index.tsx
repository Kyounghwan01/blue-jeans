import { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import BasicLayout from "components/common/BasicLayout";
import List from "@mui/material/List";
import CustomList from "components/common/CustomList";

const Index = () => {
  const router = useRouter();

  const goKioskEducation = useCallback(() => {
    router.push("/education/kiosk/tutorial");
  }, []);

  return (
    <BasicLayout headerTitle="영상탭" back={true} footer={true}>
      <Block>
        <List>
          <CustomList title="키오스크" func={goKioskEducation} />
        </List>
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article``;
export default Index;
