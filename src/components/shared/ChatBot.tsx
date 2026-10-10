"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { HeartPulse, X, Send, Square, RotateCcw, MessageCirclePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  useAiSuggestedDoctors,
  type AISuggestion,
} from "@/lib/hooks/UseDoctor";

const SUGGESTIONS = [
  "I have a headache and fever for 3 days",
  "Chest feels tight when I climb stairs",
  "Skin rash with itching",
];

// Until the backend accepts a messages array, send the last N user messages.
const MAX_CONTEXT_MESSAGES = 5;

type Doctor = AISuggestion["doctors"][number];

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string; // markdown for assistant messages
  doctors?: Doctor[]; // rendered as links below the text
  specialties?: string[];
};

const newId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* Hoisted so ReactMarkdown gets a stable object across renders. */
const markdownComponents = {
  a: ({ href, children }: React.ComponentPropsWithoutRef<"a">) => (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
};

const MessageBubble = React.memo(function MessageBubble({
  message,
  onNavigate,
}: {
  message: ChatMessage;
  onNavigate: () => void;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] break-words text-sm text-foreground">
        <div className="prose prose-sm max-w-none text-foreground [&_a]:font-medium [&_a]:text-primary [&_hr]:my-3 [&_p]:my-1.5 [&_ul]:my-1.5">
          <ReactMarkdown components={markdownComponents}>
            {message.text}
          </ReactMarkdown>

          {message.doctors && message.doctors.length > 0 ? (
            <>
              <p>
                <strong>Suggested doctors:</strong>
              </p>
              <ul>
                {" "}
                {message.doctors.map((d) => {
                  const specialty =
                    d.designation ||
                    d.doctorSpecialities
                      ?.map((s) => s.specialities.title)
                      .join(", ");
                  const details = [specialty, d.currentWorkingPlace]
                    .filter(Boolean)
                    .join(", ");
                  return (
                    <li key={d.id}>
                      <Link
                        href={`/doctors/${d.id}`}
                        onClick={onNavigate}
                        className="underline"
                      >
                        {d.name}
                      </Link>
                      {details && ` — ${details}.`}
                      {d.appointmentFee != null &&
                        ` Fee: ৳${d.appointmentFee}.`}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : message.specialties && message.specialties.length > 0 ? (
            <p className="text-muted-foreground">
              No {message.specialties.join(", ")} doctors are available right
              now.{" "}
              <Link href="/doctors" onClick={onNavigate} className="underline">
                Browse all doctors
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const ChatBot = () => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const {
    mutate: inputSymptoms,
    isPending: busy,
    reset,
  } = useAiSuggestedDoctors();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  // Re-focus the input after a reply arrives (no-op while the panel is closed).
  React.useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  const closePanel = React.useCallback(() => setOpen(false), []);

  // reset() detaches the pending mutation, so its callbacks never fire.
  const stop = () => reset();

  function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;

    const userMsg: ChatMessage = { id: newId(), role: "user", text: t };

    // Give the AI context so follow-up answers ("I'm 25") make sense.
    const context = [
      ...messages.filter((m) => m.role === "user").map((m) => m.text),
      t,
    ]
      .slice(-MAX_CONTEXT_MESSAGES)
      .join("\n");

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    inputSymptoms(
      { text: context },
      {
        onSuccess: (res) => {
          if (!res.success || !res.data) {
            toast.error(res.message || "Couldn't get a suggestion.");
            return;
          }
          const data: AISuggestion = res.data;
          setMessages((prev) => [
            ...prev,
            {
              id: newId(),
              role: "assistant",
              text: data.response.trim(),
              doctors: data.doctors ?? [],
              specialties: data.specialties ?? [],
            },
          ]);
        },
        onError: (error: any) => {
          // Drop the failed message and give the text back to the user.
          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
          setInput((cur) => cur || t);

          const m = error?.message || "";
          if (m.includes("429"))
            toast.error("Too many requests — please wait a moment.");
          else if (m.includes("402"))
            toast.error("AI credits are used up for now.");
          else
            toast.error(m || "Couldn't reach the assistant. Please try again.");
        },
      },
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          aria-label={open ? "Close symptom checker" : "Open symptom checker"}
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-elevated 
          transition sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
        >
          {open ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <MessageCirclePlus className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={16}
        // Full width minus margins on phones, fixed 360px from `sm` up.
        // Height never exceeds the space actually available on screen.
        className="flex h-[min(480px,var(--radix-popover-content-available-height))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl p-0 shadow-elevated sm:w-[360px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
          endRef.current?.scrollIntoView();
        }}
        // Clicking a sonner toast shouldn't count as "outside" and close the chat.
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement | null;
          if (target?.closest?.("[data-sonner-toaster]")) e.preventDefault();
        }}
      >
        <header className="flex items-center gap-3 border-b border-border bg-primary px-3 py-2.5 text-primary-foreground">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-foreground/15">
            <HeartPulse className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              Sheba Symptom Checker
            </p>
            <p className="truncate text-xs opacity-80">
              Tell me how you feel — I'll suggest a doctor
            </p>
          </div>
          {messages.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                stop();
                setMessages([]);
              }}
              aria-label="New chat"
              className="h-8 w-8 shrink-0 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </header>

        {/* [&>div>div]:!block fixes ScrollArea's inner `display: table`,
            which otherwise lets long text overflow the panel width. */}
        <ScrollArea className="min-h-0 flex-1 [&_[data-radix-scroll-area-viewport]>div]:!block">
          <div role="log" aria-live="polite" className="space-y-3 p-3 sm:p-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Describe your symptoms, how long you've had them, and how bad
                  they are.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant="outline"
                      onClick={() => send(s)}
                      className="h-auto justify-start whitespace-normal rounded-xl px-3 py-2 text-left text-sm font-normal"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Not a diagnosis. In an emergency call 999.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} onNavigate={closePanel} />
            ))}

            {busy && (
              <div
                className="flex gap-1 px-1 py-2"
                aria-label="Assistant is thinking"
              >
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 border-t border-border p-2.5 sm:p-3"
        >
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Describe your symptoms…"
            // text-base on phones stops iOS Safari from zooming on focus
            className="max-h-28 min-h-10 flex-1 resize-none rounded-xl px-3 py-2 text-base sm:text-sm"
          />
          {busy ? (
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={stop}
              aria-label="Stop"
              className="shrink-0"
            >
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              aria-label="Send"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBot;
