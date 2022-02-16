import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import CustomTab from "components/molecules/CustomTab";

const Keypad = ({ setNum }: { setNum: (str: string) => void }) => {
  return (
    <div className="keypad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0, "V"].map((key) => {
        return (
          <button onClick={() => setNum(String(key))} key={key}>
            {key}
          </button>
        );
      })}
    </div>
  );
};

const MemoKeypad = memo(Keypad);

const Index = () => {
  const [tab, setTab] = useState(0);
  const [num, setNum] = useState<string>("");
  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
      setNum("");
    },
    [tab]
  );

  const handleSetNum = useCallback((string: string) => {
    setNum((str) => str + string);
  }, []);

  return (
    <CheckReservationBlock>
      <CustomTab
        tabElement={[{ label: "예매번호" }, { label: "생년월일+핸드폰번호" }]}
        tab={tab}
        setTab={handleChangeTab}
      />
      {num}
      {/* {!tab ? <div>0029 | 뒷자리(11자)</div> : <div>__</div>} */}

      <MemoKeypad setNum={handleSetNum} />
    </CheckReservationBlock>
  );
};

const CheckReservationBlock = styled.article`
  .keypad {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    button {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid gray;
      background: white;
      font-size: 30px;
      font-weight: 100;
    }
  }
`;

export default Index;
