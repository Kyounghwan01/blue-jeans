const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <div>
      첫번째 intro
      {/* <button onClick={() => movePage("Detail")}>특정</button> */}
      <button onClick={next}>다음</button>
    </div>
  );
};

export default Index;
