"use client";

import React, { useState, useEffect } from "react";
import { UrlForm } from "@/components/url-form";
import { EmbedDisplay } from "@/components/embed-display";
import { HistoryList } from "@/components/history-list";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isEmbedActive, setIsEmbedActive] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("embedium-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing history from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("embedium-history", JSON.stringify(history));
  }, [history]);

  const handleEmbed = (url: string) => {
    setCurrentUrl(url);
    setIsEmbedActive(true);
    
    if (!history.includes(url)) {
      setHistory(prev => [url, ...prev].slice(0, 10));
    }
  };

  const handleCloseEmbed = () => {
    setIsEmbedActive(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <AnimatePresence>
        {isEmbedActive && currentUrl ? (
          <motion.div
            key="embed-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            <div className="w-full bg-background border-b">
              <div className="max-w-2xl mx-auto w-full p-4">
                <UrlForm 
                  onEmbed={handleEmbed} 
                  className="bg-background"
                />
              </div>
            </div>
            <div className="flex-grow">
              <EmbedDisplay url={currentUrl} onClose={handleCloseEmbed} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col items-center justify-center p-6"
          >
            <div className="text-center mb-12 max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Embed Any Web Content
              </h1>
              <p className="text-xl text-muted-foreground">
                Enter a URL to create an embedded view of any website or YouTube video
              </p>
            </div>
            
            <UrlForm onEmbed={handleEmbed} />
            
            <div className={cn(
              "w-full max-w-2xl mt-8 px-6 transition-all",
              history.length === 0 ? "opacity-0" : "opacity-100"
            )}>
              <HistoryList 
                history={history} 
                onSelect={handleEmbed} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </main>
  );
}