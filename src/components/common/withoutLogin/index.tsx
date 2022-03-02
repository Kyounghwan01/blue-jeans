import React, { useEffect } from "react";
import useSelectorTyped from "features/useSelectorTyped";
import { useRouter } from "next/router";

const withoutLogin = (WrappedComponent: React.FC): (() => JSX.Element) => {
  const Component = () => {
    const router = useRouter();
    const user = useSelectorTyped((state) => state.user);

    useEffect(() => {
      if (user.isLogin) {
        router.push("/");
      }
    }, [user.isLogin]);

    return <WrappedComponent />;
  };
  return Component;
};
export default withoutLogin;
