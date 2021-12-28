import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import TextField from "@mui/material/TextField";
import { RootState } from "app/store";
import {
  setNickName as setNickNameDispatch,
  setImageNickName,
} from "features/userSlice";
import BasicLayout from "components/common/BasicLayout";
import FixedBottomButton from "components/common/FixedBottomButton";
import {
  compressImage,
  getPathStorageFromUrl,
  validtionCriteria,
  validation,
} from "utils";
import { db } from "utils/api/firebase";
import { updateDoc, doc } from "firebase/firestore/lite";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const storage = getStorage();

const Index = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [nickName, setNickName] = useState<string | undefined>(user.nickName);
  const [validNickName, setValidNickName] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [compressedImageState, setCompressedImage] = useState<File | null>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "nickName":
        setNickName(e.currentTarget.value);
        setValidNickName(
          validation(e.currentTarget.value, validtionCriteria.nickName)
        );
      default:
        setNickName(e.currentTarget.value);
    }
  }, []);

  const handleFileOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!event.target.files) return;
      const file = event.target.files[0];
      const compressedImage = (await compressImage(file)) as File;
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
        setCompressedImage(compressedImage);
      };
      if (compressedImage) reader.readAsDataURL(compressedImage);
    },
    []
  );

  const saveToFirebaseStorage = async (file: File) => {
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
        // todo: 이미지 저장 실패 팝업
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then(async (downloadUrl) => {
          console.log(`완료 url: ${downloadUrl}`);
          console.log(user.profileImage);
          const userDoc = doc(db, "users", String(user.id));
          // todo: promise all로 한번에 처리
          await updateDoc(userDoc, { nickName, profileImage: downloadUrl });
          if (user.profileImage.includes("firebase")) {
            const prevImage = getPathStorageFromUrl(user.profileImage);
            const desertRef = sRef(storage, prevImage);
            deleteObject(desertRef)
              .then(() => {
                console.log(`delete success`);
              })
              .catch((error) => {
                console.log(`delete ${error}`);
              });
          }
          dispatch(
            setImageNickName({ url: downloadUrl, nickName: nickName as string })
          );
        });
      }
    );
  };

  const handleFileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const updateProfile = async () => {
    const userDoc = doc(db, "users", String(user.id));
    if (compressedImageState) {
      saveToFirebaseStorage(compressedImageState);
    } else {
      // todo: 성공, 에러 팝업 핸들러, 성공하고 저장
      await updateDoc(userDoc, { nickName });
      dispatch(setNickNameDispatch(nickName as string));
    }
  };

  return (
    <BasicLayout headerTitle="프로필 편집" back={true} footer={false}>
      <input
        ref={fileRef}
        id="file"
        type="file"
        onChange={handleFileOnChange}
        hidden={true}
      />
      <Block>
        <div className="edit-profile" onClick={handleFileButtonClick}>
          <div className="edit-profile__image">
            <Avatar src={previewURL || user.profileImage} />
            <div className="edit-profile__penceil">
              <CreateSharpIcon />
            </div>
          </div>
        </div>

        <TextField
          error={!validNickName}
          id="nickName"
          label="닉네임"
          value={nickName}
          placeholder="닉네임을 입력해주세요."
          helperText={!validNickName ? validtionCriteria.nickName.error : ""}
          variant="standard"
          fullWidth
          onChange={handleInput}
        />

        <TextField
          id="name"
          label="이름"
          value={user.name || ""}
          variant="standard"
          fullWidth
          disabled
        />

        <TextField
          id="email"
          label="이메일"
          value={user.email || ""}
          variant="standard"
          fullWidth
          disabled
        />

        <FixedBottomButton
          title="저장"
          onClick={updateProfile}
          disabled={!validNickName}
        />
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  padding: 0 16px;
  .MuiAvatar-root {
    margin-right: 15px;
    border: 2px solid #aaa;
    width: 100px;
    height: 100px;
  }
  .MuiSvgIcon-root {
    width: 20px;
  }
  .MuiFormControl-root {
    height: 75px;
  }
  .edit-profile {
    position: relative;
    margin: 30px 0;
    &__penceil {
      position: absolute;
      top: 70px;
      left: 55%;
      background: dodgerblue;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    &__image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default Index;
