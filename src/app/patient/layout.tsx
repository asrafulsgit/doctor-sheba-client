import PrivateLayout from "@/components/layout/PrivateLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <PrivateLayout>{children}</PrivateLayout>;
};

export default layout;
