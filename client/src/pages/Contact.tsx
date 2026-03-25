import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">Have questions about DocSift? We'd love to hear from you. Our team typically responds within 24 hours.</p>
          </div>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email", detail: "docsift.official@gmail.com", sub: "For general inquiries" },
                { icon: Phone, title: "Phone", detail: "+212 687 30 25 83", sub: "Mon-Fri 9AM-6PM (GMT+1)" },
                { icon: MapPin, title: "Office", detail: "Distributed Globally", sub: "Remote-First Team" },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-sm">{item.detail}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required className="h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" required className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company name" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your needs..." rows={5} required />
                  </div>
                  <Button variant="gradient" className="w-full h-11 gap-2" type="submit">
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;