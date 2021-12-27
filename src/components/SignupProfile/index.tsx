import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import Avatar from "@mui/material/Avatar";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = getStorage();

interface ISignupProfile {
  title: string;
  hideModal: () => void;
}

// interface Input<T extends EventTarget> extends InputEvent {
//   target: T;
// }

const Index = ({ title, hideModal }: ISignupProfile) => {
  const user = useSelector((state: RootState) => state.user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //파일 불러오기
    event.preventDefault();
    if (!event.target.files) return;
    const file = event.target.files[0];
    console.log("file", file);
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewURL(reader.result as string);

      // file 따로 저장했다가 수정 완료되면 그때 한번에 저장
      saveToFirebaseStorage(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveToFirebaseStorage = (file: File) => {
    const uniqueKey = new Date().getTime();
    const _name = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type,
    };

    const storageRef = sRef(storage, "Images/" + _name + uniqueKey);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(`완료 url: ${downloadUrl}`);
        });
      }
    );
  };

  const handleFileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //버튼 대신 클릭하기
    e.preventDefault();
    if (!fileRef.current) return;
    fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
  };

  const editProfile = () => {
    // 1. 이미지 올리고 받은 url 전송 -> 2. url 받았다면 기존에 db에 있는 이미지 fireStore에 있으면 삭제 -> 3. 삭제 완료하면 update
  };

  return (
    <Block>
      <BasicLayout
        headerProps={{ title: "프로필 편집", back: true, backFunc: hideModal }}
        footer={false}
      >
        <article>
          <header>{title}</header>
          <input
            ref={fileRef}
            id="file"
            type="file"
            onChange={handleFileOnChange}
            hidden={true}
          />
          <Avatar
            src={previewURL || user.profileImage}
            onClick={handleFileButtonClick}
            style={{ width: "200px", height: "200px" }}
          />
          {JSON.stringify(user)}
          <button onClick={hideModal}>닫기</button>
        </article>
      </BasicLayout>
    </Block>
  );
};

const Block = styled.dialog`
  padding: 0;
  border: none;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: flex;
  letter-spacing: -1px;
  background: white;
`;
export default Index;
