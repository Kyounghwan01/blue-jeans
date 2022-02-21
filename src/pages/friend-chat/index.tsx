import { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import useAuth from "hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const Index = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { loading } = useAuth();

  const goAddFriend = useCallback(() => {
    router.push("/friend-chat/add");
  }, []);

  return (
    <BasicLayout
      headerTitle="친구"
      back={false}
      footer={true}
      loading={loading}
    >
      <Block>
        {/* 이 컴포넌트는 withAuth true */}
        {/* <section className="login" onClick={goProfileEdit}>
          <Avatar src={user.profileImage} />
          <div className="non-login__desc">
            <div className="non-login__desc__title custom-font-header-title">
              {user.nickName || user.name}
            </div>
            <div className="custom-font-content">{user.email}</div>
          </div>
        </section> */}

        {/* <List>
          {user.isLogin && (
            <CustomList title="프로필 수정" func={goProfileEdit} />
          )}
          <CustomList title="공지사항" func={() => console.log("공지사항")} />
          <CustomList title="고객센터" func={goCustomerCenter} />
          {user.isLogin && (
            <>
              <CustomList
                title="내 글 목록"
                func={() => console.log("글목록")}
              />
              <CustomList title="로그아웃" func={logout} />
              <CustomList title="탈퇴하기" func={withDrawal} />
            </>
          )}
          <CustomList title="폰트사이즈수정" func={goEditFontSize} />
        </List> */}

        <Fab
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          aria-label={"Add"}
          color="primary"
          onClick={goAddFriend}
        >
          <AddIcon />
        </Fab>
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  .non-login {
    display: flex;
    align-items: center;
    padding: 40px 16px;
    .MuiAvatar-root {
      margin-right: 15px;
      border: 2px solid #aaa;
      width: 45px;
      height: 45px;
    }
    &__desc {
      &__title {
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
  .login {
    display: flex;
    align-items: center;
    padding: 25px 16px;
    .MuiAvatar-root {
      margin-right: 20px;
      border: 2px solid #aaa;
      width: 60px;
      height: 60px;
    }
    &__desc {
      &__title {
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default Index;
