import { memo } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";

const CloseBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <CloseBtnBlock>
      <CancelIcon className="icon" onClick={onClick} />
    </CloseBtnBlock>
  );
};

const CloseBtnBlock = styled.div`
  font-size: 25px;
  position: absolute;
  top: -10px;
  right: -5px;
  background: white;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  .icon {
    position: relative;
    top: -3px;
    height: 25px;
    width: 25px;
  }
`;

export default memo(CloseBtn);
