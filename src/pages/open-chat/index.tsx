import BasicLayout from "components/common/BasicLayout";
import RoomList from "domains/chat/components/RoomList";

const Index = () => {
  // 수익모델을 잘알고있다

  // owner, title, desc, tag

  // todo: paging 안하고 lastTimeStamp으로 sort
  // delete하면 방도 나가고, 글도 없어지고

  return (
    <BasicLayout
      headerTitle="오픈챗"
      back={false}
      footer={true}
      loading={false}
    >
      <RoomList />
    </BasicLayout>
  );
};

export default Index;
