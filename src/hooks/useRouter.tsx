import * as React from "react";
import type { Router } from "@toolpad/core/AppProvider";

export function useCustomRouter(): Router {
  const [pathname, setPathname] = React.useState(
    () => window.location.pathname
  );

  React.useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = React.useCallback((url: string | URL) => {
    const path = typeof url === "string" ? url : url.toString();
    window.history.pushState(null, "", path);
    setPathname(path);
  }, []);

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  return router;
}
