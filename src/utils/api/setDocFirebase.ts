import { db } from "utils/api/firebase";
import { setDoc, doc, collection, addDoc } from "firebase/firestore/lite";

interface IsetDocFirebase {
  dbColumn: string;
  dbKey?: string;
  payload: any;
  setType: "selectKey" | "anonymous";
}

const setDocFirebase = async ({
  dbColumn,
  dbKey = "",
  payload,
  setType = "selectKey"
}: IsetDocFirebase) => {
  try {
    if (setType === "selectKey") {
      await setDoc(doc(db, dbColumn, dbKey), payload);
      return { isSuccess: true };
    } else {
      await addDoc(collection(db, dbColumn), payload);
      return { isSuccess: true };
    }
  } catch (e) {
    return { isSuccess: false, errMessage: JSON.stringify(e) };
  }
};

export default setDocFirebase;
