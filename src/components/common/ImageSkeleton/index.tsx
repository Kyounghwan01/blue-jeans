import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";

const Index = ({
  url,
  width,
  height
}: {
  url: string;
  width: number;
  height: number;
}) => {
  const [load, setLoad] = useState(false);
  return (
    <Block height={height} width={width}>
      {!load && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={width}
          height={height}
        />
      )}
      <img
        onLoad={() => setLoad(true)}
        src={url}
        alt="이미지"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </Block>
  );
};

const Block = styled.div<{ height: number; width: number }>`
  height: ${props => `${props.height}px`};
  width: ${props => `${props.width}px`};
  overflow: hidden;
`;

export default Index;
