import { useEffect, memo } from "react";
import styled from "styled-components";
import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";
import WordCard from "./WordCard";
import { locations, word } from "utils/constants";
import usePopup from "hooks/usePopup";

const Step5SelectDestionation = ({
  next
}: {
  next: () => Promise<boolean>;
}) => {
  const { locationCondition, handleSearch, searchLocation, handleCondition } =
    useByTicket({ next });
  const { handlePopup } = usePopup();

  // const searchKeyword = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     // search!!
  //   }
  // }, []);

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: `<div>강원도 - 양양을 선택해주세요!</div>`,
      autoClose: { time: 3000 }
    });
  }, []);

  return (
    <SearchDestionBlock>
      <section className="search">
        <input
          value={locationCondition.keyword}
          // onKeyPress={searchKeyword}
          onChange={handleSearch}
        />
      </section>

      <section className="content">
        <div className="content__location">
          {locations.map(locations => (
            <WordCard
              onClick={handleCondition}
              type="location"
              key={locations}
              word={locations}
            />
          ))}
        </div>

        <div className="content__word">
          {word.map(word => (
            <WordCard
              onClick={handleCondition}
              type="word"
              key={word}
              word={word}
            />
          ))}
        </div>

        <div className="content__search-location">
          {searchLocation.map(location => (
            <WordCard
              onClick={handleCondition}
              type="searchLocation"
              key={location.id}
              word={location.label}
            />
          ))}
        </div>
      </section>
    </SearchDestionBlock>
  );
};

const SearchDestionBlock = styled.article`
  .content {
    display: grid;
    grid-template-columns: 3fr 3fr 10fr;
    padding: 10px 18px;
    &__location {
      margin: 0 auto;
    }
    &__word {
      margin: 0 auto;
    }
    &__search-location {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px 20px;
      height: 0px;
    }
  }
`;

export default memo(Step5SelectDestionation);
