import { Stethoscope } from "lucide-react";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground text-primary">
            <Stethoscope className="h-5 w-5" />
          </span>
          DoctorSheba
        </Link>
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Healthcare,
            <br />
            on your schedule.
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/85">
            Book qualified doctors, manage prescriptions and keep your records
            secure — all from a single, trusted platform.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} DoctorSheba
        </p>
      </div>

      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6 lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="h-4 w-4" />
            </span>
            DoctorSheba
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default layout;
