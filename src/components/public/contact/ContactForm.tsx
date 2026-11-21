"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email must not exceed 254 characters"),

  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must not exceed 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    toast.success("Message submitted successfully!");
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 grid gap-5">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="karim"
                maxLength={120}
                className="mt-2 h-11"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="example@gmail.com"
                maxLength={254}
                className="mt-2 h-11"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                {...field}
                id="message"
                maxLength={1000}
                className="mt-2 min-h-36"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
        <Send className="size-4" />
        Send message
      </Button>
    </form>
  );
};

export default ContactForm;
