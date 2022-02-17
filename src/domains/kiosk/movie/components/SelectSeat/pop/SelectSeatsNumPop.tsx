import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";
import CloseBtn from "components/atom/CloseBtn";
import { IMovieSeats } from "features/types/movieSliceType";

interface IAlert {
  hideModal: () => void;
  extraData: {
    onClose: {
      cancel: () => void;
      confirm: (seat: IMovieSeats[]) => void;
      lastSeats: number;
    };
  };
}

const initPersonSet = {
  adult: { label: "일반", count: 0 },
  children: { label: "청소년", count: 0 },
  disabled: { label: "장애인", count: 0 },
  older: { label: "경로우대", count: 0 }
} as { [index: string]: { label: string; count: number } };

const SelectSeatsNumPop = ({ hideModal, extraData }: IAlert) => {
  const [personCount, setPersonCount] = useState(initPersonSet);
  const [onError, setOnError] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    hideModal();
    extraData.onClose.cancel();
  }, []);

  const handleConfirm = useCallback(() => {
    if (!totalCount) {
      return;
    }

    const seats = Object.entries(personCount).reduce((acc, cur): any => {
      const [k, v] = cur;
      if (!v.count) return acc;
      return [...acc, { type: k, label: v.label, count: v.count }];
    }, []);

    extraData.onClose.confirm(seats);
    hideModal();
  }, [personCount]);

  const handlePersonCount = ({
    type,
    count,
    label
  }: {
    type: string;
    count: number;
    label: string;
  }) => {
    setPersonCount(prev => {
      return { ...prev, [type]: { label, count } };
    });
  };

  const totalCount = useMemo(() => {
    const count = Object.values(personCount).reduce((acc, cur): number => {
      return acc + cur.count;
    }, 0);

    setOnError(extraData.onClose.lastSeats < count);
    return count;
  }, [personCount]);

  return (
    <SelectSeatsNumPopBlock>
      <article>
        <div className="txt-c">관람 인원수를 선택해주세요</div>
        <div className="txt-c">총 {totalCount} 명</div>
        {Object.entries(initPersonSet).map(([type, v]) => {
          return (
            <div
              key={type}
              style={{ display: "flex", borderBottom: "1px solid gray" }}
            >
              <div>{v.label}</div>
              {[1, 2, 3, 4, 5].map(count => {
                return (
                  <div
                    style={{
                      marginLeft: "10px",
                      background:
                        count === personCount[type].count ? "red" : "white"
                    }}
                    key={count}
                    onClick={() =>
                      handlePersonCount({ type: type, count, label: v.label })
                    }
                  >
                    {count}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="txt-c">
          {onError && (
            <div>
              <span>
                잔여좌석({extraData.onClose.lastSeats})이하로 선택해주세요!
              </span>
            </div>
          )}
          <button onClick={handleConfirm} disabled={onError}>
            확인
          </button>
        </div>

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
