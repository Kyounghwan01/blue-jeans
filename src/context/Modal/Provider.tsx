/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, createContext } from "react";

type ModalContextType = {
  component: any;
  isOpen: boolean;
  hideModal: () => void;
  modalProps?: any;
  showModal: ({
    component,
    modalProps
  }: {
    component: any;
    modalProps: { title: string; extraData?: any; callbackFunc?: () => void };
  }) => void;
};

export const ModalContext = createContext<ModalContextType>({
  component: null,
  isOpen: false,
  hideModal: () => {},
  modalProps: null,
  showModal: () => {}
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({
    component: null,
    modalProps: {},
    isOpen: false,
    callbackFunc: {}
  });

  const showModal = ({
    component,
    modalProps = {}
  }: {
    component: any;
    modalProps: any;
  }) => {
    document.body.style.overflow = "hidden";
    setData({ ...data, component, modalProps, isOpen: true });
  };

  const hideModal = () => {
    document.body.style.overflow = "unset";
    setData({ ...data, isOpen: false });
  };

  return (
    <ModalContext.Provider value={{ ...data, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
