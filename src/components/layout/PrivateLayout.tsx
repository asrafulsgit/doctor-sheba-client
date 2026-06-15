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
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { UserRole } from "@/types/user";

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
  { to: "/patient/reviews", label: "Reviews", icon: Star },
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
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/admins", label: "Admins", icon: UserCog },
  { to: "/admin/settings", label: "Settings", icon: Settings },
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

interface DashboardShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  title,
  description,
  actions,
  children,
}: DashboardShellProps) {
  //   const { user, logout } = useAuth();
  //   const navigate = useNavigate();

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user: { role: UserRole; name: string } = {
    role: "PATIENT",
    name: "Asraful",
  };
  if (!user) return null;
  const nav = navFor(user.role);

  const handleLogout = () => {
    // logout();
    // navigate({ to: "/auth/login" });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-foreground"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">DoctorSheba</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end text-right sm:flex">
              <span className="text-sm font-medium text-foreground">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {roleLabel(user.role)}
              </span>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
              {user.name.slice(0, 1).toUpperCase()}
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

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar — desktop */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border bg-background lg:block">
          <SidebarNav nav={nav} pathname={pathname} />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-background shadow-elevated">
              <div className="flex h-16 items-center justify-between px-4">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarNav
                nav={nav}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex flex-wrap items-center gap-2">{actions}</div>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

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
    <nav className="flex h-full flex-col gap-0.5 overflow-y-auto p-3">
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
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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
