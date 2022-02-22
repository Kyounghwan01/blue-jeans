import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "utils/api/firebase";
import { UserSliceStateType } from "features/types/userSliceType";

export const getUserByToken = async (token: string) => {
  const usersCollectionRef = collection(db, "users");
  const q = await query(
    usersCollectionRef,
    where("token", "==", String(token))
  );

  const data = await getDocs(q);
  const user = data.docs.map(doc => ({
    ...doc.data()
  }))[0] as UserSliceStateType;
  return user;
};

export const getUsetById = async (id: string) => {
  const user = await getDoc(await doc(db, "users", id));
  if (user) {
    return user.data() as UserSliceStateType;
  }
  return null;
};
