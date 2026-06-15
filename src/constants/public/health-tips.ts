import { HealthTip } from "@/types/health-tips";

export const healthTips : HealthTip[] = [
  {
    slug: "early-signs-of-diabetes",
    title: "Early signs of diabetes to discuss with a doctor",
    excerpt: "Understand common warning signs and when a professional health assessment matters.",
    category: "Preventive care",
    readTime: "5 min read",
    sections: [
      {
        heading: "Common signs",
        body: "Increased thirst, frequent urination, unexplained weight change, tiredness, and blurred vision can have many causes. A qualified doctor can assess symptoms and recommend appropriate testing.",
      },
      {
        heading: "What you can do",
        body: "Keep a brief record of when symptoms started, any family history, and changes in daily habits. Do not change prescribed medicine without speaking with your doctor.",
      },
      {
        heading: "When to seek urgent care",
        body: "Seek urgent medical help for severe weakness, confusion, breathing difficulty, persistent vomiting, or loss of consciousness.",
      },
    ],
  },
  {
    slug: "maintaining-heart-health",
    title: "Everyday habits that support heart health",
    excerpt: "Practical ways to support cardiovascular wellbeing through informed daily choices.",
    category: "Heart health",
    readTime: "6 min read",
    sections: [
      {
        heading: "Build sustainable habits",
        body: "Regular movement, adequate sleep, and balanced meals can support heart health. Choose gradual changes that fit your health needs and routine.",
      },
      {
        heading: "Know your numbers",
        body: "Blood pressure, blood sugar, and cholesterol checks can help identify risks early. Ask a clinician how often these should be checked for you.",
      },
      {
        heading: "Recognize urgent symptoms",
        body: "Chest pressure, sudden shortness of breath, fainting, or pain spreading to the arm or jaw may require emergency care. Contact emergency services immediately.",
      },
    ],
  },
  {
    slug: "preparing-for-doctor-appointment",
    title: "How to prepare for a doctor appointment",
    excerpt: "A simple checklist to help you use consultation time clearly and confidently.",
    category: "Care guidance",
    readTime: "4 min read",
    sections: [
      {
        heading: "Before your visit",
        body: "Write down your main concern, current symptoms, medicines, allergies, and the questions you want to ask. Bring relevant reports when available.",
      },
      {
        heading: "During the consultation",
        body: "Describe symptoms honestly and ask for clarification when instructions are unclear. Repeat key next steps back to the doctor to confirm your understanding.",
      },
      {
        heading: "After the consultation",
        body: "Keep prescriptions and reports together, follow the agreed instructions, and arrange follow-up care when recommended.",
      },
    ],
  },
] as const;