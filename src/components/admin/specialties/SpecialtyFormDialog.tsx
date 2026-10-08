import { Specialty } from "@/types/specialties";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Loader, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const specialtyFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  icon: z.string().trim().min(1, "Icon name is required"),
});

type SpecialtyFormValues = z.infer<typeof specialtyFormSchema>;

type SpecialtyFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  submitLabel: string;
  specialty?: Specialty;
  isPending: boolean;
  onSubmit: (data: SpecialtyFormValues) => Promise<void>;
};
const SpecialtyFormDialog = ({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  specialty,
  isPending,
  onSubmit,
}: SpecialtyFormDialogProps) => {
  const form = useForm<SpecialtyFormValues>({
    resolver: zodResolver(specialtyFormSchema),
    defaultValues: {
      title: specialty?.title ?? "",
      icon: specialty?.icon ?? "Tag",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="mt-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="specialty-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="specialty-title"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="icon"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="specialty-icon">Icon name</FieldLabel>
                  <Input
                    {...field}
                    id="specialty-icon"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className="h-4 w-4" />
                  <span>Saving</span>
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialtyFormDialog;
