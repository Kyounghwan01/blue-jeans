import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import useAuth from "hooks/useAuth";
import SearchIcon from "@mui/icons-material/Search";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  limit,
  startAfter,
  doc,
} from "firebase/firestore/lite";
import { db } from "utils/api/firebase";
import { ADD_FRIEND_USER_LIMIT } from "utils/constants";

const Index = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { logout, withDrawal, loading } = useAuth();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    // todo: 전체 유저 가져오고
    initUsers();

    // todo: 현재 유저에 대해 친구와 차단친구 목록 가져오기
    getFriendBlackFriendData();
  }, []);

  const initUsers = async () => {
    const q = await query(usersCollectionRef, limit(ADD_FRIEND_USER_LIMIT));

    const documentSnapshots = await getDocs(q); // 2번까지 가져옴
    // todo: 가져온거 slice에 넣어야함

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]; // 가장 최근인 2번만 가져옴

    // todo: 마지막 페이지를 어떻게 알수있을까?? -> next 값이 없으면 끝난걸까??
    const next = query(
      usersCollectionRef,
      startAfter(lastVisible),
      limit(ADD_FRIEND_USER_LIMIT)
    );

    const data = await getDocs(next); // 2번 이후 3번부터 27번까지 가져옴
    const newData = data.docs.map((doc) => ({ ...doc.data() }));
    console.log(newData);
  };

  const getFriendBlackFriendData = async () => {
    // todo: utils
    const friendDoc = doc(db, "users", String(user.id));
    const friendList = await (await getDoc(friendDoc)).data();

    console.log(friendList);
  };

  return (
    <BasicLayout
      headerTitle="친구 추가"
      back={true}
      footer={true}
      loading={loading}
    >
      <Block>
        <SearchIcon />
        {/* todo:  */}
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  .non-login {
    display: flex;
    align-items: center;
    padding: 40px 16px;
    .MuiAvatar-root {
      margin-right: 15px;
      border: 2px solid #aaa;
      width: 45px;
      height: 45px;
    }
    &__desc {
      &__title {
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
  .login {
    display: flex;
    align-items: center;
    padding: 25px 16px;
    .MuiAvatar-root {
      margin-right: 20px;
      border: 2px solid #aaa;
      width: 60px;
      height: 60px;
    }
    &__desc {
      &__title {
        font-weight: bold;
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default Index;
