import { PaymentStatus } from "@/types/payment";
import { AppointmentStatus, BloodGroup } from "@/types/user";

export interface PatientRecord {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  gender: "MALE" | "FEMALE";
  age: number;
  bloodGroup: BloodGroup;
  address: string;
  lastVisit: string;
  totalVisits: number;
  status: "ACTIVE" | "BLOCKED";
}

export const PATIENTS: PatientRecord[] = [
  {
    id: "pat-001",
    name: "Arif Hossain",
    email: "arif.hossain@gmail.com",
    contactNumber: "+8801911223344",
    gender: "MALE",
    age: 34,
    bloodGroup: "B_POSITIVE",
    address: "Dhanmondi, Dhaka",
    lastVisit: "2026-06-12",
    totalVisits: 7,
    status: "ACTIVE",
  },
  {
    id: "pat-002",
    name: "Sumaiya Akter",
    email: "sumaiya.akter@gmail.com",
    contactNumber: "+8801911223345",
    gender: "FEMALE",
    age: 28,
    bloodGroup: "O_POSITIVE",
    address: "Mirpur, Dhaka",
    lastVisit: "2026-06-10",
    totalVisits: 4,
    status: "ACTIVE",
  },
  {
    id: "pat-003",
    name: "Rakib Khan",
    email: "rakib.khan@gmail.com",
    contactNumber: "+8801911223346",
    gender: "MALE",
    age: 41,
    bloodGroup: "A_POSITIVE",
    address: "Uttara, Dhaka",
    lastVisit: "2026-06-15",
    totalVisits: 12,
    status: "ACTIVE",
  },
  {
    id: "pat-004",
    name: "Tanisha Rahman",
    email: "tanisha.r@gmail.com",
    contactNumber: "+8801911223347",
    gender: "FEMALE",
    age: 22,
    bloodGroup: "AB_POSITIVE",
    address: "Banani, Dhaka",
    lastVisit: "2026-06-14",
    totalVisits: 2,
    status: "ACTIVE",
  },
  {
    id: "pat-005",
    name: "Mehedi Hasan",
    email: "mehedi.h@gmail.com",
    contactNumber: "+8801911223348",
    gender: "MALE",
    age: 52,
    bloodGroup: "O_NEGATIVE",
    address: "Gulshan, Dhaka",
    lastVisit: "2026-06-09",
    totalVisits: 18,
    status: "ACTIVE",
  },
  {
    id: "pat-006",
    name: "Nadia Sultana",
    email: "nadia.s@gmail.com",
    contactNumber: "+8801911223349",
    gender: "FEMALE",
    age: 31,
    bloodGroup: "B_NEGATIVE",
    address: "Bashundhara, Dhaka",
    lastVisit: "2026-06-11",
    totalVisits: 5,
    status: "ACTIVE",
  },
  {
    id: "pat-007",
    name: "Sajid Karim",
    email: "sajid.k@gmail.com",
    contactNumber: "+8801911223350",
    gender: "MALE",
    age: 45,
    bloodGroup: "A_NEGATIVE",
    address: "Mohammadpur, Dhaka",
    lastVisit: "2026-06-08",
    totalVisits: 9,
    status: "ACTIVE",
  },
  {
    id: "pat-008",
    name: "Farhana Yasmin",
    email: "farhana.y@gmail.com",
    contactNumber: "+8801911223351",
    gender: "FEMALE",
    age: 38,
    bloodGroup: "O_POSITIVE",
    address: "Tejgaon, Dhaka",
    lastVisit: "2026-05-29",
    totalVisits: 3,
    status: "BLOCKED",
  },
  {
    id: "pat-009",
    name: "Tareq Aziz",
    email: "tareq.a@gmail.com",
    contactNumber: "+8801911223352",
    gender: "MALE",
    age: 60,
    bloodGroup: "B_POSITIVE",
    address: "Wari, Dhaka",
    lastVisit: "2026-06-13",
    totalVisits: 22,
    status: "ACTIVE",
  },
  {
    id: "pat-010",
    name: "Ishrat Jahan",
    email: "ishrat.j@gmail.com",
    contactNumber: "+8801911223353",
    gender: "FEMALE",
    age: 27,
    bloodGroup: "AB_NEGATIVE",
    address: "Lalmatia, Dhaka",
    lastVisit: "2026-06-07",
    totalVisits: 6,
    status: "ACTIVE",
  },
];

export interface AppointmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string; // ISO
  startTime: string; // "10:00"
  endTime: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  fee: number;
  mode: "VIDEO" | "IN_PERSON";
  reason: string;
}

const today = new Date();
const iso = (offsetDays: number, h = 10) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};

export const APPOINTMENTS: AppointmentRecord[] = [
  {
    id: "apt-001",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    specialty: "Cardiology",
    date: iso(0, 10),
    startTime: "10:00",
    endTime: "10:30",
    status: "SCHEDULED",
    paymentStatus: "PAID",
    fee: 1200,
    mode: "VIDEO",
    reason: "Chest pain follow-up",
  },
  {
    id: "apt-002",
    patientId: "pat-002",
    patientName: "Sumaiya Akter",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    specialty: "Cardiology",
    date: iso(0, 11),
    startTime: "11:00",
    endTime: "11:30",
    status: "INPROGRESS",
    paymentStatus: "PAID",
    fee: 1200,
    mode: "VIDEO",
    reason: "BP review",
  },
  {
    id: "apt-003",
    patientId: "pat-003",
    patientName: "Rakib Khan",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    specialty: "Cardiology",
    date: iso(0, 14),
    startTime: "14:00",
    endTime: "14:30",
    status: "SCHEDULED",
    paymentStatus: "UNPAID",
    fee: 1200,
    mode: "IN_PERSON",
    reason: "Annual checkup",
  },
  {
    id: "apt-004",
    patientId: "pat-004",
    patientName: "Tanisha Rahman",
    doctorId: "doc-002",
    doctorName: "Dr. Nusrat Jahan",
    specialty: "Dermatology",
    date: iso(1, 9),
    startTime: "09:00",
    endTime: "09:30",
    status: "SCHEDULED",
    paymentStatus: "PAID",
    fee: 900,
    mode: "VIDEO",
    reason: "Acne consultation",
  },
  {
    id: "apt-005",
    patientId: "pat-005",
    patientName: "Mehedi Hasan",
    doctorId: "doc-003",
    doctorName: "Dr. Imran Hossain",
    specialty: "Orthopedics",
    date: iso(1, 12),
    startTime: "12:00",
    endTime: "12:30",
    status: "SCHEDULED",
    paymentStatus: "PAID",
    fee: 1500,
    mode: "IN_PERSON",
    reason: "Knee pain",
  },
  {
    id: "apt-006",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    doctorId: "doc-005",
    doctorName: "Dr. Saiful Islam",
    specialty: "Neurology",
    date: iso(-2, 15),
    startTime: "15:00",
    endTime: "15:30",
    status: "COMPLETED",
    paymentStatus: "PAID",
    fee: 1100,
    mode: "VIDEO",
    reason: "Migraine",
  },
  {
    id: "apt-007",
    patientId: "pat-006",
    patientName: "Nadia Sultana",
    doctorId: "doc-006",
    doctorName: "Dr. Anika Tabassum",
    specialty: "Gynecology",
    date: iso(-3, 10),
    startTime: "10:00",
    endTime: "10:30",
    status: "COMPLETED",
    paymentStatus: "PAID",
    fee: 950,
    mode: "IN_PERSON",
    reason: "Routine checkup",
  },
  {
    id: "apt-008",
    patientId: "pat-007",
    patientName: "Sajid Karim",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    specialty: "Cardiology",
    date: iso(-5, 11),
    startTime: "11:00",
    endTime: "11:30",
    status: "COMPLETED",
    paymentStatus: "PAID",
    fee: 1200,
    mode: "VIDEO",
    reason: "Hypertension",
  },
  {
    id: "apt-009",
    patientId: "pat-008",
    patientName: "Farhana Yasmin",
    doctorId: "doc-004",
    doctorName: "Dr. Farzana Akter",
    specialty: "Pediatrics",
    date: iso(-1, 16),
    startTime: "16:00",
    endTime: "16:30",
    status: "CANCELED",
    paymentStatus: "UNPAID",
    fee: 700,
    mode: "VIDEO",
    reason: "Child vaccination query",
  },
  {
    id: "apt-010",
    patientId: "pat-009",
    patientName: "Tareq Aziz",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    specialty: "Cardiology",
    date: iso(2, 10),
    startTime: "10:00",
    endTime: "10:30",
    status: "SCHEDULED",
    paymentStatus: "PAID",
    fee: 1200,
    mode: "IN_PERSON",
    reason: "ECG review",
  },
  {
    id: "apt-011",
    patientId: "pat-010",
    patientName: "Ishrat Jahan",
    doctorId: "doc-002",
    doctorName: "Dr. Nusrat Jahan",
    specialty: "Dermatology",
    date: iso(3, 11),
    startTime: "11:00",
    endTime: "11:30",
    status: "SCHEDULED",
    paymentStatus: "PAID",
    fee: 900,
    mode: "VIDEO",
    reason: "Eczema",
  },
  {
    id: "apt-012",
    patientId: "pat-002",
    patientName: "Sumaiya Akter",
    doctorId: "doc-007",
    doctorName: "Dr. Mahmudul Hasan",
    specialty: "Psychiatry",
    date: iso(-7, 14),
    startTime: "14:00",
    endTime: "14:30",
    status: "COMPLETED",
    paymentStatus: "PAID",
    fee: 1800,
    mode: "VIDEO",
    reason: "Anxiety follow-up",
  },
];

export interface PrescriptionRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  instructions: string;
  followUpDate?: string;
}

export const PRESCRIPTIONS: PrescriptionRecord[] = [
  {
    id: "rx-001",
    appointmentId: "apt-006",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    doctorId: "doc-005",
    doctorName: "Dr. Saiful Islam",
    date: iso(-2, 15),
    diagnosis: "Tension-type migraine",
    medications: [
      {
        name: "Naproxen 500mg",
        dosage: "1 tab",
        frequency: "Twice daily",
        duration: "7 days",
      },
      {
        name: "Rizatriptan 10mg",
        dosage: "1 tab",
        frequency: "As needed",
        duration: "14 days",
      },
    ],
    instructions:
      "Avoid screen exposure >2h. Hydrate well. Return if pain persists beyond 5 days.",
    followUpDate: iso(12, 15),
  },
  {
    id: "rx-002",
    appointmentId: "apt-007",
    patientId: "pat-006",
    patientName: "Nadia Sultana",
    doctorId: "doc-006",
    doctorName: "Dr. Anika Tabassum",
    date: iso(-3, 10),
    diagnosis: "Routine antenatal check — normal",
    medications: [
      {
        name: "Folic acid 5mg",
        dosage: "1 tab",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        name: "Iron + B-complex",
        dosage: "1 tab",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    instructions:
      "Continue routine antenatal vitamins. Light walking 20 min/day.",
    followUpDate: iso(25, 10),
  },
  {
    id: "rx-003",
    appointmentId: "apt-008",
    patientId: "pat-007",
    patientName: "Sajid Karim",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    date: iso(-5, 11),
    diagnosis: "Stage 1 hypertension",
    medications: [
      {
        name: "Amlodipine 5mg",
        dosage: "1 tab",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        name: "Atorvastatin 10mg",
        dosage: "1 tab",
        frequency: "Night",
        duration: "30 days",
      },
    ],
    instructions: "Low-salt diet, 30 min walk/day, BP log twice daily.",
    followUpDate: iso(25, 11),
  },
  {
    id: "rx-004",
    appointmentId: "apt-012",
    patientId: "pat-002",
    patientName: "Sumaiya Akter",
    doctorId: "doc-007",
    doctorName: "Dr. Mahmudul Hasan",
    date: iso(-7, 14),
    diagnosis: "Generalised anxiety disorder — improving",
    medications: [
      {
        name: "Escitalopram 10mg",
        dosage: "1 tab",
        frequency: "Morning",
        duration: "30 days",
      },
    ],
    instructions: "Continue mindfulness practice. Sleep hygiene.",
    followUpDate: iso(23, 14),
  },
];

export interface PaymentRecord {
  id: string;
  appointmentId: string;
  patientName: string;
  doctorName: string;
  amount: number;
  status: PaymentStatus;
  method: "bKash" | "Nagad" | "Card" | "Bank";
  transactionId: string;
  date: string;
}

export const PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-001",
    appointmentId: "apt-001",
    patientName: "Arif Hossain",
    doctorName: "Dr. Tahmid Rahman",
    amount: 1200,
    status: "PAID",
    method: "bKash",
    transactionId: "BKS-9281112",
    date: iso(0, 9),
  },
  {
    id: "pay-002",
    appointmentId: "apt-002",
    patientName: "Sumaiya Akter",
    doctorName: "Dr. Tahmid Rahman",
    amount: 1200,
    status: "PAID",
    method: "Card",
    transactionId: "CRD-1029834",
    date: iso(0, 10),
  },
  {
    id: "pay-003",
    appointmentId: "apt-003",
    patientName: "Rakib Khan",
    doctorName: "Dr. Tahmid Rahman",
    amount: 1200,
    status: "UNPAID",
    method: "bKash",
    transactionId: "—",
    date: iso(0, 12),
  },
  {
    id: "pay-004",
    appointmentId: "apt-004",
    patientName: "Tanisha Rahman",
    doctorName: "Dr. Nusrat Jahan",
    amount: 900,
    status: "PAID",
    method: "Nagad",
    transactionId: "NGD-5512091",
    date: iso(1, 8),
  },
  {
    id: "pay-005",
    appointmentId: "apt-005",
    patientName: "Mehedi Hasan",
    doctorName: "Dr. Imran Hossain",
    amount: 1500,
    status: "PAID",
    method: "bKash",
    transactionId: "BKS-9281555",
    date: iso(1, 11),
  },
  {
    id: "pay-006",
    appointmentId: "apt-006",
    patientName: "Arif Hossain",
    doctorName: "Dr. Saiful Islam",
    amount: 1100,
    status: "PAID",
    method: "Card",
    transactionId: "CRD-1029999",
    date: iso(-2, 14),
  },
  {
    id: "pay-007",
    appointmentId: "apt-007",
    patientName: "Nadia Sultana",
    doctorName: "Dr. Anika Tabassum",
    amount: 950,
    status: "PAID",
    method: "bKash",
    transactionId: "BKS-9280001",
    date: iso(-3, 9),
  },
  {
    id: "pay-008",
    appointmentId: "apt-008",
    patientName: "Sajid Karim",
    doctorName: "Dr. Tahmid Rahman",
    amount: 1200,
    status: "PAID",
    method: "Bank",
    transactionId: "BNK-7741123",
    date: iso(-5, 10),
  },
  {
    id: "pay-009",
    appointmentId: "apt-009",
    patientName: "Farhana Yasmin",
    doctorName: "Dr. Farzana Akter",
    amount: 700,
    status: "UNPAID",
    method: "bKash",
    transactionId: "—",
    date: iso(-1, 15),
  },
  {
    id: "pay-010",
    appointmentId: "apt-012",
    patientName: "Sumaiya Akter",
    doctorName: "Dr. Mahmudul Hasan",
    amount: 1800,
    status: "PAID",
    method: "Card",
    transactionId: "CRD-1030101",
    date: iso(-7, 13),
  },
];

export interface ReviewRecord {
  id: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  rating: number;
  comment: string;
  date: string;
}

export const REVIEWS: ReviewRecord[] = [
  {
    id: "rev-001",
    patientName: "Arif Hossain",
    doctorId: "doc-005",
    doctorName: "Dr. Saiful Islam",
    rating: 5,
    comment: "Excellent consultation. Took time to explain everything.",
    date: iso(-2, 16),
  },
  {
    id: "rev-002",
    patientName: "Nadia Sultana",
    doctorId: "doc-006",
    doctorName: "Dr. Anika Tabassum",
    rating: 5,
    comment: "Very patient and reassuring. Highly recommended.",
    date: iso(-3, 11),
  },
  {
    id: "rev-003",
    patientName: "Sajid Karim",
    doctorId: "doc-001",
    doctorName: "Dr. Tahmid Rahman",
    rating: 4,
    comment: "Professional service. A bit rushed at the end.",
    date: iso(-5, 12),
  },
  {
    id: "rev-004",
    patientName: "Sumaiya Akter",
    doctorId: "doc-007",
    doctorName: "Dr. Mahmudul Hasan",
    rating: 5,
    comment: "Life-changing support. Thank you doctor.",
    date: iso(-7, 15),
  },
  {
    id: "rev-005",
    patientName: "Mehedi Hasan",
    doctorId: "doc-003",
    doctorName: "Dr. Imran Hossain",
    rating: 4,
    comment: "Clear diagnosis, helpful exercise plan.",
    date: iso(-10, 13),
  },
  {
    id: "rev-006",
    patientName: "Ishrat Jahan",
    doctorId: "doc-002",
    doctorName: "Dr. Nusrat Jahan",
    rating: 5,
    comment: "Skin cleared up within weeks. Very happy.",
    date: iso(-12, 9),
  },
];

export interface MedicalReportRecord {
  id: string;
  patientId: string;
  patientName: string;
  reportName: string;
  type: "Lab" | "Imaging" | "Prescription" | "Discharge";
  size: string;
  date: string;
}

export const MEDICAL_REPORTS: MedicalReportRecord[] = [
  {
    id: "rep-001",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    reportName: "Complete Blood Count (CBC)",
    type: "Lab",
    size: "412 KB",
    date: iso(-2, 8),
  },
  {
    id: "rep-002",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    reportName: "Brain MRI",
    type: "Imaging",
    size: "8.2 MB",
    date: iso(-4, 10),
  },
  {
    id: "rep-003",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    reportName: "Lipid Profile",
    type: "Lab",
    size: "298 KB",
    date: iso(-15, 9),
  },
  {
    id: "rep-004",
    patientId: "pat-001",
    patientName: "Arif Hossain",
    reportName: "ECG Report",
    type: "Imaging",
    size: "1.1 MB",
    date: iso(-20, 11),
  },
];

export interface AdminRecord {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  contactNumber: string;
  lastLogin: string;
  status: "ACTIVE" | "BLOCKED";
}

export const ADMINS: AdminRecord[] = [
  {
    id: "adm-001",
    name: "Kamrul Islam",
    email: "kamrul@doctorsheba.bd",
    role: "SUPER_ADMIN",
    contactNumber: "+8801711999001",
    lastLogin: iso(0, 9),
    status: "ACTIVE",
  },
  {
    id: "adm-002",
    name: "Sharmin Akter",
    email: "sharmin@doctorsheba.bd",
    role: "ADMIN",
    contactNumber: "+8801711999002",
    lastLogin: iso(0, 8),
    status: "ACTIVE",
  },
  {
    id: "adm-003",
    name: "Tanvir Ahmed",
    email: "tanvir@doctorsheba.bd",
    role: "ADMIN",
    contactNumber: "+8801711999003",
    lastLogin: iso(-1, 14),
    status: "ACTIVE",
  },
  {
    id: "adm-004",
    name: "Mahbuba Khatun",
    email: "mahbuba@doctorsheba.bd",
    role: "ADMIN",
    contactNumber: "+8801711999004",
    lastLogin: iso(-3, 10),
    status: "BLOCKED",
  },
];

// Trend arrays for charts
export const APPOINTMENTS_TREND_7D = [
  { day: "Mon", count: 42 },
  { day: "Tue", count: 58 },
  { day: "Wed", count: 51 },
  { day: "Thu", count: 67 },
  { day: "Fri", count: 73 },
  { day: "Sat", count: 49 },
  { day: "Sun", count: 31 },
];

export const REVENUE_TREND_6M = [
  { month: "Jan", value: 285000 },
  { month: "Feb", value: 312000 },
  { month: "Mar", value: 298000 },
  { month: "Apr", value: 356000 },
  { month: "May", value: 421000 },
  { month: "Jun", value: 487000 },
];

export const DOCTOR_EARNINGS_6M = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 51000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 62000 },
  { month: "May", value: 71000 },
  { month: "Jun", value: 84000 },
];

export const PATIENT_VISITS_6M = [
  { month: "Jan", value: 1 },
  { month: "Feb", value: 2 },
  { month: "Mar", value: 1 },
  { month: "Apr", value: 0 },
  { month: "May", value: 2 },
  { month: "Jun", value: 3 },
];

export const TOP_SPECIALTIES = [
  { name: "Cardiology", appointments: 187, share: 22 },
  { name: "Dermatology", appointments: 142, share: 17 },
  { name: "Orthopedics", appointments: 121, share: 14 },
  { name: "Pediatrics", appointments: 98, share: 12 },
  { name: "Gynecology", appointments: 84, share: 10 },
  { name: "Neurology", appointments: 71, share: 8 },
];

export const ACTIVITY_FEED = [
  {
    id: "act-1",
    icon: "user-plus",
    text: "New patient registration: Ishrat Jahan",
    time: "5 min ago",
    tone: "info" as const,
  },
  {
    id: "act-2",
    icon: "calendar",
    text: "Appointment booked with Dr. Tahmid Rahman",
    time: "12 min ago",
    tone: "success" as const,
  },
  {
    id: "act-3",
    icon: "wallet",
    text: "Payment of ৳1,200 received via bKash",
    time: "18 min ago",
    tone: "success" as const,
  },
  {
    id: "act-4",
    icon: "star",
    text: "New 5★ review for Dr. Nusrat Jahan",
    time: "32 min ago",
    tone: "success" as const,
  },
  {
    id: "act-5",
    icon: "alert",
    text: "Refund initiated for cancelled appointment #apt-009",
    time: "1 h ago",
    tone: "warning" as const,
  },
  {
    id: "act-6",
    icon: "stethoscope",
    text: "Dr. Saiful Islam updated weekly schedule",
    time: "2 h ago",
    tone: "info" as const,
  },
];

export const PATIENT_HEALTH_DEMO = {
  bloodGroup: "B+",
  height: "172 cm",
  weight: "74 kg",
  bmi: 25.0,
  allergies: "Penicillin, Dust",
  chronic: "Mild hypertension",
  lastCheckup: iso(-15, 10),
};

export const GENDER_OPTIONS = ["MALE", "FEMALE"] as const;
 
export const BLOOD_GROUP_OPTIONS = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
] as const;
 
export const MARITAL_STATUS_OPTIONS = [
  "UNMARRIED",
  "MARRIED"
] as const;

export const bloodGroupLabels: Record<(typeof BLOOD_GROUP_OPTIONS)[number], string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
};
