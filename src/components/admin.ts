import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Admin: React.FC<PortalProps> = ({ children }) => {
  const [adminContainer, setAdminContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("admin");

    // admin이 없으면 생성
    if (!node) {
      node = document.createElement("div");
      node.id = "admin";
      document.body.prepend(node);
    }

    setAdminContainer(node);

    return () => {
      // admin 페이지를 벗어나면 admin 요소 삭제
      if (node && node.childElementCount === 0) {
        node.remove();
      }
    };
  }, []);

  if (!adminContainer) return null;

  return createPortal(children, adminContainer);
};

export default Admin;
