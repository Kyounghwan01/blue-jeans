import { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { RootState } from "app/store";
import FixedBottomButton from "components/common/FixedBottomButton";
import { QuestionType } from "utils/constants";
import setDocFirebase from "utils/api/setDocFirebase";
import usePopup from "hooks/usePopup";
import dayjs from "dayjs";
import { compressImage } from "utils";
import CancelIcon from "@mui/icons-material/Cancel";
import cloneDeep from "lodash/cloneDeep";
import { resetQnaList, setTab } from "features/qnaSlice";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const storage = getStorage();

const Question = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [data, setData] = useState({
    title: "",
    content: "",
    type: "not-choice"
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [previewURLs, setPreviewURLs] = useState<{ url: string; blob: File }[]>(
    []
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [handlePopup] = usePopup();

  useEffect(() => {
    setIsValid(data.type !== "not-choice" && !!data.title && !!data.content);
  }, [data]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }, []);

  const uploadImage = async () => {
    const promises = [] as any;
    previewURLs.map(({ blob }) => {
      const Task = new Promise(function (resolve, reject) {
        const uniqueKey = new Date().getTime();
        const _name = blob.name
          .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
          .split(" ")
          .join("");

        const metaData = {
          contentType: blob.type
        };
        const storageRef = sRef(storage, "Qna/" + _name + uniqueKey);
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

    Promise.all(promises).then(res => {
      setApi(res);
    });
  };

  const setApi = async (imgUrl?: string[] | null) => {
    const { title, content, type } = data;
    const payload = {
      userId: user.id,
      title,
      content,
      type,
      status: "pending",
      comment: "",
      imgUrl: imgUrl || [],
      timestamp: dayjs().format("YYYY-MM-DD")
    };
    const res = await setDocFirebase({
      dbColumn: "qna",
      setType: "anonymous",
      payload
    });
    handlePopup("common/Alert", "문의", {
      desc: res.isSuccess
        ? "문의가 등록되었습니다."
        : `문의 등록 실패 : ${res.errMessage}`,
      onClose: res.isSuccess ? successQuestionCallback : null
    });
  };

  const successQuestionCallback = () => {
    // dispatch(resetQnaList());
    dispatch(setTab(1));
  };

  const handleFileOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!event.target.files) return;
      const file = event.target.files[0];
      const compressedImage = (await compressImage(file)) as File;
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewURLs(prev => [
          ...prev,
          { url: reader.result as string, blob: compressedImage }
        ]);
      };
      if (compressedImage) reader.readAsDataURL(compressedImage);
    },
    []
  );

  const handleFileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const deleteImage = useCallback(
    (index: number) => {
      const newData = cloneDeep(previewURLs);
      newData.splice(index, 1);
      setPreviewURLs(newData);
    },
    [previewURLs]
  );

  return (
    <>
      <Block>
        <TextField
          id="nickName"
          label="닉네임"
          value={user.nickName || user.name || ""}
          variant="standard"
          fullWidth
          disabled
        />

        <TextField
          id="type"
          error={data.type === "not-choice"}
          select
          label="문의유형"
          value={data.type}
          onChange={handleChange}
          fullWidth
          SelectProps={{ native: true }}
          helperText={
            data.type === "not-choice" ? "문의유형을 선택해주세요" : ""
          }
          variant="standard"
        >
          {QuestionType.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.value === "not-choice"}
            >
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          id="title"
          label="제목"
          error={!data.title}
          helperText={!data.title ? "제목을 입력해주세요" : ""}
          placeholder="제목을 입력해주세요"
          value={data.title}
          onChange={handleChange}
          variant="standard"
          fullWidth
          inputProps={{ maxLength: 100 }}
        />

        <TextField
          className="textarea"
          id="content"
          label="내용"
          multiline
          rows={4}
          placeholder="자세히 설명해 주실수록 더 정확하고 따른 답변을 받아보실 수 있어요"
          fullWidth
          inputProps={{ maxLength: 500 }}
          value={data.content}
          onChange={handleChange}
          error={!data.content}
        />

        <input
          ref={fileRef}
          id="file"
          type="file"
          onChange={handleFileOnChange}
          hidden={true}
        />

        <section className="add-image-container">
          {previewURLs.length <= 2 && (
            <div
              className="add-image-container__add-image"
              onClick={handleFileButtonClick}
            />
          )}
          {previewURLs.map((url, index) => (
            <div className="add-image-container__image" key={index}>
              <img src={url.url} alt="카카오로그인버튼" />
              <CancelIcon
                className="add-image-container__image__close"
                onClick={() => deleteImage(index)}
              />
            </div>
          ))}
        </section>
      </Block>
      <FixedBottomButton
        title="문의하기"
        onClick={previewURLs.length ? uploadImage : () => setApi()}
        disabled={!isValid}
      />
    </>
  );
};

const Block = styled.article`
  padding: 20px 16px 100px;
  .MuiFormControl-root {
    height: 80px;
  }
  .textarea {
    height: 150px;
  }
  .add-image-container {
    display: flex;
    &__add-image {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      background: #bbb;
      margin-right: 10px;
    }
    &__image {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border-radius: 8px;
      position: relative;
      &__close {
        font-size: 30px;
        position: absolute;
        top: -10px;
        right: -10px;
        background: white;
        border-radius: 50%;
      }
      img {
        width: inherit;
        height: inherit;
        border-radius: 8px;
      }
    }
  }
`;

export default Question;
