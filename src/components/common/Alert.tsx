import { useEffect } from "react";
import styled from "styled-components";

interface IAlert {
  title: string;
  extraData: {
    desc: string;
    onClose: () => void;
    isConfirm?: boolean;
    autoClose?: { time: number };
  };
  hideModal: () => void;
}

const Alert = ({
  title,
  hideModal,
  extraData = { desc: "", onClose: () => {}, isConfirm: false }
}: IAlert) => {
  useEffect(() => {
    let autoClose: NodeJS.Timeout | null = null;

    if (extraData.autoClose) {
      autoClose = setTimeout(() => {
        close();
      }, extraData.autoClose?.time);
    }

    return () => {
      if (!autoClose) return;
      clearTimeout(autoClose);
    };
  }, []);

  const close = () => {
    hideModal();
    if (typeof extraData.onClose === "function") {
      extraData.onClose();
    }
  };

  return (
    <AlertBlock>
      <article>
        <header className="txt-b txt-c">{title}</header>
        <section>
          <p
            className="txt-c"
            dangerouslySetInnerHTML={{ __html: extraData.desc }}
          />
          <div className="btn-group">
            <button className="btn-group__ok-btn" onClick={close}>
              <span>확인</span>
            </button>
            {extraData.isConfirm && (
              <button className="btn-group__cancel-btn" onClick={hideModal}>
                <span>닫기</span>
              </button>
            )}
          </div>
        </section>
      </article>
    </AlertBlock>
  );
};

const AlertBlock = styled.dialog`
  padding: 0;
  background: rgba(33, 38, 41, 0.5);
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  letter-spacing: -1px;
  article {
    background: white;
    position: relative;
    top: -40px;
    width: 80vw;
    border-radius: 17px;
    padding: 20px;
    header {
      font-size: 20px;
    }
    section {
      p {
        font-size: 15px;
        margin: 5px 0 25px;
      }
    }
    .btn-group {
      &__cancel-btn {
        border: none;
        background: white;
        width: 100%;
        border: 1px solid #bfbfbf;
        border-radius: 10px;
        padding: 6px 0;
        margin-top: 10px;
        height: 40px;
        span {
          color: #8d8d8d;
          font-size: 16px;
          font-weight: bold;
        }
      }
      &__ok-btn {
        border: none;
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        width: 100%;
        border-radius: 10px;
        padding: 6px 0;
        height: 40px;
        span {
          font-size: 16px;
          font-weight: bold;
          color: white;
        }
      }
    }
  }
`;

export default Alert;
