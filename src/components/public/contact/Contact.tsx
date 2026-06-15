import type { FormEvent } from "react";
import { Building2, Mail, Phone, Send } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublicPageHeader } from "../PublicPageHeader";

// seo optimization
// export const Route = createFileRoute("/contact")({
//   head: () => ({
//     meta: [
//       { title: "Contact DoctorSheba" },
//       {
//         name: "description",
//         content:
//           "Contact DoctorSheba for platform support and healthcare service information.",
//       },
//       { property: "og:title", content: "Contact DoctorSheba" },
//       {
//         property: "og:description",
//         content:
//           "Contact DoctorSheba for platform support and healthcare service information.",
//       },
//       { property: "og:url", content: "/contact" },
//     ],
//     links: [{ rel: "canonical", href: "/contact" }],
//   }),
//   component: ContactPage,
// });

// function ContactPage() {
// //   const submit = (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     toast.info("Message sending is not connected yet", {
// //       description:
// //         "Contact submissions remain presentation-only until an approved storage or email contract is added.",
// //     });
// //   };

// }

const contactInfo = [
  {
    icon: Building2,
    label: "Address",
    value: "DoctorSheba Support, Dhaka, Bangladesh",
  },
  { icon: Phone, label: "Phone", value: "+880 9600 000000" },
  {
    icon: Mail,
    label: "Email",
    value: "support@doctorsheba.example",
  },
];

const Contact = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Contact"
        title="How can we help?"
        description="Reach DoctorSheba for platform support and general service information. For medical emergencies, contact emergency services immediately."
      />
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <section>
          <h2 className="text-2xl font-semibold text-foreground">
            Contact information
          </h2>
          <div className="mt-6 grid gap-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 border-b border-border py-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-info text-info-foreground">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-destructive-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-destructive">
              Emergency hotline
            </p>
            <a
              href="tel:999"
              className="mt-2 block text-3xl font-semibold text-destructive"
            >
              999
            </a>
            <p className="mt-2 text-sm leading-6 text-destructive">
              Use emergency services for urgent or life-threatening medical
              situations.
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Send a message
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This form is for platform enquiries, not medical advice or
            emergencies.
          </p>
          <form 
        //   onSubmit={submit} 
          className="mt-7 grid gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="karim" required maxLength={120} className="mt-2 h-11" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                type="email"
                required
                maxLength={254}
                className="mt-2 h-11"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                maxLength={1000}
                className="mt-2 min-h-36"
              />
            </div>
            <Button type="submit" size="lg">
              <Send /> Send message
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Contact;
