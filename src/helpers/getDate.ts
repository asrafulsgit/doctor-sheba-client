import { format } from "date-fns";

export const getDate = (date: Date | string | undefined, formater: string) => {
  if (date) {
    return format(date, formater);
  }
  return format(new Date(), formater);
};
