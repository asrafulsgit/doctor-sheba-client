import { cn } from "@/lib/utils";
import React from "react";

// const BookingStep1 = () => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold">Choose a date</h2>
//       <p className="mt-1 text-sm text-muted-foreground">
//         Pick a day in the next 14 days.
//       </p>
//       <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
//         {Array.from({ length: 14 }).map((_, i) => {
//           const d = new Date();
//           d.setDate(d.getDate() + i);
//           const selected = dayOffset === i;
//           return (
//             <button
//               key={i}
//               type="button"
//               onClick={() => {
//                 setDayOffset(i);
//                 setSlot(null);
//               }}
//               className={cn(
//                 "flex flex-col items-center rounded-lg border px-3 py-3 text-sm transition-colors",
//                 selected
//                   ? "border-primary bg-primary text-primary-foreground"
//                   : "border-border bg-background text-foreground hover:border-primary/40",
//               )}
//             >
//               <span className="text-xs opacity-80">
//                 {d.toLocaleDateString(undefined, {
//                   weekday: "short",
//                 })}
//               </span>
//               <span className="mt-1 text-lg font-semibold">{d.getDate()}</span>
//               <span className="text-xs opacity-80">
//                 {d.toLocaleDateString(undefined, { month: "short" })}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//       <div className="mt-6 flex justify-end">
//         <Button onClick={next}>Continue</Button>
//       </div>
//     </div>
//   );
// };

// export default BookingStep1;
