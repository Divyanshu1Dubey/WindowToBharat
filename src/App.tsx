import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Explore from "./pages/Explore.tsx";
import Heal from "./pages/Heal.tsx";
import Spiritual from "./pages/Spiritual.tsx";
import Mindfulness from "./pages/Mindfulness.tsx";

// EQ PAGES

import EQIntro from "./pages/EQIntro";
import UserDetails from "./pages/UserDetails";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import About from "./pages/About.tsx";

import Contact from "./pages/Contact.tsx";
import { Preloader } from "@/components/site/Preloader";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Preloader />

      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          {/* EXISTING ROUTES */}

          <Route path="/" element={<Index />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/heal" element={<Heal />} />

          <Route path="/spiritual" element={<Spiritual />} />

          <Route path="/Mindfulness" element={<Mindfulness />} />

          {/* EQ ASSESSMENT ROUTES */}

          <Route path="/EQIntro" element={<EQIntro />} />

          <Route path="/user-details" element={<UserDetails />} />

          <Route path="/assessment" element={<Assessment />} />

          <Route path="/result" element={<Result />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />

          {/* NOT FOUND */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
