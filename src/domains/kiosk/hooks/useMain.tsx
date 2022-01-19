import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import {
  addOrderList,
  removeOrderList,
  handleOrderCount,
  resetOrderList,
  setCurrentHintStep,
  setCurrentOrder,
} from "features/educationSlice";
import { IOrderList } from "features/types/educationSliceType";
import { RootState } from "app/store";
import usePopup from "hooks/usePopup";

// let timeOutId: NodeJS.Timeout | null = null;

export default function useMain({ hint }: { hint: { desc: string }[] }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orderList, currentHintStep, currentOrder } = useSelector(
    (state: RootState) => ({
      orderList: state.education.orderList,
      currentOrder: state.education.currentOrder,
      currentHintStep: state.education.currentHintStep,
    }),
    shallowEqual
  );
  const [tab, setTab] = useState<string>("fork");
  // const [visualHint, setVisualHint] = useState<number>(-1);
  const { handleDomainPopup, handlePopup } = usePopup();

  useEffect(() => {
    // if (timeOutId) {
    //   clearTimeout(timeOutId);
    // }

    // timeOutId = setTimeout(() => {
    //   setVisualHint(currentHintStep);
    // }, 10000);

    handlePopup("common/Alert", "", {
      desc: hint[currentHintStep].desc,
      autoClose: { time: 3000 },
      onClose: popupCallback,
    });
  }, [currentHintStep]);

  const popupCallback = useCallback(() => {
    return currentHintStep === 1
      ? handleDomainPopup(
          "kiosk/components/popup/OrderDetailPop",
          "주문디테일",
          {
            order: currentOrder,
            visualHint: currentHintStep,
            onClose: handleOrderListWithSide,
          }
        )
      : null;
  }, [currentHintStep]);

  const handleOrderListWithSide = useCallback((order) => {
    let payload = {
      type: order.type,
      name: order.name,
      price: order.price,
      count: 1,
    } as IOrderList;

    if (order.side.length) {
      payload = { ...payload, side: order.side };
    }

    return dispatch(addOrderList(payload));
  }, []);

  const handleOrderList = useCallback(
    (order: IOrderList) => {
      dispatch(setCurrentOrder(order));

      if (order.name === "무공돈까스" && currentHintStep === 0) {
        return dispatch(setCurrentHintStep(1));
      }

      if (!order.side) {
        return dispatch(
          addOrderList({
            type: order.type,
            name: order.name,
            price: order.price,
            count: 1,
          })
        );
      }

      handleDomainPopup("kiosk/components/popup/OrderDetailPop", "주문디테일", {
        order,
        visualHint: currentHintStep,
        onClose: handleOrderListWithSide,
      });
    },
    [currentHintStep]
  );

  const deleteOrder = useCallback((event) => {
    dispatch(removeOrderList(event.target.dataset.name));
  }, []);

  const handleCount = useCallback((type, product) => {
    dispatch(handleOrderCount({ type, product }));
  }, []);

  const handleOrderReset = useCallback(() => {
    if (orderList.length) {
      dispatch(resetOrderList());
    }
  }, [orderList]);

  const totalOrder = useMemo(() => {
    let count = 0;
    let price = 0;
    orderList.forEach((order) => {
      price += order.totalPrice;
      count += order.count;
    });
    return { count, price: price.toLocaleString() };
  }, [orderList]);

  const confirmOrder = useCallback(() => {
    handleDomainPopup("kiosk/components/popup/OrderListPop", "주문리스트", {
      orderList,
      totalOrder,
      onClose: popPayment,
    });
  }, [orderList]);

  const popPayment = useCallback(({ type }: { type: string }) => {
    handleDomainPopup("kiosk/components/popup/OrderPayment", "결제", {
      type,
      onClose: () => router.push("/education"),
    });
  }, []);

  return {
    tab,
    setTab,
    orderList,
    handleOrderList,
    deleteOrder,
    handleCount,
    totalOrder,
    confirmOrder,
    handleOrderReset,
    currentHintStep,
    // visualHint,
  };
}
