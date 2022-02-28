import styled from "styled-components";

interface IDivider {
  height?: number;
  top?: number;
  bottom?: number;
  color?: string;
}

const Divider = ({
  height = 1,
  top = 0,
  bottom = 0,
  color = "#E6E6E6"
}: IDivider) => {
  return (
    <DividerBlock height={height} top={top} bottom={bottom} color={color} />
  );
};

const DividerBlock = styled.div<IDivider>`
  height: ${props => props.height}px;
  margin-top: ${props => props.top}px;
  margin-bottom: ${props => props.bottom}px;
  background: ${props => props.color};
`;

export default Divider;
