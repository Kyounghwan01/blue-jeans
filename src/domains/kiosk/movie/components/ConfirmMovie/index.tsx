import { useEffect, useState } from "react";
import styled from "styled-components";
import useSelectorTyped from "features/useSelectorTyped";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { seatsInfo, currentDate, movie } = useSelectorTyped(state => ({
    movie: state.movieKiosk.movie,
    seatsInfo: state.movieKiosk.seatsInfo,
    currentDate: state.common.currentDate
  }));
  const [personTypeAndCount, setPersonTypeAndCount] = useState<
    { label: string; count: number }[]
  >([]);

  useEffect(() => {
    if (!seatsInfo.length) {
      setPersonTypeAndCount([{ label: "일반", count: 2 }]);
    }

    const res = {
      adult: { label: "일반", count: 0 },
      children: { label: "청소년", count: 0 },
      disabled: { label: "장애인", count: 0 },
      older: { label: "경로우대", count: 0 }
    };
    seatsInfo.forEach(seat => {
      res[seat.type].count++;
    });
    setPersonTypeAndCount(Object.values(res).filter(type => type.count));
  }, [seatsInfo]);

  return (
    <ConfirmMovieBlock>
      <div className="content">
        <div>영화 포스터</div>
        <div>
          <div>청춘영화관 2층</div>
          <div>
            {movie.grade} {movie.title}
          </div>
          <div>
            {currentDate} {movie.startAt}~{movie.endAt}
          </div>
          {personTypeAndCount.map(person => (
            <div key={person.label}>
              {person.label} {person.count}매
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-button">
        <button onClick={next}>결제하기</button>
      </div>
    </ConfirmMovieBlock>
  );
};

const ConfirmMovieBlock = styled.article`
  position: relative;
  height: 100%;
  .content {
    border: 1px solid gray;
  }
  .bottom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 30px;
    button {
    }
  }
`;

export default Index;
