import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-white/5 backdrop-blur-md border-white/5 placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-2xl border px-6 py-4 text-base shadow-inner transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[4px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
