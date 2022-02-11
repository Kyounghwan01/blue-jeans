import { useState, useEffect } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";
import CloseBtn from "components/atom/CloseBtn";

interface IAlert {
  hideModal: () => void;
  extraData: {
    onClose: { cancel: () => void; confirm: () => void };
  };
}

const SelectSeatsNum = ({ hideModal, extraData }: IAlert) => {
  // data init
  const [personCount, setPersonCount] = useState({ type: "", count: 0 });

  const handleCancel = () => {
    hideModal();
    extraData.onClose.cancel();
  };

  const handleConfirm = () => {
    extraData.onClose.confirm();
    // todo: 사람 count 변수 slice에 어떻게 넣을지, seats는 어떻게 데이터를 다룰지 생각해보고 SelectSeat에서 props 내려
    // hideModal();
  };

  useEffect(() => {
    console.log(personCount);
  }, [personCount]);

  return (
    <SelectSeatsNumBlock>
      <article>
        <div className="txt-c">관람 인원수를 선택해주세요</div>
        <div>총 2 명</div>
        {["일반", "청소년", "장애인", "경로우대"].map(personType => {
          return (
            <div
              key={personType}
              style={{ display: "flex", borderBottom: "1px solid gray" }}
            >
              <div>{personType}</div>
              {[0, 1, 2, 3, 4, 5].map(count => {
                return (
                  <div
                    style={{
                      marginLeft: "10px",
                      background:
                        personCount.type === personType &&
                        personCount.count === count
                          ? "red"
                          : "white"
                    }}
                    key={count}
                    onClick={() => setPersonCount({ type: personType, count })}
                  >
                    {count}
                  </div>
                );
              })}
            </div>
          );
        })}

        <button onClick={handleConfirm}>확인</button>

        <CloseBtn onClick={handleCancel} />
      </article>
    </SelectSeatsNumBlock>
  );
};

const SelectSeatsNumBlock = styled(PopLayoutBlock)`
  article {
    position: relative;
    background: white;
    width: 80%;
    height: 300px;
    border-radius: 4px;

    .next {
      border: none;
      background: dodgerblue;
      border: 1px solid dodgerblue;
      border-radius: 4px;
      padding: 6px 30px;
      display: block;
      margin: 0 auto;
      span {
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
    }
  }
`;

export default SelectSeatsNum;
