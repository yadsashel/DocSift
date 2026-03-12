import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import DocumentVault from "./pages/DocumentVault";
import UploadPage from "./pages/Upload";
import ApiManagement from "./pages/ApiManagement";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DPA from "./pages/DPA";
import SOC2 from "./pages/SOC2";
import Contact from "./pages/Contact";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // الـ Guard ديالنا
import ApiDocs from "./pages/ApiDocs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes: أي واحد يقدر يشوفهم */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/dpa" element={<DPA />} />
          <Route path="/SOC2" element={<SOC2 />} />
          <Route path="/apidocs" element={<ApiDocs />} />

          {/* 🛡️ Protected Routes: ممنوع الدخول بلا Login */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentVault />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/api-keys" element={<ApiManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;