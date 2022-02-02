import { Dispatch, SetStateAction, memo } from "react";
import styled from "styled-components";

interface IAlert {
  clickPersonType: (type: string) => void;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
  seatNumber: number;
}

const SelectPersonPop = ({
  clickPersonType,
  setIsSelected,
  seatNumber
}: IAlert) => {
  return (
    <SelectPersonTypeBlock>
      <article>
        <p
          className={`${seatNumber === 12 && "blink"}`}
          onClick={() => clickPersonType("adult")}
        >
          어른
        </p>
        <p onClick={() => clickPersonType("child")}>어린이/초등</p>
        <p onClick={() => clickPersonType("kid")}>청소년</p>
        <p className="disable">보훈30</p>
        <p className="disable">보훈70</p>
        <p onClick={() => setIsSelected((prev: boolean) => !prev)}>X 취소</p>
      </article>
    </SelectPersonTypeBlock>
  );
};

const SelectPersonTypeBlock = styled.article`
  background: rgba(33, 38, 41, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  article {
    position: relative;
    top: 20vh;
    left: 10%;
    padding: 30px 10px 20px;
    border-radius: 8px;
    width: 100px;
    background: white;
    border: 1px solid gray;
    p {
      padding: 3px;
      text-align: center;
      border: 1px solid gray;
      margin-bottom: 10px;
    }
  }
  .disable {
    background: grey;
  }
`;

export default memo(SelectPersonPop);
