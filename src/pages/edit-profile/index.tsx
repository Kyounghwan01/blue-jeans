import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import TextField from "@mui/material/TextField";
import { RootState } from "app/store";
import {
  setNickName as setNickNameDispatch,
  setImageNickName
} from "features/userSlice";
import BasicLayout from "components/common/BasicLayout";
import FixedBottomButton from "components/common/FixedBottomButton";
import {
  compressImage,
  getPathStorageFromUrl,
  validtionCriteria,
  validation
} from "utils";
import usePopup from "hooks/usePopup";
import { db } from "utils/api/firebase";
import { updateDoc, doc } from "firebase/firestore/lite";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
const storage = getStorage();

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [nickName, setNickName] = useState<string>(user.nickName || "");
  const [validNickName, setValidNickName] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [compressedImageState, setCompressedImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [handlePopup] = usePopup();

  useEffect(() => {
    setValidNickName(validation(nickName, validtionCriteria.nickName));
  }, [nickName]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "nickName":
        setNickName(e.currentTarget.value);
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
      contentType: file.type
    };

    const storageRef = sRef(storage, "Images/" + _name + uniqueKey);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    UploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        setLoading(false);
        return handlePopup("common/Alert", "이미지업로드실패", {
          desc: JSON.stringify(error)
        });
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then(async downloadUrl => {
          const userDoc = doc(db, "users", String(user.id));
          await updateDoc(userDoc, { nickName, profileImage: downloadUrl });
          if (user.profileImage.includes("firebase")) {
            const prevImage = getPathStorageFromUrl(user.profileImage);
            const desertRef = sRef(storage, prevImage);
            deleteObject(desertRef)
              .then(() => {
                console.log(`delete success`);
              })
              .catch(error => {
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
    setLoading(true);
    const userDoc = doc(db, "users", String(user.id));
    if (compressedImageState) {
      saveToFirebaseStorage(compressedImageState);
    } else {
      await updateDoc(userDoc, { nickName });
      dispatch(setNickNameDispatch(nickName as string));
    }

    setLoading(false);
    handlePopup("common/Alert", "프로필", {
      desc: "프로필이 편집되었습니다.",
      onClose: () => router.push("/profile")
    });
  };

  return (
    <BasicLayout
      headerTitle="프로필 편집"
      back={true}
      footer={false}
      loading={loading}
    >
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
