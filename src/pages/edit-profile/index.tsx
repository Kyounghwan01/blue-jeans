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
  validtionCriteria,
  validation,
  handleFileButton
} from "utils";
import uploadImageFirebase from "utils/api/uploadImageFirebase";
import deleteImageFirebase from "utils/api/deleteImageFirebase";
import updateDocFirebase from "utils/api/updateDocFirebase";
import usePopup from "hooks/usePopup";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [nickName, setNickName] = useState<string>("");
  const [validNickName, setValidNickName] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [compressedImageState, setCompressedImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [handlePopup] = usePopup();

  useEffect(() => {
    if (!user.nickName) return;

    setNickName(user.nickName);
    setValidNickName(validation(user.nickName, validtionCriteria.nickName));
  }, [user.nickName]);

  const profileEditPop = ({ isSuccess }: { isSuccess: boolean }) => {
    setLoading(false);
    return handlePopup("common/Alert", "프로필", {
      desc: `${isSuccess ? "프로필이 편집되었습니다." : "프로필 편집 실패"}`,
      onClose: isSuccess ? () => router.push("/profile") : null
    });
  };

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    switch (e.target.id) {
      case "nickName":
        setNickName(value);
        setValidNickName(validation(value, validtionCriteria.nickName));
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

  const uploadImageFirebaseSuccess = async (downloadUrl: string[]) => {
    const res = await updateDocFirebase({
      dbColumn: "users",
      dbKey: String(user.id),
      payload: { nickName, profileImage: downloadUrl[0] }
    });

    if (!res.isSuccess) {
      return profileEditPop({ isSuccess: false });
    }

    if (user.profileImage?.includes("firebase")) {
      deleteImageFirebase(user.profileImage);
    }

    dispatch(setImageNickName({ url: downloadUrl[0], nickName }));
    profileEditPop({ isSuccess: true });
  };

  const updateProfile = async () => {
    setLoading(true);
    if (compressedImageState) {
      uploadImageFirebase({
        directoryName: "Images/",
        fileArray: [compressedImageState],
        resolveFunction: uploadImageFirebaseSuccess,
        rejectFunction: () => profileEditPop({ isSuccess: false })
      });
    } else {
      const res = await updateDocFirebase({
        dbColumn: "users",
        dbKey: String(user.id),
        payload: { nickName }
      });
      dispatch(setNickNameDispatch(nickName as string));
      profileEditPop({ isSuccess: res.isSuccess });
    }
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
        <div
          className="edit-profile"
          onClick={e => handleFileButton(e, fileRef)}
        >
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
