import { memo } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
interface IHeader {
  headerProps: {
    title: string;
    back?: boolean;
    backFunc?: () => void;
    icons?: { img: string; url: string }[];
  };
}
const Header = (headerProps: IHeader) => {
  const { back, title, icons, backFunc } = headerProps.headerProps;
  return (
    <Block>
      {back ? <ArrowBackIosNewIcon onClick={backFunc} /> : <div />}
      {title}
      {icons ? <ArrowBackIosNewIcon /> : <div />}
    </Block>
  );
};

const Block = styled.header`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #dddddd;
  z-index: 2;
  background: white;
`;

export default memo(Header);
