const Index = ({ next, back }) => {
  return (
    <div>
      두번째 intro
      <button onClick={back}>이전</button>
      <button onClick={next}>다음</button>
    </div>
  );
};

export default Index;
