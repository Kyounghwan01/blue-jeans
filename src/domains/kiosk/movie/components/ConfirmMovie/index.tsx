import styled from "styled-components";
import useSelectorTyped from "features/useSelectorTyped";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { seatsInfo, currentDate, movie } = useSelectorTyped(state => ({
    movie: state.movieKiosk.movie,
    seatsInfo: state.movieKiosk.seatsInfo,
    currentDate: state.common.currentDate
  }));

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
          {seatsInfo.map(person => (
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
