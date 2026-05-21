import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Pricing from "./pages/Pricing";
import CreateAccount from "./pages/CreateAccount";
import VerifyEmail from "./pages/VerifyEmail";
import Onboarding from "./pages/Onboarding";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";
import PromptLibrary from "./pages/PromptLibrary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pricing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/book-demo" element={<NotFound />} />
          <Route path="/prompt-bibliotheek" element={<PromptLibrary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
