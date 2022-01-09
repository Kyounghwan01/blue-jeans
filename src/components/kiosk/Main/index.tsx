const Index = ({
  next,
  back
}: {
  next: () => Promise<boolean>;
  back: () => Promise<boolean>;
}) => {
  return (
    <div>
      두번째 intro
      <button onClick={back}>이전</button>
      <button onClick={next}>다음</button>
    </div>
  );
};

export default Index;
