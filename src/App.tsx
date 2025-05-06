// App.tsx
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JournalEntry from "./pages/JournalEntry";
import PastEntries from "./pages/PastEntries"; 
import ViewEntry from "./components/ViewEntry";
import EditEntry from "./components/EditEntry";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/main-layout";
import AppSidebar from "./components/AppSidebar";
import { JournalProvider } from "./contexts/journal-context";

const AppRoutes = () => {
  return (
    <JournalProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout sidebar={<AppSidebar />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-entry" element={<JournalEntry />} />
          <Route path="/past-entries" element={<PastEntries />} />
          <Route path="/entry/:id" element={<ViewEntry />} />
          <Route path="/edit-entry/:id" element={<EditEntry />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </JournalProvider>
  );
};

export default AppRoutes;