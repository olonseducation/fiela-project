"use client";

import * as React from "react";
// @ts-ignore: allow importing radix dialog when type declarations are missing
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>
) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentProps<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/70 duration-150",
        className,
      )}
      {...props}
    />
  );
});

// 🔮 SIHIR BARU: Menambahkan antarmuka (interface) untuk menerima sakelar hideClose
interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  hideClose?: boolean;
}

function DialogContent({
  className,
  children,
  hideClose = false, // 🔮 Bawaannya adalah false (tombol tetap muncul)
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border-4 border-amber-900/20 p-6 shadow-2xl duration-150",
          className,
        )}
        {...props}
      >
        {children}

        {/* 🔮 LOGIKA SAKELAR: Tombol ini hanya dirender jika hideClose adalah false */}
        {!hideClose && (
          <DialogPrimitive.Close className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 flex items-center justify-center rounded-full bg-[#faf6f1] p-2 text-amber-900 border-2 border-amber-700/30 shadow-md transition-all duration-200 hover:scale-110 hover:rotate-90 hover:bg-red-500 hover:text-white hover:border-red-700 hover:shadow-xl focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0">
            <XIcon className="h-5 w-5 stroke-[3px]" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
        
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-xl leading-none font-bold text-amber-900", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-amber-800/80 text-sm font-medium", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};