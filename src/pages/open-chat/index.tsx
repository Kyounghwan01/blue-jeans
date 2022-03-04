import { useEffect, useState } from "react";
import BasicLayout from "components/common/BasicLayout";
import setDocFirebase from "utils/api/setDocFirebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "utils/api/firebase";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

interface IChatRoom {
  id: string;
  desc: string;
  memberCount: number;
  owner: string;
  title: string;
}

const Index = () => {
  const [room, setRoom] = useState<IChatRoom[]>([]);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    // 일단 다 긁어오기
    const roomRef = collection(db, "chat-room");
    const data = await getDocs(
      await query(roomRef, where("member", "array-contains", "2042204892"))
    );
    const roomList = data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }) as IChatRoom[];
    console.log(roomList);
    setRoom(roomList);
  };

  // 수익모델을 잘알고있다

  const createOpenChat = async () => {
    const res = await setDocFirebase({
      // chat-room || private-chat
      dbColumn: "chat-room",
      setType: "anonymous",
      // owner: user-uid
      payload: {
        owner: "2042204892",
        title: "bannnnetet",
        desc: "bannnnetet",
        tag: [1, 2, 3],
        isSecret: false,
        member: ["2042204892"],
        // 타인이 들어오면 룸에 ban: {name: 'name', list: []}
        ban: []
      }
    });

    // const resCreateMember = await setDocFirebase({
    //   dbColumn: "chat-room-member",
    //   dbKey: String(res.id),
    //   setType: "selectKey",
    //   payload: {
    //     owner: "2042204892",
    //     member: ["2042204892"],
    //   },
    // });
    // console.log(resCreateMember);
  };

  // owner, title, desc, tag

  // todo: list에 paging해야하는데 sort type이 뭔지 모르겠네, delete하면 방도 나가고, 글도 없어지고

  return (
    <BasicLayout
      headerTitle="오픈챗"
      back={false}
      footer={true}
      loading={false}
    >
      {room.map(el => (
        <Link key={el.id} href={`/open-chat/${el.id}`}>
          <a
            style={{
              border: "1px solid black",
              display: "block",
              margin: "10px"
            }}
          >
            {el.title} <span>{el.memberCount}명</span> <span>{el.desc}</span>
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
    </BasicLayout>
  );
};

export default Index;
