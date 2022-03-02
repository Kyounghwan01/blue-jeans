import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import { useRouter } from "next/router";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import TextField from "@mui/material/TextField";
import {
  setNickName as setNickNameDispatch,
  setImageNickName,
} from "features/userSlice";
import BasicLayout from "components/common/BasicLayout";
import FixedBottomButton from "components/common/FixedBottomButton";
import {
  compressImage,
  validtionCriteria,
  validation,
  handleFileButton,
} from "utils";
import uploadImageFirebase from "utils/api/uploadImageFirebase";
import deleteImageFirebase from "utils/api/deleteImageFirebase";
import updateDocFirebase from "utils/api/updateDocFirebase";
import usePopup from "hooks/usePopup";
import withAuth from "components/common/withAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "utils/api/firebase";
import Divider from "components/atom/Divider";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelectorTyped((state) => state.user);
  const [nickName, setNickName] = useState<string>("");
  const [validNickName, setValidNickName] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string>(
    user.profileImage || "/static/image/non-avator.png"
  );
  const [compressedImageState, setCompressedImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { handlePopup } = usePopup();

  useEffect(() => {
    if (!user.nickName) return;

    setNickName(user.nickName);
    setValidNickName(validation(user.nickName, validtionCriteria.nickName));
  }, [user.nickName]);

  const profileEditPop = ({ isSuccess }: { isSuccess: boolean }) => {
    setLoading(false);
    return handlePopup("common/Alert", "프로필", {
      desc: `${isSuccess ? "프로필이 편집되었습니다." : "프로필 편집 실패"}`,
      onClose: isSuccess ? () => router.push("/profile") : null,
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
      payload: { nickName, profileImage: downloadUrl[0] },
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

  const checkDupNickName = async () => {
    const usersCollectionRef = collection(db, "users");
    const q = await query(
      usersCollectionRef,
      where("nickName", "==", nickName)
    );

    const data = await getDocs(q);
    const userData = data.docs
      .map((doc) => ({
        ...doc.data(),
      }))
      .filter((userData) => userData.id !== Number(user.id));
    return !!userData.length;
  };

  const updateProfile = async () => {
    setLoading(true);
    const isDupNickName = await checkDupNickName();
    if (isDupNickName) {
      setLoading(false);
      return handlePopup("common/Alert", "프로필 편집 실패", {
        desc: "사용 중인 닉네임입니다.",
      });
    }

    if (compressedImageState) {
      uploadImageFirebase({
        directoryName: "Images/",
        fileArray: [compressedImageState],
        resolveFunction: uploadImageFirebaseSuccess,
        rejectFunction: () => profileEditPop({ isSuccess: false }),
      });
    } else {
      const res = await updateDocFirebase({
        dbColumn: "users",
        dbKey: String(user.id),
        payload: { nickName },
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
          onClick={(e) => handleFileButton(e, fileRef)}
        >
          <div className="edit-profile__image">
            <Avatar src={previewURL} />
            <div className="edit-profile__penceil">
              <CreateSharpIcon />
            </div>
          </div>
        </div>

        <Divider height={3} top={13} bottom={35} />

        <div className="form-wrapper">
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
        </div>

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
  .MuiAvatar-root {
    margin-right: 15px;
    width: 140px;
    height: 140px;
  }
  .MuiSvgIcon-root {
    width: 30px;
  }
  .MuiFormControl-root {
    height: 75px;
  }
  .edit-profile {
    position: relative;
    margin-top: 10px;
    padding: 0 16px;
    &__penceil {
      position: absolute;
      bottom: 15px;
      left: 55%;
      background: #363636;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    &__image {
      background: var(--primary-color);
      border-radius: 35px;
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .form-wrapper {
    padding: 0 16px;
  }
`;

export default withAuth(Index);
