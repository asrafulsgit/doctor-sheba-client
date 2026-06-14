 
import { PublicFooter } from "@/components/public/Footer";
import { PublicNavBar } from "@/components/public/NavBar";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavBar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
