import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { RootState } from "app/store";
import BasicLayout from "components/common/BasicLayout";
import FixedBottomButton from "components/common/FixedBottomButton";
import ImageSkeleton from "components/common/ImageSkeleton";
import usePopup from "hooks/usePopup";
import updateDocFirebase from "utils/api/updateDocFirebase";
import withAuth from "components/common/withAuth";

const Index = () => {
  const router = useRouter();
  const { qna, tab } = useSelector((state: RootState) => state.qna);
  const user = useSelector((state: RootState) => state.user);
  const [answer, setAnswer] = useState<string>(
    `${
      user.nickName || user.name
    }님 안녕하세요. 청바지 매니저입니다! \n\n추가로 궁금한 점이 있다면 청바지 고객센터를 찾아주세요.\n\n감사합니다.\n청바지드림.`
  );
  const [handlePopup] = usePopup();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  }, []);

  const askSubmit = () => {
    handlePopup("common/Alert", "답변하기", {
      desc: "답변 하시겠습니까?",
      isConfirm: true,
      onClose: submit,
    });
  };

  const submit = async () => {
    const res = await updateDocFirebase({
      dbColumn: "qna",
      dbKey: qna.id,
      payload: {
        comment: { data: answer, timestamp: dayjs().format("YYYY. MM. DD") },
        status: "finish",
      },
    });

    handlePopup("common/Alert", `답변 ${res.isSuccess ? "성공" : "실패"}`, {
      desc: res.isSuccess ? "성공" : res.errMessage,
      onClose: res.isSuccess ? router.back : null,
    });
  };

  return (
    <BasicLayout headerTitle="1:1 문의" back={true} footer={false}>
      <Block>
        <section className="list-container">
          <div className="list-container__content">
            <div className="list-container__content__time">
              {dayjs(qna.timestamp).format("YYYY. MM. DD.")}
            </div>
            <div className="list-container__content__title">{qna.title}</div>
          </div>
          <Chip
            label={qna.status === "pending" ? "대기" : "답변완료"}
            color="primary"
            variant={qna.status === "pending" ? "outlined" : "filled"}
          />
        </section>

        <section className="qna-content">
          <p>{qna.content}</p>

          <div>
            {qna.imgUrl.map((url) => {
              return (
                <ImageSkeleton key={url} url={url} width={200} height={200} />
              );
            })}
          </div>
        </section>
        {user.admin && tab === 2 && !qna.comment ? (
          <article className="admin-answer">
            <h3>어드민 답변</h3>
            <TextField
              id="answer"
              label="어드민 답변"
              value={answer}
              fullWidth
              multiline
              rows={10}
              onChange={handleChange}
            />
            <FixedBottomButton
              title="답변완료"
              onClick={askSubmit}
              disabled={!answer}
            />
          </article>
        ) : null}
      </Block>
      {qna.comment && (
        <AnswerBlock>
          <section className="qna-answer">
            <div className="qna-answer__header">
              <h3>답변</h3>
              <p>{qna.comment.timestamp}</p>
            </div>
            <p>{qna.comment.data}</p>
          </section>
        </AnswerBlock>
      )}
    </BasicLayout>
  );
};

const Block = styled.article`
  padding: 10px 20px 50px;
  letter-spacing: -1px;
  .MuiChip-root {
    width: 80px;
    font-size: 15px;
  }
  .list-container {
    padding: 13px 0;
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    width: 100%;

    &__content {
      overflow: auto;
      margin-right: 20px;
      &__time {
        color: #bbb;
        font-size: 16px;
        margin-bottom: 5px;
      }
      &__title {
        font-size: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .qna-content {
    padding: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    p {
      white-space: pre-wrap;
    }
  }
  .qna-answer {
    p {
      white-space: pre-wrap;
      font-size: 15px;
    }
  }
  .admin-answer {
    padding: 30px 0 100px;
  }
`;

const AnswerBlock = styled.article`
  background: #eeeeee;
  padding: 30px 20px 20px;
  letter-spacing: -1px;
  .qna-answer {
    p {
      margin: 30px 0;
      white-space: pre-wrap;
      font-size: 15px;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-size: 20px;
        margin: 0;
      }
      p {
        color: #aaaaaa;
        margin: 0;
      }
    }
  }
`;

export default withAuth(Index);
