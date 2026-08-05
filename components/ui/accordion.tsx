"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight, accessible accordion (no external deps).
 * Each item toggles independently; all others collapse.
 */

interface AccordionItemContextValue {
  open: boolean;
  toggle: () => void;
  id: string;
}

const AccordionContext = React.createContext<{
  value: string | null;
  setValue: (v: string | null) => void;
} | null>(null);

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ value, setValue }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

const ItemContext = React.createContext<AccordionItemContextValue | null>(null);

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used inside Accordion");
  const id = React.useId();
  const open = ctx.value === id;
  const toggle = () => ctx.setValue(open ? null : id);
  return (
    <ItemContext.Provider value={{ open, toggle, id }}>
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-lg border bg-card transition-colors",
          open && "border-primary/40 bg-card/90",
          className,
        )}
        {...props}
      />
    </ItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(ItemContext);
  if (!item) throw new Error("AccordionTrigger must be used inside AccordionItem");
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={item.open}
      aria-controls={`${item.id}-panel`}
      onClick={item.toggle}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-accent/50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          item.open && "rotate-180 text-primary",
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(ItemContext);
  if (!item) throw new Error("AccordionContent must be used inside AccordionItem");
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      id={`${item.id}-panel`}
      role="region"
      aria-labelledby={item.id}
      className="grid transition-all duration-200 ease-out"
      style={{
        gridTemplateRows: item.open ? "1fr" : "0fr",
      }}
    >
      <div
        ref={contentRef}
        className="overflow-hidden [&>div]:px-5 [&>div]:pb-5 [&>div]:pt-0"
      >
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
