import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction
} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { RootState } from "app/store";
import FixedBottomButton from "components/common/FixedBottomButton";
import { QuestionType } from "utils/constants";
import setDocFirebase from "utils/api/setDocFirebase";
import usePopup from "hooks/usePopup";

const Question = ({ setTab }: { setTab: Dispatch<SetStateAction<number>> }) => {
  const user = useSelector((state: RootState) => state.user);
  const [data, setData] = useState({
    title: "",
    content: "",
    type: "not-choice"
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [handlePopup] = usePopup();

  useEffect(() => {
    setIsValid(data.type !== "not-choice" && !!data.title && !!data.content);
  }, [data]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }, []);

  const setApi = async () => {
    const { title, content, type } = data;
    const payload = {
      id: user.id,
      title,
      content,
      type,
      status: "pending",
      comment: [],
      imgUrl: ""
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
      onClose: res.isSuccess ? () => setTab(1) : null
    });
  };

  return (
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
        helperText={data.type === "not-choice" ? "문의유형을 선택해주세요" : ""}
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

      <FixedBottomButton
        title="문의하기"
        onClick={setApi}
        disabled={!isValid}
      />
    </Block>
  );
};

const Block = styled.article`
  padding: 20px 16px;
  .MuiFormControl-root {
    height: 80px;
  }
`;

export default Question;
