import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const storage = getStorage();

interface IupdateDocFirebae {
  directoryName: string;
  fileArray: File[];
  resolveFunction: any;
  rejectFunction: any;
}

const uploadImageFirebase = async ({
  directoryName,
  fileArray,
  resolveFunction,
  rejectFunction
}: IupdateDocFirebae) => {
  const promises = [] as any;
  fileArray.map(blob => {
    const Task = new Promise(function (resolve, reject) {
      const uniqueKey = new Date().getTime();
      const _name = blob.name
        .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
        .split(" ")
        .join("");

      const metaData = {
        contentType: blob.type
      };
      const storageRef = sRef(storage, directoryName + _name + uniqueKey);
      const UploadTask = uploadBytesResumable(storageRef, blob, metaData);
      UploadTask.on(
        "state_changed",
        () => {},
        error => {
          reject(error);
        },
        async () => {
          await getDownloadURL(UploadTask.snapshot.ref).then(downloadUrl => {
            resolve(downloadUrl);
          });
        }
      );
    });
    promises.push(Task);
  });

  Promise.all(promises)
    .then(res => {
      console.log("wow");
      resolveFunction(res);
    })
    .catch(e => rejectFunction(e));
};

export default uploadImageFirebase;
