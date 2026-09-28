import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer user-select-none",
    {
        variants: {
            variant: {
                default: "btn-primary",
                primary: "btn-primary",
                secondary: "btn-secondary",
                outline: "border-[1.5px] border-[var(--coral)] text-[var(--coral-dark)] bg-transparent hover:bg-[rgba(216,110,77,0.08)]",
                dark: "bg-[var(--ink)] text-white hover:bg-black rounded-full shadow-md",
                accent: "btn-pill-accent",
                destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
                ghost: "hover:bg-[var(--paper-deep)] text-[var(--ink)]",
                link: "text-[var(--coral-dark)] underline-offset-4 hover:underline p-0 h-auto min-h-0",
            },
            size: {
                default: "min-h-[48px] px-6 py-3",
                sm: "min-h-[38px] px-4 py-2 text-xs rounded-[10px]",
                lg: "min-h-[54px] px-8 py-3.5 text-base rounded-[16px]",
                icon: "size-10 rounded-[12px]",
                "icon-sm": "size-8 rounded-[8px]",
                "icon-lg": "size-12 rounded-[14px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
