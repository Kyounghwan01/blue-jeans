import styled from "styled-components";

interface IMission {
  next: () => Promise<boolean>;
  img: string;
  children: React.ReactNode;
}

const Mission = ({ next, img, children }: IMission) => {
  return (
    <MissionBlock>
      <div className="wrapper">
        <div>
          <div>{img}</div>
          {children}
        </div>
        <button className="next" onClick={next}>
          <span>확인</span>
        </button>
      </div>
    </MissionBlock>
  );
};

const MissionBlock = styled.article`
  background: rgba(33, 38, 41, 0.5);
  height: 100%;
  .wrapper {
    position: relative;
    top: 20%;
    margin: 0 auto;
    background: white;
    width: 80%;
    height: 300px;
  }

  .next {
    border: none;
    background: dodgerblue;
    border: 1px solid dodgerblue;
    border-radius: 4px;
    padding: 6px 30px;
    display: block;
    margin: 0 auto;
    span {
      font-size: 16px;
      font-weight: bold;
      color: white;
    }
  }
`;

export default Mission;
