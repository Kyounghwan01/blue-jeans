import styled from "styled-components";

const movie = {
  id: 1,
  title: "킹스맨",
  startAt: "20:00",
  endAt: "22:00",
  img: "",
  lastSeats: 32,
  grade: 15
};

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <ConfirmMovieBlock>
      <div className="content">
        <div>영화 포스터</div>
        <div>
          <div>
            {movie.grade} {movie.title}
          </div>
        </div>
      </div>
      <div className="bottom-button">
        <button onClick={next}>결제하기</button>
      </div>
    </ConfirmMovieBlock>
  );
};

// 없을때 그냥 일반 2매로 합시다

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
