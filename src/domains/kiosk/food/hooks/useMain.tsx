import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import {
  addOrderList,
  removeOrderList,
  handleOrderCount,
  resetOrderList,
  setCurrentOrder,
  setKioskTutotialHint
} from "features/kiosk/foodKioskSlice";
import { IOrderList } from "features/types/foodKioskSliceType";
import { RootState } from "app/store";
import usePopup from "hooks/usePopup";

const BasicPopRoute = "kiosk/food/components/popup";

export default function useMain() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orderList, currentHintStep, currentOrder, kioskTutorialHint } =
    useSelector(
      (state: RootState) => ({
        orderList: state.foodKiosk.orderList,
        currentOrder: state.foodKiosk.currentOrder,
        currentHintStep: state.foodKiosk.currentHintStep,
        kioskTutorialHint: state.foodKiosk.kioskTutorialHint
      }),
      shallowEqual
    );
  const [tab, setTab] = useState<string>("fork");
  const { handleDomainPopup, handlePopup } = usePopup();

  useEffect(() => {
    if (!kioskTutorialHint[currentHintStep].desc) return;

    handlePopup("common/Alert", "", {
      desc: kioskTutorialHint[currentHintStep].desc,
      autoClose: { time: 3000 },
      onClose: popupCallback
    });
  }, [currentHintStep]);

  const popupCallback = useCallback(() => {
    return currentHintStep === 1
      ? handleDomainPopup(`${BasicPopRoute}/OrderDetailPop`, "주문디테일", {
          order: currentOrder as IOrderList & {
            side: { name: string; price: number }[];
          },
          visualHint: currentHintStep,
          onClose: handleOrderListWithSide
        })
      : null;
  }, [currentHintStep]);

  const handleOrderListWithSide = useCallback(order => {
    let payload = {
      type: order.type,
      name: order.name,
      price: order.price,
      count: 1
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
        return dispatch(setKioskTutotialHint(1));
      }

      if (!order.side) {
        return dispatch(
          addOrderList({
            type: order.type,
            name: order.name,
            price: order.price,
            count: 1
          })
        );
      }

      handleDomainPopup(`${BasicPopRoute}/OrderDetailPop`, "주문디테일", {
        order,
        visualHint: currentHintStep,
        onClose: handleOrderListWithSide
      });
    },
    [currentHintStep]
  );

  const deleteOrder = useCallback(event => {
    dispatch(removeOrderList(event.target.dataset.name));
  }, []);

  const handleCount = useCallback((type, product, isHint) => {
    //
    console.log(11, isHint);
    if (isHint) {
      dispatch(setKioskTutotialHint(3));
    }
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
    orderList.forEach(order => {
      price += order.totalPrice;
      count += order.count;
    });
    return { count, price: price.toLocaleString() };
  }, [orderList]);

  const confirmOrder = useCallback(() => {
    dispatch(setKioskTutotialHint(4));

    handleDomainPopup(`${BasicPopRoute}/OrderListPop`, "주문리스트", {
      orderList,
      totalOrder,
      onClose: popPayment
    });
  }, [orderList]);

  const popPayment = useCallback(({ type }: { type: string }) => {
    handleDomainPopup(`${BasicPopRoute}/OrderPayment`, "결제", {
      type,
      onClose: () => router.push("/education")
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
    currentHintStep
    // visualHint,
  };
}
