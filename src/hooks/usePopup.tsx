import { useContext } from "react";
import { ModalContext } from "context";

const usePopup = () => {
  const { showModal } = useContext(ModalContext);

  function handlePopup(link: string, title: string, extraData: any) {
    console.log(extraData);
    import(`components/${link}`).then(({ default: Component }) => {
      showModal({
        component: Component,
        modalProps: {
          title,
          extraData
        }
      });
    });
  }

  return [handlePopup];
};

export default usePopup;
