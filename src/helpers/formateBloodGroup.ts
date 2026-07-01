export const formatBloodGroup = (bloodGroup?: string | null): string => {
  if (!bloodGroup) return "N/A";

  const bloodGroupMap: Record<string, string> = {
    A_POSITIVE: "A+",
    B_POSITIVE: "B+",
    O_POSITIVE: "O+",
    AB_POSITIVE: "AB+",
    A_NEGATIVE: "A-",
    B_NEGATIVE: "B-",
    O_NEGATIVE: "O-",
    AB_NEGATIVE: "AB-",
  };

  return bloodGroupMap[bloodGroup] ?? bloodGroup;
};