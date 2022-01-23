import {
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  useState,
  useCallback
} from "react";
import styled from "styled-components";
import usePopup from "hooks/usePopup";
import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { currentStep, currentDate, handleCurrentDate } = useByTicket();
  const [search, setSearch] = useState<string>("");
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

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget);
    const value = e.currentTarget.value;
    setSearch(value);
  }, []);

  const searchKeyword = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // search!!
    }
  }, []);

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
          <button>이전날</button>
          <button>다음날</button>

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
        <div>
          <input
            value={search}
            onKeyPress={searchKeyword}
            onChange={handleSearch}
          />
        </div>
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

export default Index;
