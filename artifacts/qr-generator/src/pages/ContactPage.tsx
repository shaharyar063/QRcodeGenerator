import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  useSEO({
    title: "Contact Us | QR Code Generator",
    description: "Get in touch with the team behind the free QR Code Generator app.",
    canonicalPath: "/contact"
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-8 pb-10 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-base text-muted-foreground">
            Have a question, feedback, or a feature request? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We built this tool to be fast, free, and simple. If you run into any issues or have ideas on how we can improve it, please let us know.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-muted-foreground text-sm">hello@qrcodegenerator.app</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <p className="text-muted-foreground text-sm">@qrcodegen on Twitter</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! This is a demo form."); }}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help?" 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
