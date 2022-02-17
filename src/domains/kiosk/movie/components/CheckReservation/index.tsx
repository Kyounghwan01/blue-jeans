import { useEffect, useState, useCallback, memo } from "react";
import styled from "styled-components";
import CustomTab from "components/molecules/CustomTab";
import { IComponentRoute } from "features/types/commonSliceType";

const tabEl = [{ label: "예매번호" }, { label: "생년월일+핸드폰번호" }];

const Keypad = ({ setNum }: { setNum: (str: string) => void }) => {
  return (
    <div className="keypad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "X", 0, "V"].map(key => {
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

const Index = ({ next }: IComponentRoute) => {
  const [tab, setTab] = useState(0);
  const [num, setNum] = useState<string>("");

  useEffect(() => {
    if ((!tab && num.length === 11) || (tab && num.length === 14)) {
      next("ConfirmMovie");
    }
  }, [num]);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
      setNum("");
    },
    [tab]
  );

  const handleSetNum = useCallback(
    (string: string) => {
      if (string === "X") {
        setNum(str => str.slice(0, -1));
      } else if (string === "V") {
        if (!(tab && num.length === 13)) {
          return;
        }
        next("ConfirmMovie");
      } else {
        setNum(str => str + string);
      }
    },
    [tab, num]
  );

  return (
    <CheckReservationBlock>
      <CustomTab tabElement={tabEl} tab={tab} setTab={handleChangeTab} />

      {!tab ? (
        <div>0029 | {num ? num : "뒷자리(11자)"} </div>
      ) : (
        <div>
          <div
            style={{
              borderBottom: "1px solid black",
              width: "100px",
              height: "30px"
            }}
          >
            {num.slice(0, 6)}
          </div>
          <div>01X | {num.length > 6 ? num.slice(6) : "뒷자리 (7~8자리)"}</div>
        </div>
      )}

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
