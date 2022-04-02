import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styled from "styled-components";

const LoginBlock = ({ goLogin }: { goLogin: () => void }) => {
  return (
    <Block>
      <section className="non-login" onClick={goLogin}>
        <Avatar src="/static/image/non-avator.png" />
        <div className="non-login__desc">
          <div className="non-login__desc__title custom-font-header-title">
            로그인하기 <ChevronRightIcon />
          </div>
          <div className="custom-font-content">
            로그인 후 청바지 서비스를 즐겨보세요!
          </div>
        </div>
      </section>
    </Block>
  );
};

const Block = styled.div`
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

export default LoginBlock;
