import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function RootStyleManager() {
  const location = useLocation();
  useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (rootDiv) {
      if (!location.pathname.startsWith("/admin")) {
        rootDiv.style.maxWidth = "390px";
        rootDiv.style.paddingTop = '79px';
        rootDiv.style.paddingBottom = '86px';
    }
  }
  }, [location.pathname]);
  return null;
}

export default RootStyleManager;