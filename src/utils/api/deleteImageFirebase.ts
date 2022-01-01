import { getStorage, ref as sRef, deleteObject } from "firebase/storage";
import { getPathStorageFromUrl } from "utils";
const storage = getStorage();

const deleteImageFirebase = (image: string) => {
  const prevImage = getPathStorageFromUrl(image);
  const desertRef = sRef(storage, prevImage);
  deleteObject(desertRef)
    .then(() => {
      console.log(`delete success`);
    })
    .catch(error => {
      console.log(`delete ${error}`);
    });
};

export default deleteImageFirebase;
