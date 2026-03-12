import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, Upload, Key, Settings, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Documents", path: "/documents", icon: FileText },
  { label: "Upload", path: "/upload", icon: Upload },
  { label: "API Keys", path: "/api-keys", icon: Key },
  { label: "Settings", path: "/settings", icon: Settings },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Link to="/" onClick={onLinkClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Log out</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      <aside className={`${collapsed ? "w-[68px]" : "w-64"} bg-sidebar border-r border-sidebar-border hidden md:flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className={`h-16 flex items-center ${collapsed ? "justify-center px-2" : "justify-between px-4"} border-b border-sidebar-border`}>
          {!collapsed && <img src={logo} alt="DocSift" className="h-8 brightness-0 invert" />}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b h-14 flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(true)} className="p-1">
          <Menu className="h-5 w-5" />
        </button>
        <img src={logo} alt="DocSift" className="h-7" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-sidebar flex flex-col animate-slide-in-left">
            <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
              <img src={logo} alt="DocSift" className="h-7 brightness-0 invert" />
              <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground/50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onLinkClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
