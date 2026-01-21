"use client";

import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-[calc(100vw-32px)] max-w-[398px] sm:w-full flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:px-5 sm:py-4",
          title: "text-sm font-semibold text-foreground sm:text-base",
          description: "text-xs text-muted-foreground sm:text-sm",
          actionButton:
            "ml-auto shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:text-sm",
          cancelButton:
            "ml-auto shrink-0 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground sm:text-sm",
          success: "border-green-500/30 bg-green-50 dark:bg-green-950/30",
          error: "border-destructive/30 bg-red-50 dark:bg-red-950/30",
          warning: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/30",
          info: "border-blue-500/30 bg-blue-50 dark:bg-blue-950/30",
        },
      }}
      offset="16px"
      mobileOffset="16px"
      {...props}
    />
  );
}

export { Toaster, toast };
