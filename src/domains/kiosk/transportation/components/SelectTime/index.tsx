import { useEffect } from "react";
import styled from "styled-components";
import useSelectTime from "domains/kiosk/transportation/hooks/useSelecTime";
import usePopup from "hooks/usePopup";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { handlePopup } = usePopup();
  const { timeList, currentDate, handleCurrentDate, handleStartTime } =
    useSelectTime({ next });

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: `<div>11시 버스를 선택하세요</div>`,
      autoClose: { time: 3000 }
    });
  }, []);
  return (
    <SelectTimeBlock>
      <div>
        {/* todo: 이것도 컴포넌트 빼야되 */}
        <button onClick={() => handleCurrentDate({ type: "prev" })}>
          이전날
        </button>
        {currentDate}
        <button onClick={() => handleCurrentDate({ type: "next" })}>
          다음날
        </button>
      </div>

      {timeList.map(list => (
        <div
          key={list.id}
          onClick={() => handleStartTime(list.id)}
          className={`${list.startAt === "11:00" && "blink"}`}
        >
          <span>{list.startAt}</span>
          <span>{list.type}</span>
          <span>
            {list.company}/{list.time}
          </span>
          <span>{list.grade === "common" ? "일반" : "우등"}</span>
          <span>{list.lastSeat}</span>
        </div>
      ))}
    </SelectTimeBlock>
  );
};

const SelectTimeBlock = styled.article``;

export default Index;
