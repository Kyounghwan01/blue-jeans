import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import setDocFirebase from "utils/api/setDocFirebase";
import { db } from "utils/api/firebase";
import ChatInput from "./ChatInput";

const Chat = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const [chatList, setChat] = useState<
    {
      content: string;
      timestamp: string;
      sendBy: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const chatRef = collection(db, "chat-message/AQl1jDcW9l2YAcS4zaVE/message");

    const unsubscribe = onSnapshot(chatRef, querySnapshot => {
      const chat = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as {
        content: string;
        timestamp: string;
        sendBy: string;
        id: string;
      }[];
      console.log(chat);
      //todo: 스크롤 바닥으로
      setChat(chat);
    });

    return unsubscribe;
    // todo: 글 가져오기, 글쓰기, 무한스크롤
  }, []);

  const getMembers = async () => {
    // 처음엔 10명만 스크롤 다운하면 다음 10명
    const userDoc = doc(db, "chat-room-member", String(chatId));
    const res = (await (await getDoc(userDoc)).data()) as {
      member: string[];
      owner: string;
    };

    getMemberProfile(res.member.slice(0, 10));
  };

  const getMemberProfile = async (memberList: string[]) => {
    const res = await memberList.reduce(
      async (
        acc,
        cur
      ): Promise<{ profileImage: string; nickName: string }[]> => {
        const userDoc = doc(db, "users", String(cur));
        const userRes = (await (await getDoc(userDoc)).data()) as {
          profileImage: string;
          nickName: string;
        } | null;

        if (userRes) {
          (await acc).push(userRes);
        }

        return acc;
      },
      Promise.resolve<{ profileImage: string; nickName: string }[]>([])
    );

    console.log(res);
  };

  const submit = useCallback(async (text: string) => {
    setDocFirebase({
      dbColumn: `chat-message/AQl1jDcW9l2YAcS4zaVE/message`,
      dbKey: String(dayjs().unix()),
      setType: "selectKey",
      payload: {
        content: text,
        sendBy: "2042204892"
      }
    });
  }, []);

  return (
    <div>
      test {chatId}
      <button onClick={getMembers}>get members</button>
      <ChatInput submit={submit} />
      <div style={{ marginTop: "100px" }}>
        {chatList.map(chat => (
          <div key={chat.id}>
            {chat.content} {chat.timestamp}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
