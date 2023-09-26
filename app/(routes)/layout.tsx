import React, { ReactNode } from "react";
interface MainLayoutProps {
  children: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="pt-20">{children}</div>;
}