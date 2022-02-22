import { db } from "utils/api/firebase";
import { updateDoc, doc } from "firebase/firestore";

interface IsetDocFirebase {
  dbColumn: string;
  dbKey?: string;
  payload: any;
}

const updateDocFirebase = async ({
  dbColumn,
  dbKey = "",
  payload
}: IsetDocFirebase): Promise<{
  isSuccess: boolean;
  errMessage: string | null;
}> => {
  try {
    await updateDoc(doc(db, dbColumn, dbKey), payload);
    return { isSuccess: true, errMessage: null };
  } catch (e) {
    return { isSuccess: false, errMessage: JSON.stringify(e) };
  }
};

export default updateDocFirebase;
