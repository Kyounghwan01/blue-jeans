import styled from "styled-components";
import { Dispatch, SetStateAction, useCallback, memo } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

interface IFooter {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

const Footer = ({ tab, setTab }: IFooter) => {
  const router = useRouter();

  const goProfile = useCallback(() => {
    router.push("/profile");
  }, []);

  const goFriend = useCallback(() => {
    router.push("/friend-chat");
  }, []);

  const goEducation = useCallback(() => {
    router.push("/education");
  }, []);

  return (
    <Block>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction
            onClick={goEducation}
            label="education"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            onClick={goFriend}
            label="friend-chat"
            icon={<ArchiveIcon />}
          />
          <BottomNavigationAction
            onClick={goProfile}
            label="프로필"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Block>
  );
};

const Block = styled.footer`
  .Mui-selected {
    /* color: blue; */
  }
`;

export default memo(Footer);
