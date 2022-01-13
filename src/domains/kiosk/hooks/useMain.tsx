import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderList,
  removeOrderList,
  handleOrderCount,
} from "features/educationSlice";
import { RootState } from "app/store";
import usePopup from "hooks/usePopup";

export default function useMain() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state: RootState) => state.education);
  const [tab, setTab] = useState<string>("fork");
  const { handleDomainPopup } = usePopup();

  const handleOrderList = useCallback(
    (data: { type: string; name: string; price: number }) => {
      dispatch(
        addOrderList({
          type: data.type,
          name: data.name,
          price: data.price,
          count: 1,
        })
      );
    },
    []
  );

  const deleteOrder = useCallback((event) => {
    dispatch(removeOrderList(event.target.dataset.name));
  }, []);

  const handleCount = useCallback((type, product) => {
    dispatch(handleOrderCount({ type, product }));
  }, []);

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
      onClose: () => console.log("결제하셈"),
    });
  }, [orderList]);

  return {
    tab,
    setTab,
    orderList,
    handleOrderList,
    deleteOrder,
    handleCount,
    totalOrder,
    confirmOrder,
  };
}
