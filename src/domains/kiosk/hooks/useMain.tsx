import { useState } from "react";
export default function useMain() {
  const [tab, setTab] = useState("fork");

  return {
    tab,
    setTab
  };
}
