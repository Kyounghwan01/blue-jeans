import { useEffect } from "react";
import styled from "styled-components";
import usePopup from "hooks/usePopup";
import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";
import { locations, word } from "utils/constants";
import WordCard from "./WordCard";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const {
    currentStep,
    currentDate,
    handleCurrentDate,
    locationCondition,
    handleSearch,
    searchLocation,
    handleCondition
  } = useByTicket({ next });
  const { handlePopup } = usePopup();

  useEffect(() => {
    if (currentStep !== 4) {
      return;
    }

    handlePopup("common/Alert", "", {
      desc: "도착지 선택을 눌러주세요!",
      autoClose: { time: 3000 }
    });
  }, [currentStep]);

  // const searchKeyword = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     // search!!
  //   }
  // }, []);

  return (
    <>
      {currentStep}
      {currentStep === 4 ? (
        <SelectDestinationBlock>
          <section className="title">
            {" "}
            동서울 터미널
            <div>
              {/* 여기 date는 계속 바뀌니깐 store에 저장 */}
              <p>{currentDate}</p>
            </div>
          </section>
          {/* store date 값에 의해 validation */}
          <button onClick={() => handleCurrentDate({ type: "prev" })}>
            이전날
          </button>
          <button onClick={() => handleCurrentDate({ type: "next" })}>
            다음날
          </button>

          <section>
            <div>
              <div>출발지</div>
              동서울 터미널
            </div>

            <div>화살표 아이콘</div>

            <div className="blink" onClick={next}>
              <div>도착지</div>
              {/* 여기 도착지는 store에 저장 */}
              도착지 선택
            </div>
          </section>

          <p>도착지를 선택해주세요!</p>
        </SelectDestinationBlock>
      ) : (
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
      )}
    </>
  );
};

const SelectDestinationBlock = styled.article`
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }
  .bus-img {
    height: 100px;
    width: 100px;
    margin: 20px auto;
    background: grey;
  }
`;

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

export default Index;
