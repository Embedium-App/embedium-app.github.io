"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmbedDisplayProps {
  url: string;
  onClose: () => void;
  className?: string;
}

export function EmbedDisplay({ url, onClose, className }: EmbedDisplayProps) {
  const embedRef = useRef<HTMLEmbedElement>(null);

  useEffect(() => {
    if (embedRef.current) {
      embedRef.current.focus();
    }
  }, [url]);

  return (
    <div className={cn("w-full h-screen", className)}>
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background/95"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close embed</span>
      </Button>
      
      <embed 
        ref={embedRef}
        src={url}
        type="text/html"
        className="w-full h-full border-none animate-in fade-in duration-500"
        tabIndex={0}
      />
    </div>
  );
}