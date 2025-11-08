"use client";

import { useCallback, useEffect, useState } from "react";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/registry/8starlabs-ui/ui/command";
import { useIsMac } from "@/hooks/use-is-mac";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const CommandMenu = () => {
  const router = useRouter();
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: any) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: any) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer inline-flex items-center whitespace-nowrap bg-[#f2f2f2] dark:bg-[#27272a80] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-[#eeeeee] px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex text-[#8f8f8f]">Search...</span>
        <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
          <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
          <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {siteConfig.navLinks.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.label}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href));
                }}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                {navItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}
