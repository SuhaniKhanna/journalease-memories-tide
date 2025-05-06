
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { JournalProvider } from "@/contexts/journal-context";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import JournalEntry from "./pages/JournalEntry";
import PastEntries from "./pages/PastEntries";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./layouts/main-layout";
import { AppSidebar } from "./components/app-sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <JournalProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route element={<MainLayout sidebar={<AppSidebar />} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-entry" element={<JournalEntry />} />
                <Route path="/past-entries" element={<PastEntries />} />
                <Route path="/progress" element={<Progress />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </JournalProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
