import styled from "styled-components";
import useSelectTime from "domains/kiosk/transportation/hooks/useSelecTime";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { timeList, currentDate, handleCurrentDate, handleStartTime } =
    useSelectTime({ next });
  return (
    <SelectTimeBlock>
      <div>
        <button onClick={() => handleCurrentDate({ type: "prev" })}>
          이전날
        </button>
        {currentDate}
        <button onClick={() => handleCurrentDate({ type: "next" })}>
          다음날
        </button>
      </div>

      {timeList.map(list => (
        <div key={list.id} onClick={() => handleStartTime(list.id)}>
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
