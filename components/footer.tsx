import React from "react";

export function Footer() {
  return (
    <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Embedium. All rights reserved.</p>
    </footer>
  );
}