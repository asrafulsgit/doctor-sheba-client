"use client";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import { DoctorCardSkeleton } from "@/components/shared/SkeletonSet";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { EmptyState } from "@/components/shared/PageState";
import { IDoctorFilter } from "@/types/doctors";
import useQueryManager from "@/hooks/UseQueryManager";
import { useDoctors } from "@/lib/hooks/UseDoctor";

// seo optimization
// export const Route = createFileRoute("/doctors/")({
//   validateSearch: parseSearch,
//   head: () => ({
//     meta: [
//       { title: "Find Doctors | DoctorSheba" },
//       {
//         name: "description",
//         content: "Browse doctors by specialty and availability with DoctorSheba.",
//       },
//       { property: "og:title", content: "Find Doctors | DoctorSheba" },
//       {
//         property: "og:description",
//         content: "Browse doctors by specialty and availability with DoctorSheba.",
//       },
//       { property: "og:url", content: "/doctors" },
//     ],
//     links: [{ rel: "canonical", href: "/doctors" }],
//   }),
//   component: DoctorsPage,
// });

const Doctors = () => {
  const { getQuery, getAllQueries, setQuery } = useQueryManager();
  const allQueries: IDoctorFilter = getAllQueries();
  const searchTerm = getQuery("searchTerm");
  const { data, isLoading, isError, error } = useDoctors(allQueries);
  const doctors = data?.data;

  return (
    <>
      <PublicPageHeader
        eyebrow="Doctor directory"
        title="Find a doctor who fits your needs"
        description="Search by name, specialty, experience, gender, and current schedule availability."
      >
        <div className="relative mt-7 max-w-2xl">
          <Search
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            aria-label="Search doctors by name"
            placeholder="Search by doctor name"
            value={searchTerm ?? ""}
            onChange={(event) => setQuery("searchTerm", event.target.value)}
            className="h-13 bg-surface pl-12 pr-12 text-base"
          />
        </div>
      </PublicPageHeader>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Available doctors
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {doctors?.length} {doctors?.length === 1 ? "doctor" : "doctors"}{" "}
              match your search
            </p>
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
              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal className="size-5 text-primary" />
                <h2 className="font-semibold text-foreground">Filters</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>
          <section aria-live="polite">
            {isLoading ? (
              <div className="grid min-h-[470px] gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <DoctorCardSkeleton rows={3} />
              </div>
            ) : doctors?.length ? (
              <div className="grid min-h-[470px] gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No doctors match these filters"
                description="Try removing a filter or searching with a different doctor name."
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Doctors;
