import { useEffect } from "react";
import { IComponentRoute } from "features/types/commonSliceType";
import usePopup from "hooks/usePopup";
import styled from "styled-components";

const SelectSeat = ({ back, next }: IComponentRoute) => {
  const { handleDomainPopup } = usePopup();
  useEffect(() => {
    handleDomainPopup(
      `kiosk/movie/components/SelectSeat/pop/SelectSeatsNum`,
      "",
      { onClose: { cancel: back, confirm: () => console.log(1) } }
    );
  }, []);

  return <SelectSeatBlock>좌석선택</SelectSeatBlock>;
};

const SelectSeatBlock = styled.article``;

export default SelectSeat;
