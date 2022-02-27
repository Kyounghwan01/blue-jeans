import styled from "styled-components";

interface IArrowIcon {
  direction: "right" | "left" | "down" | "up";
  onClick?: () => void;
  width?: number;
}

const ArrowIcon = ({ direction, onClick, width = 18 }: IArrowIcon) => {
  return (
    <ArrowIconBlock direction={direction} width={width} onClick={onClick}>
      {">"}
    </ArrowIconBlock>
  );
};

const ArrowIconBlock = styled.span<{
  direction: "right" | "left" | "down" | "up";
  width: number;
}>`
  font-weight: 900;
  font-size: ${props => props.width}px;
  width: ${props => props.width}px;
  transform: rotate(
    ${props =>
      props.direction === "left"
        ? "180deg"
        : props.direction === "down"
        ? "90deg"
        : props.direction === "up"
        ? "270deg"
        : 0}
  );
`;

export default ArrowIcon;
