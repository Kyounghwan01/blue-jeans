import { useState } from "react";
import styled from "styled-components";

const Index = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <SelectSeatsBlock>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>

      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      <p>좌석 선택 컴포넌트</p>
      {isSelected && (
        <SelectPersonTypeBlock>
          <p>어른</p>
          <p>어린이/초등</p>
          <p>청소년</p>
          <p>보훈30</p>
          <p>보훈70</p>
          <p onClick={() => setIsSelected(prev => !prev)}>X 취소</p>
        </SelectPersonTypeBlock>
      )}
    </SelectSeatsBlock>
  );
};

const SelectSeatsBlock = styled.article`
  position: relative;
`;

const SelectPersonTypeBlock = styled.article`
  position: absolute;
  background: white;
  top: 20vh;
  left: 10%;
  z-index: 2;
  border: 1px solid gray;
  width: 100px;
  padding: 30px 10px 20px;
  p {
    padding: 3px;
    text-align: center;
    border: 1px solid gray;
    margin-bottom: 10px;
  }
`;

export default Index;
