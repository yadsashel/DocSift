import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌍 Imports ديال الصفحات العامة
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import DPA from "./pages/DPA";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";

// 🛡️ Imports ديال الصفحات المحمية (Dashboard)
import Dashboard from "./pages/Dashboard";
import DocumentVault from "./pages/DocumentVault";
import UploadPage from "./pages/Upload";
import ApiManagement from "./pages/ApiManagement";
import Settings from "./pages/Settings";

// 🏗️ Layouts و Guards
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/*1. الصفحات اللي يقدر يشوفهم أي واحد */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dpa" element={<DPA />} />
          <Route path="/apidocs" element={<ApiDocs />} />

          {/*2. الصفحات المحمية (ممنوع الدخول بلا Login) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentVault />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/api-keys" element={<ApiManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* 🔔 الإشعارات (Toasts) */}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;