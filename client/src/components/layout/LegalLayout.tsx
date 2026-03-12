import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">{title}</h1>
          <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
        </div>
        <div className="prose prose-slate max-w-none space-y-8 text-foreground/80 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_p]:mb-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-secondary [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2">
          {children}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default LegalLayout;
