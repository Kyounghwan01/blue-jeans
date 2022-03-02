import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSelectorTyped from "features/useSelectorTyped";

const withAuth = (WrappedComponent: React.FC): (() => JSX.Element) => {
  const Component = () => {
    const router = useRouter();
    const user = useSelectorTyped((state) => state.user);

    useEffect(() => {
      if (!user.isLogin) {
        router.push("/login");
      }
    }, [user.isLogin]);

    return <WrappedComponent />;
  };
  return Component;
};
export default withAuth;
