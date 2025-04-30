"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, ExternalLink } from "lucide-react";

interface HistoryListProps {
  history: string[];
  onSelect: (url: string) => void;
  className?: string;
}

export function HistoryList({ history, onSelect, className }: HistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <p className="text-sm font-medium">Recently embedded</p>
      </div>
      <ScrollArea className="h-full max-h-[200px] pr-4">
        <div className="space-y-2">
          {history.map((url, index) => (
            <Button
              key={`${url}-${index}`}
              variant="ghost"
              className="w-full justify-start truncate text-sm py-2 h-auto"
              onClick={() => onSelect(url)}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">{url}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}