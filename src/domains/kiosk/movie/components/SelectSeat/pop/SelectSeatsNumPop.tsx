import { useState, useCallback } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";
import CloseBtn from "components/atom/CloseBtn";
import { IMovieSeats } from "features/types/movieSliceType";

interface IAlert {
  hideModal: () => void;
  extraData: {
    onClose: { cancel: () => void; confirm: (seat: IMovieSeats[]) => void };
  };
}

const SelectSeatsNumPop = ({ hideModal, extraData }: IAlert) => {
  const [personCount, setPersonCount] = useState({ type: "", count: 0 });

  const handleCancel = useCallback(() => {
    hideModal();
    extraData.onClose.cancel();
  }, []);

  const handleConfirm = useCallback(() => {
    if (!personCount.count) {
      return;
    }

    const seats = Array.from({ length: personCount.count }).map(() => {
      return { type: personCount.type, seat: "" };
    }) as IMovieSeats[];

    extraData.onClose.confirm(seats);
    hideModal();
  }, [personCount]);

  return (
    <SelectSeatsNumPopBlock>
      <article>
        <div className="txt-c">관람 인원수를 선택해주세요</div>
        <div>총 2 명</div>
        {[
          { type: "adult", label: "일반" },
          { type: "children", label: "청소년" },
          { type: "disabled", label: "장애인" },
          { type: "older", label: "경로우대" }
        ].map(personType => {
          return (
            <div
              key={personType.type}
              style={{ display: "flex", borderBottom: "1px solid gray" }}
            >
              <div>{personType.label}</div>
              {[0, 1, 2, 3, 4, 5].map(count => {
                return (
                  <div
                    style={{
                      marginLeft: "10px",
                      background:
                        personCount.type === personType.type &&
                        personCount.count === count
                          ? "red"
                          : "white"
                    }}
                    key={count}
                    onClick={() =>
                      setPersonCount({ type: personType.type, count })
                    }
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
    </SelectSeatsNumPopBlock>
  );
};

const SelectSeatsNumPopBlock = styled(PopLayoutBlock)`
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

export default SelectSeatsNumPop;
