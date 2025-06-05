import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function RootStyleManager() {
  const location = useLocation();

  useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (!rootDiv) return;

    if (location.pathname.startsWith("/admin")) {
      // Admin 화면에서는 모든 스타일 초기화
      rootDiv.style.maxWidth = "";
      rootDiv.style.paddingTop = "";
      rootDiv.style.paddingBottom = "";
      rootDiv.classList.remove("no-max-width");
    } else {
      // 일반 화면에서는 모바일 레이아웃 적용
      rootDiv.style.maxWidth = "390px";
      rootDiv.style.paddingTop = "79px";
      rootDiv.style.paddingBottom = "86px";
    }
  }, [location.pathname]);

  return null;
}

export default RootStyleManager;