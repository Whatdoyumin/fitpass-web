import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Admin: React.FC<PortalProps> = ({ children }) => {
  const [adminContainer, setAdminContainer] = useState<HTMLElement | null>(null);

  // #admin div가 준비되었는지 체크하고 설정하는 로직
  useLayoutEffect(() => {
    let node = document.getElementById("admin");

    // #admin이 없으면 생성
    if (!node) {
      node = document.createElement("div");
      node.id = "admin";
      document.body.prepend(node);
    }

    setAdminContainer(node);

    // cleanup
    return () => {
      if (node && node.childElementCount === 0) {
        node.remove();
      }
    };
  }, []); // 빈 배열로 한 번만 실행되도록

  // adminContainer가 준비되지 않았으면 null 반환
  if (!adminContainer) return null;

  // children을 #admin div에 렌더링
  return createPortal(children, adminContainer);
};

export default Admin;
