import { PublicPageHeader } from "../PublicPageHeader";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Contact"
        title="How can we help?"
        description="Reach DoctorSheba for platform support and general service information. For medical emergencies, contact emergency services immediately."
      />
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <ContactInfo />
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Send a message
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This form is for platform enquiries, not medical advice or
            emergencies.
          </p>
          <ContactForm />
        </section>
      </main>
    </>
  );
};

export default Contact;
