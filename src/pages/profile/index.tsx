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
  const [logout, withDrawal] = useAuth();

  const goLogin = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <BasicLayout headerProps={{ title: "마이페이지", back: false }}>
      <Block>
        {!user.isLogin && (
          <section className="non-login" onClick={goLogin}>
            <Avatar src="/static/image/non-avator.png" />
            <div className="non-login__desc">
              <div className="non-login__desc__title">
                로그인하기 <ChevronRightIcon />
              </div>
              <div>로그인 후 청바지 서비스를 즐겨보세요!</div>
            </div>
          </section>
        )}
        <Divider sx={{ borderWidth: "3px", borderColor: "#eeeeee" }} />
        <List>
          <CustomList
            title="공지사항"
            // icon={<CampaignOutlinedIcon sx={{ fontSize: 28 }} />}
            func={() => console.log(1)}
          />
          <CustomList
            title="자주 묻는 질문"
            // icon={<HelpOutlineIcon />}
            func={() => console.log(1)}
          />
          {user.isLogin && (
            <>
              <CustomList
                title="로그아웃"
                // icon={<HelpOutlineIcon />}
                func={logout}
              />
              <CustomList
                title="탈퇴하기"
                // icon={<HelpOutlineIcon />}
                func={withDrawal}
              />
            </>
          )}
        </List>
        {JSON.stringify(user)}
        <h2>{user.id}</h2>
        <h2>{user.name}</h2>
        <img src={user.profileImage} alt="profile" />
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
`;
export default Profile;
