import { PublicLayout } from "@/components/layout/PublicLayout";

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of these terms",
    body: [
      "By creating an account or using DoctorSheba you agree to these Terms & Conditions and to our Privacy Policy. If you do not agree, please do not use the platform.",
    ],
  },
  {
    heading: "2. What DoctorSheba is",
    body: [
      "DoctorSheba is a digital platform that connects patients with registered doctors in Bangladesh. We help you find doctors, book appointment slots, receive prescriptions and keep medical records in one place.",
      "DoctorSheba is a facilitation service, not a hospital or an emergency service. An appointment made through the platform is a commitment to a consultation; it is not itself medical treatment or a diagnosis.",
    ],
  },
  {
    heading: "3. Accounts",
    body: [
      "You must provide accurate information when registering and keep your contact details up to date. You are responsible for keeping your password confidential and for all activity under your account.",
      "Doctors must hold a valid medical licence and BMDC registration. DoctorSheba verifies every doctor's registration before their profile becomes visible to patients; a doctor's account may be paused or removed if verification fails or credentials expire.",
    ],
  },
  {
    heading: "4. Appointments",
    body: [
      "Appointment slots are published by the administration and claimed by doctors. A slot is confirmed only after your booking and payment are completed, and you will see the confirmation on your payment success page.",
      "If you cannot attend, cancel or reschedule from your dashboard before the appointment time. Repeated no-shows may limit your ability to book in future.",
    ],
  },
  {
    heading: "5. Payments and refunds",
    body: [
      "Fees are shown on each doctor's profile before you book. Payments are processed through our payment provider and you receive a transaction record for every payment.",
      "Cancellations made in time are refunded to the original payment method. Refunds for cancelled appointments are handled by the administration; the fee is returned if the appointment was not held. If you believe a payment or refund is wrong, contact us at hello@doctorsheba.bd with your transaction ID.",
    ],
  },
  {
    heading: "6. Medical content",
    body: [
      "Health tips published on the platform are general information written by verified doctors. They are not personal medical advice and do not replace a consultation.",
      "The symptom checker suggests doctors based on what you describe; it is not a diagnosis. If you have an emergency — chest pain, difficulty breathing, heavy bleeding, signs of stroke or any life-threatening condition — call 999 or your nearest emergency number immediately.",
    ],
  },
  {
    heading: "7. Acceptable use",
    body: [
      "Do not misuse the platform: no fake accounts, no impersonation of doctors or patients, no attempts to access another person's medical records, no scraping or automated abuse of the service, and no unlawful, abusive or harassing content in reviews or messages.",
      "We may suspend or remove accounts that violate these rules. Reviews must be honest and about your own experience; we may remove reviews that are defamatory or spam.",
    ],
  },
  {
    heading: "8. Disclaimers and liability",
    body: [
      'The platform is provided "as is". We work hard to keep the service available and accurate, but we cannot guarantee uninterrupted availability or that every doctor profile detail is always current.',
      "To the extent permitted by law, DoctorSheba is not liable for the clinical outcome of any consultation, for decisions made on the basis of platform content, or for indirect or consequential losses.",
    ],
  },
  {
    heading: "9. Changes and termination",
    body: [
      "We may update these terms from time to time; the effective date below changes when we do. You may stop using the platform and close your account at any time, and we may discontinue accounts that breach these terms.",
    ],
  },
  {
    heading: "10. Contact and governing law",
    body: [
      "Questions about these terms: hello@doctorsheba.bd or 10666, Plot 22, Road 7, Dhanmondi, Dhaka 1209. These terms are governed by the laws of Bangladesh.",
    ],
  },
];

const Terms = () => {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-muted-foreground">
            The rules for using DoctorSheba — accounts, appointments, payments,
            and what the platform does and does not do.
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

export default Terms;
