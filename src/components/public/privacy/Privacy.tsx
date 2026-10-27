import { PublicLayout } from "@/components/layout/PublicLayout";
import Link from "next/link";

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Information we collect",
    body: [
      "When you create an account we collect your name, email address, phone number, date of birth and gender so doctors can identify you correctly.",
      "When you book an appointment we store the doctor, date, time slot, fee and payment status of that visit. Anything you add to your health profile — blood group, height, weight, allergies, chronic conditions and past treatments — is also stored to make consultations faster and safer.",
      "When you use the symptom checker we process the symptoms you type to suggest suitable doctors. Your conversations with it are not stored after you close the page.",
    ],
  },
  {
    heading: "2. How we use your information",
    body: [
      "We use your information to run the service: creating and confirming appointments, delivering prescriptions and reports, processing payments and refunds, and contacting you about your visits.",
      "We also use aggregated, non-identifying statistics (for example, how many appointments were booked in a week) to improve the platform. We never sell your personal or medical data to advertisers or third parties.",
    ],
  },
  {
    heading: "3. Who can see your medical data",
    body: [
      "Your medical records — prescriptions, reports and health profile — are visible to the doctors you have consulted or booked with, and to you. Admin staff can see appointment and payment records for support purposes but not private medical content.",
      "Doctors can see your identity, contact details, health snapshot and visit history only when a legitimate care relationship exists.",
    ],
  },
  {
    heading: "4. Data storage and security",
    body: [
      "Your data is stored in encrypted databases with strict access controls. Payments are processed by our payment provider; we never store your full card details.",
      "Profile photos you upload are visible to the doctors you visit. We apply the same protection standards to every account, patient or doctor.",
    ],
  },
  {
    heading: "5. Your rights",
    body: [
      "You can review and update your personal information at any time from your dashboard settings. You may request correction of your medical records, export of your data, or deletion of your account by contacting us.",
      "Deleting your account removes your profile and personal information. Records that doctors are legally required to keep may be retained in anonymised form.",
    ],
  },
  {
    heading: "6. Cookies",
    body: [
      "We use a small number of essential cookies to keep you signed in and remember your preferences. We do not use advertising or tracking cookies.",
    ],
  },
  {
    heading: "7. Changes to this policy",
    body: [
      "If we change this policy, we will update this page and change the effective date below. Continued use of DoctorSheba after a change means you accept the updated policy.",
    ],
  },
  {
    heading: "8. Contact us",
    body: [
      "For any privacy question or request, email hello@doctorsheba.bd, call 10666, or write to Plot 22, Road 7, Dhanmondi, Dhaka 1209.",
    ],
  },
];

const Privacy = () => {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Your trust matters. This policy explains what information
            DoctorSheba collects, how it is used, and the choices you have.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Effective date: 27 October 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div
              key={s.heading}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Privacy;
