import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto grid place-items-center min-h-screen px-4">
      {children}
    </div>
  );
}

export default Layout;
