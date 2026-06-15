"use client";
import { useEffect, useMemo, useState } from "react";
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
import FilterPanel, { DoctorSearch } from "./FilterPanel";
import { featuredDoctors } from "@/constants/public/doctors";
import { PublicPageHeader } from "../PublicPageHeader";
import { SkeletonSet } from "@/components/shared/SkeletonSet";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { EmptyState } from "@/components/shared/PageState";

// function parseSearch(search: Record<string, unknown>): DoctorSearch {
//   const page = Number(search.page);
//   return {
//     q: typeof search.q === "string" ? search.q.slice(0, 80) : undefined,
//     specialty:
//       typeof search.specialty === "string" ? search.specialty : undefined,
//     gender:
//       search.gender === "MALE" || search.gender === "FEMALE"
//         ? search.gender
//         : undefined,
//     experience:
//       typeof search.experience === "string" ? search.experience : undefined,
//     available:
//       search.available === true || search.available === "true"
//         ? true
//         : undefined,
//     page: Number.isInteger(page) && page > 0 ? page : 1,
//   };
// }

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
  //   const search = Route.useSearch();
  //   const navigate = useNavigate({ from: "/doctors" });
  const [loading, setLoading] = useState(false);
  const update = (patch: Partial<DoctorSearch>) => {
    setLoading(true);
    // void navigate({ search: { ...search, ...patch }, replace: true });
  };
  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, [loading]);
  //   const filtered = useMemo(
  //     () =>
  //       featuredDoctors.filter((doctor) => {
  //         const query = search.q?.trim().toLowerCase();
  //         return (
  //           (!query || doctor.name.toLowerCase().includes(query)) &&
  //           (!search.specialty ||
  //             doctor.specialtyIds.includes(search.specialty as never)) &&
  //           (!search.gender || doctor.gender === search.gender) &&
  //           (!search.experience ||
  //             doctor.experience >= Number(search.experience)) &&
  //           (!search.available || doctor.available)
  //         );
  //       }),
  //     [search],
  //   );
  const filtered = featuredDoctors;
  const activeFilters = [
    // search.specialty,
    // search.gender,
    // search.experience,
    // search.available,
  ].filter(Boolean).length;

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
            value={""}
            onChange={(event) => update({ q: event.target.value || undefined })}
            className="h-13 bg-surface pl-12 pr-12 text-base"
          />
          {/* {true ? (  // clear search field
            <Button
              size="icon"
              variant="ghost"
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => update({ q: undefined })}
            >
              <X />
            </Button>
          ) : null} */}
        </div>
      </PublicPageHeader>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Available doctors
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "doctor" : "doctors"}{" "}
              match your search
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter /> Filters {activeFilters ? `(${activeFilters})` : ""}
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
                <FilterPanel
                  search={{
                    q: "",
                    specialty: "",
                    gender: "MALE",
                    experience: "",
                    available: true,
                  }}
                  update={update}
                />
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
              <FilterPanel
                search={{
                  q: "",
                  specialty: "",
                  gender: "MALE",
                  experience: "",
                  available: true,
                }}
                update={update}
              />
              {activeFilters ? (
                <Button
                  variant="ghost"
                  className="mt-6 w-full"
                  onClick={() =>
                    update({
                      specialty: undefined,
                      gender: undefined,
                      experience: undefined,
                      available: undefined,
                    })
                  }
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          </aside>
          <section aria-live="polite">
            {loading ? (
              <SkeletonSet rows={3} variant="cards" />
            ) : filtered.length ? (
              <div className="grid min-h-[470px] gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No doctors match these filters"
                description="Try removing a filter or searching with a different doctor name."
                actionLabel="Clear filters"
                onAction={() =>
                  update({
                    q: undefined,
                    specialty: undefined,
                    gender: undefined,
                    experience: undefined,
                    available: undefined,
                  })
                }
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Doctors;
