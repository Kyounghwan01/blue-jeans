import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter
} from "firebase/firestore";
import { db } from "utils/api/firebase";
import setDocFirebase from "utils/api/setDocFirebase";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import { setChat, pushChat } from "features/chatSlice";
import { getFirebaseDocs } from "utils";
import { ChatType } from "features/types/chatSliceType";

const useChatRoom = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const dispatch = useDispatch();
  const { chat } = useSelectorTyped(state => ({
    chat: state.chat.chat
  }));

  useEffect(() => {
    const chatRef = collection(db, `chat-message/${chatId}/message`);

    const lastOne = query(chatRef, orderBy("timestamp", "desc"), limit(1));

    const unsubscribe = onSnapshot(lastOne, querySnapshot => {
      const lastChat = getFirebaseDocs<ChatType>(querySnapshot);

      if (!lastChat.length) {
        return;
      }

      dispatch(pushChat(lastChat[0]));
    });

    return unsubscribe;
  }, []);

  const getPrevChat = async () => {
    const userDoc = await getDoc(
      doc(db, `chat-message/${chatId}/message`, String(chat[0].id))
    );

    const chatRef = collection(db, `chat-message/${chatId}/message`);
    const lastest25 = await query(
      chatRef,
      orderBy("timestamp", "desc"),
      startAfter(userDoc),
      limit(5)
    );
    const data = await getDocs(lastest25);
    const latest25List = getFirebaseDocs<ChatType>(data).reverse();

    dispatch(setChat([...latest25List, ...chat]));
  };

  const submit = useCallback(async (text: string) => {
    if (!text) return;
    setDocFirebase({
      dbColumn: `chat-message/${chatId}/message`,
      setType: "anonymous",
      payload: {
        content: text,
        img: "",
        sendBy: "2042204892",
        timestamp: new Date().getTime()
      }
    });
  }, []);

  return { chat, submit, getPrevChat };
};
export default useChatRoom;
