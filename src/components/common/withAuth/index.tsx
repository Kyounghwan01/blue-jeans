import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "app/store";

const withAuth = (WrappedComponent: any): (() => JSX.Element) => {
  const Component = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);

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
