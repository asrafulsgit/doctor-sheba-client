import { ReactNode } from "react";
import { PublicNavBar } from "../public/NavBar";
import { PublicFooter } from "../public/Footer";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <PublicNavBar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
