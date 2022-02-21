import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import setDocFirebase from "utils/api/setDocFirebase";
import { collection, query, getDocs } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import Link from "next/link";

interface IChatRoom {
  id: string;
}

const Index = () => {
  const router = useRouter();
  const [room, setRoom] = useState<
    {
      id: string;
      desc: string;
      memberCount: number;
      owner: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    // 일단 다 긁어오기
    const roomRef = collection(db, "chat-room");
    const data = await getDocs(await query(roomRef));
    const roomList = data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setRoom(roomList);
  };

  const createOpenChat = async () => {
    console.log(1);
    const res = await setDocFirebase({
      dbColumn: "chat-room",
      setType: "anonymous",
      // owner: user-uid
      payload: {
        owner: "2042204892",
        title: 222,
        desc: 333,
        tag: [1, 2, 3],
        memberCount: 1,
      },
    });
    console.log(res);

    const resCreateMember = await setDocFirebase({
      dbColumn: "chat-room-member",
      dbKey: String(res.id),
      setType: "selectKey",
      payload: {
        owner: "2042204892",
        member: ["2042204892"],
      },
    });
    console.log(resCreateMember);
  };

  // owner, title, desc, img, tag

  // todo: list에 paging해야하는데 sort type이 뭔지 모르겠네

  return (
    <BasicLayout
      headerTitle="오픈챗"
      back={false}
      footer={true}
      loading={false}
    >
      {room.length && (
        <Link href={`/open-chat/${room[0].id}`}>{JSON.stringify(room)}</Link>
      )}
      <button onClick={createOpenChat}>create</button>
    </BasicLayout>
  );
};

export default Index;
