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
        <header>{title}</header>
        <section>
          <p>{extraData.desc}</p>
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
    border-radius: 8px;
    padding: 20px;
    header {
      font-size: 20px;
    }
    section {
      p {
        font-size: 18px;
        margin: 5px 0 25px;
      }
    }
    .btn-group {
      &__cancel-btn {
        border: none;
        background: white;
        width: 100%;
        border: 1px solid #dddddd;
        border-radius: 4px;
        padding: 6px 0;
        margin-top: 10px;
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }
      &__ok-btn {
        border: none;
        background: dodgerblue;
        border: 1px solid dodgerblue;
        width: 100%;
        border-radius: 4px;
        padding: 6px 0;
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
