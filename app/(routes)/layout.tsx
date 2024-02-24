import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
interface MainLayoutProps {
  children: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="maincol">{children}</div>;
}
