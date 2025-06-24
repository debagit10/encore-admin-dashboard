import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const usePageLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};

export default usePageLoader;
