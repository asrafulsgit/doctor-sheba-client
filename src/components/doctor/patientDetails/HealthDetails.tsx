import { bloodGroupLabels } from "@/constants/patient/data";
import { getDate } from "@/helpers/getDate";
import { IDoctor } from "@/types/doctors";
import { IHealthProfile } from "@/types/patient";
import { Droplet, HeartPulse } from "lucide-react";

const HealthDetails = ({
  health,
  lastConsutant,
  lastVisit,
}: {
  health: Partial<IHealthProfile>;
  lastConsutant: IDoctor;
  lastVisit: string;
}) => {
  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <HeartPulse className="h-4 w-4" />
          </span>
          <h3 className="text-base font-semibold">Health snapshot</h3>
        </div>
        <div className="mt-4 grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-4">
          {health?.bloodGroup && (
            <KV k="Blood group" v={bloodGroupLabels[health?.bloodGroup]} />
          )}
          <KV k="Height" v={health.height || "—"} />
          <KV k="Weight" v={health.weight || "—"} />
          <KV
            k="Date of birth"
            v={
              health.dateOfBirth
                ? getDate(health.dateOfBirth, "dd MMM yyyy")
                : "—"
            }
          />
          <KV k="Allergies" v={health.hasAllergies ? "Yes" : "None reported"} />
          <KV k="Diabetes" v={health.hasDiabetes ? "Yes" : "No"} />
          <KV k="Smoking" v={health.smokingStatus ? "Yes" : "No"} />
          <KV k="Past surgeries" v={health.hasPastSurgeries ? "Yes" : "No"} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <Droplet className="h-4 w-4" />
          </span>
          <h3 className="text-base font-semibold">Last consultation</h3>
        </div>
        {lastConsutant ? (
          <div className="mt-4 space-y-2 text-sm">
            {/* <p className="font-medium">{lastConsutant.reason}</p> */}
            <p className="text-muted-foreground">
              {getDate(lastVisit, "dd MMM yyyy · hh:mm a")}
            </p>
            <p className="text-muted-foreground">
              With{" "}
              <span className="font-medium text-foreground">
                {lastConsutant.name}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Specialty ·{" "}
              {lastConsutant.doctorSpecialities
                .map((item) => item.specialities.title)
                .join(" · ")}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No completed consultations yet.
          </p>
        )}
      </div>
    </section>
  );
};

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border px-3 py-2">
      <p className="text-xs text-muted-foreground">{k}</p>
      <p className="mt-0.5 font-medium">{v}</p>
    </div>
  );
}

export default HealthDetails;
