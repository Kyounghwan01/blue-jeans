import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { orderList } = useSelector((state: RootState) => state.education);
  const [tab, setTab] = useState<string>("fork");
  const { handleDomainPopup } = usePopup();

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
    dispatch(resetOrderList());
  }, []);

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
