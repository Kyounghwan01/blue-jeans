import { useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "utils/api/firebase";
import BasicLayout from "components/common/BasicLayout";
import ChatRoom from "domains/chat/components/ChatRoom";
import { setChat } from "features/chatSlice";
import { useDispatch } from "react-redux";
import { ChatType } from "features/types/chatSliceType";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

const Chat = ({ latest25List }: { latest25List: ChatType }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChat(latest25List));
  }, []);

  // const getMembers = async () => {
  //   // 처음엔 10명만 스크롤 다운하면 다음 10명
  //   const userDoc = doc(db, "chat-room-member", String(chatId));
  //   const res = (await (await getDoc(userDoc)).data()) as {
  //     member: string[];
  //     owner: string;
  //   };

  //   getMemberProfile(res.member.slice(0, 10));
  // };

  // const getMemberProfile = async (memberList: string[]) => {
  //   const res = await memberList.reduce(
  //     async (
  //       acc,
  //       cur
  //     ): Promise<{ profileImage: string; nickName: string }[]> => {
  //       const userDoc = doc(db, "users", String(cur));
  //       const userRes = (await (await getDoc(userDoc)).data()) as {
  //         profileImage: string;
  //         nickName: string;
  //       } | null;

  //       if (userRes) {
  //         (await acc).push(userRes);
  //       }

  //       return acc;
  //     },
  //     Promise.resolve<{ profileImage: string; nickName: string }[]>([])
  //   );

  //   console.log(res);
  // };

  return (
    // todo: right icon 누르면 사용자 리스트
    <BasicLayout headerTitle="" back={true} footer={false}>
      <ChatRoom />
    </BasicLayout>
  );
};

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [
//       // String variant:
//       "/open-chat/roomId",
//       // Object variant:
//       { params: { chatId: "roomId" } }
//     ],
//     fallback: true
//   };
// };

// export const getStaticProps: GetStaticProps = async ({
//   params
// }: GetStaticPropsContext) => {
//   const chatRef = collection(db, `chat-message/${params?.chatId}/message`);
//   const lastest25 = await query(
//     chatRef,
//     orderBy("timestamp", "desc"),
//     limit(5)
//   );
//   const data = await getDocs(lastest25);
//   const latest25List = data.docs
//     .map(doc => {
//       return { id: doc.id, ...doc.data() };
//     })
//     .reverse();
//   latest25List.pop();

//   return {
//     props: {
//       latest25List
//     }
//   };
// };

export async function getServerSideProps(context: {
  query: { chatId: string };
}) {
  // todo:  loading 추가하기
  const chatRef = collection(
    db,
    `chat-message/${context.query.chatId}/message`
  );
  const lastest25 = await query(
    chatRef,
    orderBy("timestamp", "desc"),
    limit(25)
  );
  const data = await getDocs(lastest25);
  const latest25List = data.docs
    .map(doc => {
      return { id: doc.id, ...doc.data() };
    })
    .reverse();
  latest25List.pop();

  return {
    props: {
      latest25List
    }
  };
}

export default Chat;
