import styled from "styled-components";
import Link from "next/link";
import useRoomList from "domains/chat/hooks/useRoomList";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const RoomList = () => {
  const { roomList, createOpenChat } = useRoomList();

  return (
    <RoomListBlock>
      {roomList.map(el => (
        <Link key={el.id} href={`/open-chat/room?chatId=${el.id}`}>
          <a
            style={{
              border: "1px solid black",
              display: "block",
              margin: "10px"
            }}
          >
            {el.title} <span>{el.member.length}명</span> <span>{el.desc}</span>
          </a>
        </Link>
      ))}
      <Fab
        sx={{ position: "fixed", bottom: 80, right: 30 }}
        aria-label={"Add"}
        color="primary"
        onClick={createOpenChat}
      >
        <AddIcon />
      </Fab>
    </RoomListBlock>
  );
};

const RoomListBlock = styled.article``;

export default RoomList;
