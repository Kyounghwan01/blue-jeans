import { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import BasicLayout from "components/common/BasicLayout";
import List from "@mui/material/List";
import CustomList from "components/common/CustomList";

const Index = () => {
  const router = useRouter();

  return (
    <BasicLayout headerTitle="영상탭" back={true} footer={true}>
      <Block>
        <List>
          <CustomList
            title="음식점 키오스크"
            func={() => router.push("/education/kiosk/food/tutorial")}
          />
          <CustomList
            title="열차 키오스크"
            func={() => router.push("/education/kiosk/transportation/tutorial")}
          />
          <CustomList
            title="영화 키오스크"
            func={() => router.push("/education/kiosk/movie/tutorial")}
          />
        </List>
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article``;
export default Index;
