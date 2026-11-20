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

export const MARITAL_STATUS_OPTIONS = ["UNMARRIED", "MARRIED"] as const;

export const bloodGroupLabels: Record<
  (typeof BLOOD_GROUP_OPTIONS)[number],
  string
> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
};
