"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowRight, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { transformUrl } from "@/lib/url-transformer";

interface UrlFormProps {
  onEmbed: (url: string) => void;
  className?: string;
}

export function UrlForm({ onEmbed, className }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      
      // Validate URL format
      try {
        new URL(url);
      } catch (error) {
        toast.error("Please enter a valid URL");
        setIsLoading(false);
        return;
      }

      // Transform the URL if needed (e.g., for YouTube)
      const transformedUrl = transformUrl(url);
      
      // Call the onEmbed callback with the transformed URL
      onEmbed(transformedUrl);
      
      // Reset the form
      setUrl("");
      toast.success("Content embedded successfully!");
    } catch (error) {
      toast.error("Failed to embed content. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex flex-col space-y-4 w-full max-w-2xl mx-auto p-6 bg-card rounded-xl shadow-lg transition-all", 
        className
      )}
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="url" className="text-lg font-medium">
          Enter URL to embed
        </Label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 pr-4 py-6 text-base"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="px-6 py-6 h-auto"
          >
            <span className="mr-2">Embed</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Paste any URL, including YouTube videos
        </p>
      </div>
    </form>
  );
}