"use client";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "../shared/Logo";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { usePathname } from "next/navigation";
import { publicNavBarLinks } from "@/constants/public/nav-links";
import { getDashboardPath } from "@/helpers/get-dashboard-path"; 
import { UserRole } from "@/types/user";

export function PublicNavBar() {
  const pathName = usePathname();

  const isAuthenticated = true;
  const user: { role: UserRole } = {
    role: "PATIENT",
  };

  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        <span className="inline-flex items-center gap-2">
          <Phone className="size-3.5" aria-hidden="true" />
          For medical emergencies, contact your local emergency service.
        </span>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-xs backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="DoctorSheba home">
            <Logo />
          </Link>
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {publicNavBarLinks.map((item) => (
              <Button key={item.to} variant="ghost" asChild>
                <Link
                  href={item.to}
                  className={
                    pathName === item.to
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                >
                  {item.label}
                </Link>
              </Button>
            ))}

            {isAuthenticated && user ? (
              <Button asChild>
                <Link href={getDashboardPath(user.role)}>Open Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild className="ml-2">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
              </>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                <SheetDescription>Navigate DoctorSheba</SheetDescription>
              </SheetHeader>
              <nav
                className="mt-8 flex flex-col gap-2"
                aria-label="Mobile navigation"
              >
                {publicNavBarLinks.map((item) => (
                  <Button
                    key={item.to}
                    variant="ghost"
                    asChild
                    className="justify-start"
                  >
                    <Link href={item.to}>{item.label}</Link>
                  </Button>
                ))}

                {isAuthenticated && user ? (
                  <Button asChild>
                    <Link href={getDashboardPath(user.role)}>
                      Open Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild className="mt-2">
                      <Link href="/auth/login">Sign in</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
