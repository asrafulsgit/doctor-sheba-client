import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterPanel from "./FilterPanel";
import { PublicPageHeader } from "../PublicPageHeader";
import SearchDoctors from "./SearchDoctors";
import DoctorsGrid from "./DoctorsGrid";
import ChatBot from "@/components/shared/ChatBot";

const Doctors = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Doctor directory"
        title="Find a doctor who fits your needs"
        description="Search by name, specialty, experience, gender, and current schedule availability."
      >
        <SearchDoctors />
      </PublicPageHeader>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              Available doctors
            </h2>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter doctors</SheetTitle>
                <SheetDescription>
                  Narrow the directory using canonical doctor information.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-border bg-surface p-5 shadow-xs">
              <div className="mb-4 sm:mb-6 flex items-center gap-2">
                <SlidersHorizontal className="size-5 text-primary" />
                <h2 className="font-semibold text-foreground">Filters</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>
          <section aria-live="polite">
            <DoctorsGrid />
          </section>
        </div>
      </main>

      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 mb-5">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs sm:p-7">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              Need help choosing?
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Get doctor suggestions for your concern
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Describe what you need help with to see relevant specialties and
              doctors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
