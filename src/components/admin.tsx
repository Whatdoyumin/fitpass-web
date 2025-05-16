import React, { ReactNode } from "react";

interface AdminProps {
  children: ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white absolute overflow-y-auto pt-[calc(theme(spacing.header))] pl-[calc(theme(spacing.sideNavbar))]">
      {children}
    </div>
  );
};

export default Admin; 