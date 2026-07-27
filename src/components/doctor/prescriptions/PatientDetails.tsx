import { getDate } from '@/helpers/getDate'
import { IAppointment } from '@/types/appointment'
import { CalendarClock, Mail, Phone } from 'lucide-react'
import Image from 'next/image' 

const PatientDetails = ({appointment} : {appointment : IAppointment}) => {
  return (
     <div className="flex items-center gap-3 rounded-lg border border-border 
     bg-surface  p-2">
        <div className="flex h-12 sm:h-15 w-12 sm:w-15 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {appointment?.patient.profilePhoto ? (
            <Image
              src={appointment.patient.profilePhoto ?? ""}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              width={60}
              height={60}
            />
          ) : (
            <span>{appointment?.patient.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-foreground truncate">
            {appointment?.patient.name}
          </p>
          <div
            className="flex flex-wrap items-center gap-x-1 sm:gap-x-3 gap-y-0.5 
        text-sm text-muted-foreground"
          >
            {appointment?.patient.contactNumber && <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {appointment?.patient.contactNumber}
            </span>}
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {appointment?.patient.email}
            </span>
          </div>
          {appointment && (
            <p className="text-xs text-primary mt-0.5 inline-flex items-center gap-1">
              <CalendarClock className="h-3 w-3" />
              Linked visit ·{" "}
              {getDate(
                appointment.schedule.startDateTime,
                "dd MMM yyyy · hh:mm a",
              )}{" "}
              · {appointment.status}
            </p>
          )}
        </div>
      </div>
  )
}

export default PatientDetails
