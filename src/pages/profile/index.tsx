import { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import List from "@mui/material/List";
import CustomList from "components/common/CustomList";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useAuth from "hooks/useAuth";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { logout, withDrawal, loading } = useAuth();

  const goLogin = useCallback(() => {
    router.push("/login");
  }, []);

  const goProfileEdit = useCallback(() => {
    router.push("/edit-profile");
  }, []);

  return (
    <BasicLayout headerTitle="마이페이지" back={false} loading={loading}>
      <Block>
        {!user.isLogin ? (
          <section className="non-login" onClick={goLogin}>
            <Avatar src="/static/image/non-avator.png" />
            <div className="non-login__desc">
              <div className="non-login__desc__title">
                로그인하기 <ChevronRightIcon />
              </div>
              <div>로그인 후 청바지 서비스를 즐겨보세요!</div>
            </div>
          </section>
        ) : (
          <section className="login" onClick={goProfileEdit}>
            <Avatar src={user.profileImage} />
            <div className="non-login__desc">
              <div className="non-login__desc__title">
                {user.nickName || user.name}
              </div>
              <div>{user.email}</div>
            </div>
          </section>
        )}
        <Divider sx={{ borderWidth: "3px", borderColor: "#eeeeee" }} />
        <List>
          {user.isLogin && (
            <CustomList title="프로필 수정" func={goProfileEdit} />
          )}
          <CustomList title="공지사항" func={() => console.log("공지사항")} />
          <CustomList title="자주 묻는 질문" func={() => console.log(1)} />
          {user.isLogin && (
            <>
              <CustomList title="로그아웃" func={logout} />
              <CustomList title="탈퇴하기" func={withDrawal} />
            </>
          )}
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
        font-size: 20px;
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
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default Profile;
