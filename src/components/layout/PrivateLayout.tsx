"use client";
import {
  Menu,
  X,
  LogOut,
  Stethoscope,
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  FlaskConical,
  Wallet2,
  HeartPulse,
  Star,
  Settings,
  ClipboardList,
  ListChecks,
  UserCog,
  BarChart3,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { User, UserRole } from "@/types/user";
import { Logo } from "../shared/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { activatedDashboard } from "@/constants/public/user";
import { useMe } from "@/lib/hooks/useUser";
import {
  DashboardSidebarSkeleton,
  DashboardTopNavbarSkeleton,
} from "../shared/SkeletonSet";
import { useLogout } from "@/lib/hooks/useAuth";
import { toast } from "sonner";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PATIENT_NAV: NavItem[] = [
  { to: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patient/appointments", label: "Appointments", icon: Calendar },
  { to: "/patient/doctors", label: "My Doctors", icon: Users },
  { to: "/patient/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/patient/reports", label: "Medical Reports", icon: FlaskConical },
  { to: "/patient/payments", label: "Payments", icon: Wallet2 },
  { to: "/patient/health-profile", label: "Health Profile", icon: HeartPulse },
  { to: "/patient/settings", label: "Settings", icon: Settings },
];

const DOCTOR_NAV: NavItem[] = [
  { to: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/doctor/appointments", label: "Appointments", icon: Calendar },
  { to: "/doctor/patients", label: "Patient Records", icon: Users },
  { to: "/doctor/schedules", label: "Schedules", icon: ListChecks },
  { to: "/doctor/prescriptions", label: "Prescriptions", icon: ClipboardList },
  { to: "/doctor/reviews", label: "Reviews", icon: Star },
  { to: "/doctor/earnings", label: "Earnings", icon: Wallet2 },
  { to: "/doctor/settings", label: "Settings", icon: Settings },
];

const ADMIN_NAV: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/appointments", label: "Appointments", icon: Calendar },
  { to: "/admin/schedules", label: "Schedules", icon: ListChecks },
  { to: "/admin/payments", label: "Payments", icon: Wallet2 },
  { to: "/admin/specialties", label: "Specialties", icon: Tags },
  // { to: "/admin/reviews", label: "Reviews", icon: Star },
  // { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/admins", label: "Admins", icon: UserCog },
  // { to: "/admin/settings", label: "Settings", icon: Settings },
];

function navFor(role: UserRole): NavItem[] {
  if (role === "PATIENT") return PATIENT_NAV;
  if (role === "DOCTOR") return DOCTOR_NAV;
  if (role === "ADMIN" || role === "SUPER_ADMIN") return ADMIN_NAV;
  return [];
}

function roleLabel(role: UserRole) {
  if (role === "PATIENT") return "Patient";
  if (role === "DOCTOR") return "Doctor";
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "Administrator";
}

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useMe();
  const user = data?.data;
  const nav = navFor(user?.role);
  const { mutate: logout, isPending } = useLogout();

  function handleLogout() {
    const toastId = toast.loading("Logging out...");
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully", {
          id: toastId,
        });
        router.push("/auth/login");
      },

      onError: (error) => {
        toast.error(error.message, {
          id: toastId,
        });
      },
    });
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top navbar */}
      {!isLoading ? (
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
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
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>
                      <span className="text-sm font-semibold">Menu</span>
                    </SheetTitle>
                  </SheetHeader>
                  <aside className="bg-background shadow-elevated">
                    <SidebarNav nav={nav} pathname={pathname} />
                  </aside>
                </SheetContent>
              </Sheet>

              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-foreground"
              >
                <Logo />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden flex-col items-end text-right sm:flex">
                <span className="font-semibold text-foreground">
                  {user?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {roleLabel(user?.role)}
                </span>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                {user?.name.slice(0, 1).toUpperCase()}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
      ) : (
        <DashboardTopNavbarSkeleton />
      )}

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar — desktop */}
        {!isLoading ? (
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border bg-background lg:block">
            <SidebarNav nav={nav} pathname={pathname} />
          </aside>
        ) : (
          <DashboardSidebarSkeleton />
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-2 py-4 sm:px-4 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function SidebarNav({
  nav,
  pathname,
  onNavigate,
}: {
  nav: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex h-full flex-col gap-0.5 overflow-y-auto pt-5 lg:p-3">
      {nav.map((item) => {
        const active =
          pathname === item.to || pathname.startsWith(item.to + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            href={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2  font-medium transition-colors",
              active
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                active ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="flex-1">{item.label}</span>
            {active && <ChevronRight className="h-3.5 w-3.5 text-primary" />}
          </Link>
        );
      })}
    </nav>
  );
}

export default PrivateLayout;
