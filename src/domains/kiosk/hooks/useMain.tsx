import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import {
  addOrderList,
  removeOrderList,
  handleOrderCount,
  resetOrderList
} from "features/educationSlice";
import { IOrderList } from "features/types/educationSliceType";
import { RootState } from "app/store";
import usePopup from "hooks/usePopup";

export default function useMain() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orderList } = useSelector(
    (state: RootState) => ({
      orderList: state.education.orderList
    }),
    shallowEqual
  );
  const [tab, setTab] = useState<string>("fork");
  const { handleDomainPopup, handlePopup } = usePopup();

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: "무공돈까스를 클릭해주세요!",
      autoClose: { time: 3000 }
    });

    // step별로 누르면 다름 hintStep으로 넘어가기

    // const introHint = setTimeout(() => {
    //   // setHint(1);
    // }, 7000);
  }, []);

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

  const handleOrderList = useCallback((order: IOrderList) => {
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

    handleDomainPopup("kiosk/components/popup/OrderDetailPop", "주문디테일", {
      order,
      onClose: handleOrderListWithSide
    });
  }, []);

  const deleteOrder = useCallback(event => {
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
    orderList.forEach(order => {
      price += order.totalPrice;
      count += order.count;
    });
    return { count, price: price.toLocaleString() };
  }, [orderList]);

  const confirmOrder = useCallback(() => {
    handleDomainPopup("kiosk/components/popup/OrderListPop", "주문리스트", {
      orderList,
      totalOrder,
      onClose: popPayment
    });
  }, [orderList]);

  const popPayment = useCallback(({ type }: { type: string }) => {
    handleDomainPopup("kiosk/components/popup/OrderPayment", "결제", {
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
    handleOrderReset
  };
}
