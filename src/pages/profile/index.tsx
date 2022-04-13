import { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSelectorTyped from "features/useSelectorTyped";
import BasicLayout from "components/common/BasicLayout";
import List from "@mui/material/List";
import CustomList from "components/common/CustomList";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import useAuth from "hooks/useAuth";
import LoginBlock from "components/molecules/LoginBlock";

const Profile = () => {
  const router = useRouter();
  const user = useSelectorTyped(state => state.user);
  const { logout, withDrawal, loading } = useAuth();

  const goLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const goProfileEdit = useCallback(() => {
    router.push("/edit-profile");
  }, []);

  const goCustomerCenter = useCallback(() => {
    router.push("/customer-service");
  }, []);

  const goEditFontSize = useCallback(() => {
    router.push("/profile/font-size");
  }, []);

  return (
    <BasicLayout
      headerTitle="마이페이지"
      back={false}
      footer={true}
      loading={loading}
    >
      <Block>
        {!user.isLogin ? (
          <LoginBlock goLogin={goLogin} />
        ) : (
          <section className="non-login" onClick={goProfileEdit}>
            <Avatar src={user.profileImage} />
            <div className="non-login__desc">
              <div className="non-login__desc__title custom-font-header-title">
                {user.nickName || user.name}
              </div>
              <div className="custom-font-content">{user.email}</div>
            </div>
          </section>
        )}
        <Divider sx={{ borderWidth: "3px", borderColor: "#eeeeee" }} />
        <List>
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
        </List>
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  .non-login {
    background: var(--primary-color);
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 30px 25px;
    border-radius: 35px;

    .MuiAvatar-root {
      margin-right: 15px;
      width: 60px;
      height: 60px;
    }
    &__desc {
      color: white;
      &__title {
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default Profile;
