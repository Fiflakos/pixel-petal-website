
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Index from "./pages/Index";
import Sesje from "./pages/Sesje";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import SessionForm from "./pages/SessionForm";

// Tworzenie klienta zapytań z odpowiednią konfiguracją
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 60000
    }
  }
});

const App = () => {
  console.log("App is rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sesje" element={<Sesje />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={
                <PrivateRoute requireAdmin={true}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="/admin/new-session" element={
                <PrivateRoute requireAdmin={true}>
                  <SessionForm />
                </PrivateRoute>
              } />
              <Route path="/admin/edit-session/:id" element={
                <PrivateRoute requireAdmin={true}>
                  <SessionForm />
                </PrivateRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
