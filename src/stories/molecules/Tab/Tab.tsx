import React from "react";
import styled from "styled-components";

export default function Index({
  previousText,
  nextText,
  previous,
  next,
  tabType,
  previousValue,
  nextValue,
  btnStyles,
}: {
  previousText: string;
  nextText: string;
  previous: () => void;
  next: () => void;
  tabType: string;
  previousValue: string;
  nextValue: string;
  btnStyles: any;
}) {
  return (
    <Tab>
      <TabButton
        style={{ ...btnStyles }}
        btnType={previousValue}
        active={tabType === previousValue}
        onClick={previous}
        target={previousValue}
      >
        {previousText}
      </TabButton>
      <TabButton
        style={{ ...btnStyles }}
        btnType={nextValue}
        active={tabType === nextValue}
        onClick={next}
        target={previousValue}
      >
        {nextText}
      </TabButton>
    </Tab>
  );
}

const Tab = styled.div`
  display: flex;
  width: 608px;
  height: 60px;
  margin-top: 100px;
`;

const TabButton = styled.button<{
  btnType: string;
  active: boolean;
  target: string;
  style: any;
}>`
  width: 304px;
  border-radius: ${(props) =>
    props.btnType === props.target ? "8px 0px 0px 8px;" : "0px 8px 8px 0px;"};
  background: ${(props) => (props.active ? " #f05014" : "#ffffff")};
  color: ${(props) => (props.active ? "white" : "#C4C4C4")};
  border: ${(props) => (props.active ? "" : "1px solid #C4C4C4")};
  font-size: 18px;
  font-weight: bold;
  ${(props) => (props.style ? { ...props.style } : {})}
`;
