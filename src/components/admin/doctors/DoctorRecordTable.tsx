import { EmptyState } from "@/components/shared/PageState";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useQueryManager from "@/hooks/UseQueryManager";
import { useDoctors } from "@/lib/hooks/UseDoctor";
import { IDoctor, IDoctorFilter } from "@/types/doctors";
import { Edit3, Eye, MoreHorizontal, Power, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const headers = [
  "DOCTOR",
  "Specialty",
  "BMDC",
  "Hospital",
  "Fee",
  "Rating",
  "ACTION",
];
const DoctorRecordTable = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: IDoctorFilter = getAllQueries();
  const { data, isLoading, isError, error } = useDoctors(allQueries);
  const doctors = data?.data || [];

  if (isLoading)
    return (
      <div className="mt-2">
        <RowSkeleton />
      </div>
    );

  if (isError || doctors.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        description={
          isError
            ? error.message
            : "When you have doctors, they'll show up here."
        }
        className="mt-2"
      />
    );
  }
  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead
                key={h}
                className="uppercase text-xs text-muted-foreground px-2"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors?.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="flex gap-2">
                <Link
                  href={`/doctor/doctors/${doctor.id}`}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                    {doctor.profilePhoto ? (
                      <Image
                        src={doctor.profilePhoto ?? ""}
                        alt="Profile"
                        className="h-full w-full rounded-2xl object-cover"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <span>{doctor.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doctor.email}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {doctor?.doctorSpecialities &&
                  doctor?.doctorSpecialities[0]?.specialities.title}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {doctor.registrationNumber}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {doctor.currentWorkingPlace}
              </TableCell>
              <TableCell className="font-medium">
                ৳{doctor.appointmentFee}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-0.5 font-medium text-warning-foreground">
                  <Star className="h-3 w-3 fill-current" />
                  {doctor.averageRating}
                </span>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                    // onClick={() => setView(d)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    // onClick={() => setEdit(d)}
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    {doctor.isDeleted ? (
                      <DropdownMenuItem
                        onClick={() => {
                          //   setStatus(d.id, "ACTIVE");
                          //   toast.success("Doctor activated");
                        }}
                      >
                        <Power className="h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                      // className="text-destructive"
                      // onClick={() => setSuspend(d)}
                      >
                        <Power className="h-4 w-4" />
                        Suspend
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorRecordTable;
