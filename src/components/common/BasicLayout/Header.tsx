import { memo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowIcon from "components/atom/ArrowIcon";

interface IHeader {
  title: string;
  back?: boolean;
  backFunc?: () => void;
  icons?: { img: string; url: string }[];
}
const Header = (headerProps: IHeader) => {
  const router = useRouter();
  const { back, title, icons, backFunc } = headerProps;
  return (
    <Block>
      {back ? (
        <ArrowIcon direction="left" onClick={backFunc || router.back} />
      ) : (
        <div />
      )}
      <span className="custom-font-header-title txt-b">{title}</span>
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
  border-bottom: 3px solid var(--border-color2);
  z-index: 2;
  background: white;
  .back-icon {
    font-weight: 900;
    font-size: 18px;
    width: 40px;
    text-align: left;
  }
`;

export default memo(Header);
