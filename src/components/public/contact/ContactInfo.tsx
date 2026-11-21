import { Building2, Mail, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Building2,
    label: "Address",
    value: "Plot 22, Road 7, Dhanmondi, Dhaka 1209",
  },
  { icon: Phone, label: "Phone", value: "+8801920286432" },
  {
    icon: Mail,
    label: "Email",
    value: "support@doctorsheba.com",
  },
];
const ContactInfo = () => {
  return (
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
              <h3 className="font-semibold text-foreground">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
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
          10666
        </a>
        <p className="mt-2 text-sm leading-6 text-destructive">
          Use emergency services for urgent or life-threatening medical
          situations.
        </p>
      </div>
    </section>
  );
};

export default ContactInfo;
