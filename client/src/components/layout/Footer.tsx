import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src={logo} alt="DocSift" className="h-9 mb-4 brightness-0 invert" />
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            AI-powered contract analysis and vendor compliance auditing for enterprise teams.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Product</h4>
          <ul className="space-y-3">
            <li><Link to="/#features" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Features</Link></li>
            <li><Link to="/#pricing" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/dashboard" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Dashboard</Link></li>
            <li><Link to="/apidocs" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">API Docs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Legal</h4>
          <ul className="space-y-3">
            <li><Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            <li><Link to="/dpa" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">DPA</Link></li>
            <li><Link to="/soc2" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">SOC 2 Report</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Company</h4>
          <ul className="space-y-3">
            <li><Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary-foreground/50">© 2025 DocSift. All rights reserved.</p>
        <p className="text-sm text-primary-foreground/50">Enterprise-grade contract intelligence.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
