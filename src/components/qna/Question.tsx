import { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseBtn from "components/atom/CloseBtn";
import { QuestionType } from "utils/constants";
import setDocFirebase from "utils/api/setDocFirebase";
import uploadImageFirebase from "utils/api/uploadImageFirebase";
import { compressImage, handleFileButton } from "utils";
import FixedBottomButton from "components/common/FixedBottomButton";
import usePopup from "hooks/usePopup";
import { setTab } from "features/qnaSlice";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Question = () => {
  const dispatch = useDispatch();
  const user = useSelectorTyped((state) => state.user);
  const [data, setData] = useState({
    title: "",
    content: "",
    type: "not-choice",
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [previewURLs, setPreviewURLs] = useState<{ url: string; blob: File }[]>(
    []
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const { handlePopup } = usePopup();

  useEffect(() => {
    setIsValid(data.type !== "not-choice" && !!data.title && !!data.content);
  }, [data]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }, []);

  const uploadImage = async () => {
    const imageFiles = previewURLs.map(({ blob }) => blob);
    uploadImageFirebase({
      directoryName: "Qna/",
      fileArray: imageFiles,
      resolveFunction: setApi,
      rejectFunction: () => {},
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
      timestamp: dayjs().format("YYYY-MM-DD"),
    };

    const res = await setDocFirebase({
      dbColumn: "qna",
      setType: "anonymous",
      payload,
    });

    handlePopup("common/Alert", "??????", {
      desc: res.isSuccess
        ? "????????? ?????????????????????."
        : `?????? ?????? ?????? : ${res.errMessage}`,
      onClose: res.isSuccess ? dispatch(setTab(1)) : null,
    });
  };

  const handleFileOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!event.target.files) return;
      const file = event.target.files[0];
      const compressedImage = (await compressImage(file)) as File;
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewURLs((prev) => [
          ...prev,
          { url: reader.result as string, blob: compressedImage },
        ]);
      };
      if (compressedImage) reader.readAsDataURL(compressedImage);
    },
    []
  );

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
          label="?????????"
          value={user.nickName || user.name || ""}
          variant="standard"
          fullWidth
          disabled
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>

        <TextField
          id="type"
          error={data.type === "not-choice"}
          select
          label="????????????"
          value={data.type}
          onChange={handleChange}
          fullWidth
          SelectProps={{ native: true }}
          helperText={
            data.type === "not-choice" ? "??????????????? ??????????????????" : ""
          }
          variant="standard"
        >
          {QuestionType.map((option) => (
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
          label="??????"
          error={!data.title}
          helperText={!data.title ? "????????? ??????????????????" : ""}
          placeholder="????????? ??????????????????"
          value={data.title}
          onChange={handleChange}
          variant="standard"
          fullWidth
          inputProps={{ maxLength: 100 }}
        />

        <TextField
          className="textarea"
          id="content"
          label="??????"
          multiline
          rows={4}
          placeholder="????????? ????????? ???????????? ??? ???????????? ?????? ????????? ???????????? ??? ?????????"
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
              onClick={(e) => handleFileButton(e, fileRef)}
            />
          )}
          {previewURLs.map((url, index) => (
            <div className="add-image-container__image" key={index}>
              <img src={url.url} alt="????????????????????????" />
              <CloseBtn onClick={() => deleteImage(index)} />
            </div>
          ))}
        </section>
      </Block>
      <FixedBottomButton
        title="????????????"
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
      img {
        width: inherit;
        height: inherit;
        border-radius: 8px;
      }
    }
  }
  .MuiCheckbox-root {
    svg {
      color: #363636;
    }
  }
  .MuiFormControlLabel-label {
    color: #9a9a9a;
  }
`;

export default Question;
