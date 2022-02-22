import { useRouter } from "next/router";
import { collection, query, getDoc, doc } from "firebase/firestore/lite";
import { db } from "utils/api/firebase";

const Chat = () => {
  const router = useRouter();
  const { chatId } = router.query;

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
    console.log(memberList);
    const res = await memberList.reduce(async (acc, cur): Promise<any> => {
      const jobsArray = (await acc) as {
        profileImage: string;
        nickName: string;
      }[];

      const userDoc = doc(db, "users", String(cur));
      const userRes = (await (await getDoc(userDoc)).data()) as {
        profileImage: string;
        nickName: string;
      } | null;
      console.log(userRes);
      if (userRes) {
        jobsArray.push(userRes);
      }

      return jobsArray;
    }, Promise.resolve([]));
    console.log(res);
    // memberList.forEach(async (memberId) => {
    //   const userDoc = doc(db, "users", String(memberId));
    //   const res = await (await getDoc(userDoc)).data();
    //   console.log(res);
    // });
  };

  return (
    <div>
      test {chatId}
      <button onClick={getMembers}>get members</button>
    </div>
  );
};

export default Chat;
