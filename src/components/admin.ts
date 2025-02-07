import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Admin: React.FC<PortalProps> = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("admin");

  if (!node) {
    return null;
  }

  return createPortal(children, node);
};

export default Admin;
