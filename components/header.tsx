import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link2 } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between w-full p-4">
      <div className="flex items-center gap-2">
        <Link2 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Embedium</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}