import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateSchedules } from "@/lib/hooks/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const dateInputValue = (date?: Date) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

export const scheduleFormSchema = z
  .object({
    startDate: z.string().min(1, "From date is required"),
    endDate: z.string().min(1, "To date is required"),
    startTime: z.string().min(1, "From time is required"),
    endTime: z.string().min(1, "To time is required"),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "To date must be on or after from date",
    path: ["endDate"],
  });

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

export const blankSchedule = (): ScheduleFormValues => ({
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
});

const CreateSchedule = ({ setOpen }: { setOpen: () => void }) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: blankSchedule(),
  });

  const { mutate: createSchedule, isPending } = useCreateSchedules();

  const onSubmit = (data: ScheduleFormValues) => {
    createSchedule(data, {
      onSuccess: () => {
        toast.success("Schedule created");
        setOpen();
      },
      onError: (err: any) => {
        toast.error(err?.message || "Error while creating schedule!");
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* ── From date ────────────────────────────────────────── */}
          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="startDate">From date</FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-muted-foreground w-full"
                    >
                      {field.value
                        ? format(new Date(field.value), "yyyy/MM/dd")
                        : "Start Date"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-62">
                    <Calendar
                      mode="single"
                      defaultMonth={field.value ? new Date(field.value) : new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(selectedDate) => {
                        field.onChange(dateInputValue(selectedDate));
                      }}
                      disabled={{ before: new Date() }}
                      showWeekNumber
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ── To date ──────────────────────────────────────────── */}
          <Controller
            name="endDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="endDate">To date</FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-muted-foreground w-full"
                    >
                      {field.value
                        ? format(new Date(field.value), "yyyy/MM/dd")
                        : "End Date"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-62">
                    <Calendar
                      mode="single"
                      defaultMonth={field.value ? new Date(field.value) : new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(selectedDate) => {
                        field.onChange(dateInputValue(selectedDate));
                      }}
                      disabled={{ before: new Date() }}
                      showWeekNumber
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ── From time ────────────────────────────────────────── */}
          <Controller
            name="startTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="startTime">From time</FieldLabel>
                <Input
                  {...field}
                  id="startTime"
                  type="time"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ── To time ──────────────────────────────────────────── */}
          <Controller
            name="endTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="endTime">To time</FieldLabel>
                <Input
                  {...field}
                  id="endTime"
                  type="time"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      {/* ── Actions ────────────────────────────────────────────── */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {isPending ? "Creating…" : "Create Schedule"}
        </Button>
      </div>
    </form>
  );
};

export default CreateSchedule;
