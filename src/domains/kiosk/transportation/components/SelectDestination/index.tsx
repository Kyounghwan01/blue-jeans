import styled from "styled-components";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <SelectDestinationBlock>
      <section className="title"> 동서울 터미널 </section>
      도착지를 선택해주세요
    </SelectDestinationBlock>
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
