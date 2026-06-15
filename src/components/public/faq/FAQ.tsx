// seo optimization
// export const Route = createFileRoute("/faq")({
//   head: () => ({
//     meta: [
//       { title: "Healthcare FAQ | DoctorSheba" },
//       {
//         name: "description",
//         content:
//           "Answers about appointments, cancellations, and DoctorSheba services.",
//       },
//       { property: "og:title", content: "Healthcare FAQ | DoctorSheba" },
//       {
//         property: "og:description",
//         content:
//           "Answers about appointments, cancellations, and DoctorSheba services.",
//       },
//       { property: "og:url", content: "/faq" },
//     ],
//     links: [{ rel: "canonical", href: "/faq" }],
//     scripts: [
//       {
//         type: "application/ld+json",
//         children: JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "FAQPage",
//           mainEntity: faqs.map((item) => ({
//             "@type": "Question",
//             name: item.question,
//             acceptedAnswer: { "@type": "Answer", text: item.answer },
//           })),
//         }),
//       },
//     ],
//   }),
// });

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PublicPageHeader } from "../PublicPageHeader";

const FAQ = () => {
  return (
    <>
      <PublicPageHeader
        eyebrow="Help center"
        title="Frequently asked questions"
        description="Clear answers about doctor discovery, appointment selection, cancellation, payment status, and emergency care."
      />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-surface px-5 sm:px-7"
        >
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-6 text-left text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-xl bg-info p-6 text-info-foreground">
          <h2 className="text-xl font-semibold">Still need help?</h2>
          <p className="mt-2 leading-7">
            Contact platform support for account and service questions. Medical
            emergencies require immediate local emergency care.
          </p>
        </div>
      </main>
    </>
  );
};

export default FAQ;

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Find a doctor, open the doctor profile, choose an available date and schedule, then sign in to continue securely. An appointment is only created after the authenticated confirmation step.",
  },
  {
    question: "Can I cancel an appointment?",
    answer:
      "Authenticated patients can manage eligible appointments in their workspace. Cancellation availability depends on the appointment’s current canonical status.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "The current data model records only paid or unpaid status. Any refund eligibility or process must follow the payment provider and platform policy shown at the time of payment; no unsupported refund status is promised here.",
  },
  {
    question: "How do I choose the right specialty?",
    answer:
      "Browse the specialties directory for a plain-language overview, then compare doctors’ qualifications, experience, workplace, fees, and available schedules.",
  },
  {
    question: "Is DoctorSheba an emergency service?",
    answer:
      "No. For severe symptoms or a life-threatening situation, contact local emergency services or go to the nearest emergency facility immediately.",
  },
];
