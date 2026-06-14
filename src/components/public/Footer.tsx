import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { Logo } from "../shared/Logo";
import { publicFooterLinks } from "@/constants/public/footer-links";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/">
              <Logo />
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              A trusted digital healthcare platform connecting patients and
              doctors across Bangladesh.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>

            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {publicFooterLinks.platform.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Support</h4>

            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {publicFooterLinks.support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Get in touch
            </h4>

            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              {publicFooterLinks.contact.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  {item.type === "address" && (
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}

                  {item.type === "phone" && (
                    <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}

                  {item.type === "email" && (
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}

                  <a href={item.href} className="hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DoctorSheba. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
