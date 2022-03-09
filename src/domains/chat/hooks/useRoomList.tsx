import { useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "utils/api/firebase";
import setDocFirebase from "utils/api/setDocFirebase";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import { setRoom } from "features/chatSlice";

interface IChatRoom {
  id: string;
  desc: string;
  member: string[];
  owner: string;
  title: string;
  isSecret: boolean;
  ban: string;
}

const useRoomList = () => {
  const dispatch = useDispatch();
  const { roomList } = useSelectorTyped(state => ({
    roomList: state.chat.roomList
  }));

  const getRoom = async () => {
    const roomRef = collection(db, "chat-room");
    const data = await getDocs(
      await query(roomRef, where("member", "array-contains", "2042204892"))
    );
    const roomList = data.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }) as IChatRoom[];
    dispatch(setRoom(roomList));
  };

  useEffect(() => {
    getRoom();
  }, []);

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
        // lastTimeStamp으로: ''
      }
    });
  };

  return { roomList, createOpenChat };
};

export default useRoomList;
