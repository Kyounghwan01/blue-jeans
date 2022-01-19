import styled from "styled-components";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";

export default function CountIcon({
  type,
  onClick,
  isHint
}: {
  type: string;
  onClick: () => void;
  isHint: boolean;
}) {
  return (
    <CountIconBlock onClick={onClick}>
      {type === "add" ? (
        <div className={`${isHint && "blink"}`}>
          <AddSharpIcon style={{ color: "white" }} />
        </div>
      ) : (
        <RemoveSharpIcon style={{ color: "white" }} />
      )}
    </CountIconBlock>
  );
}

const CountIconBlock = styled.div`
  background: dodgerblue;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  text-align: center;
`;
