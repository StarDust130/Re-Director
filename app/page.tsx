import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrCode, Zap, BarChart3, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <QrCode className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Re-Director
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create dynamic QR codes that redirect to URLs you can change anytime.
          Perfect for marketing, events, and business cards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/create">Create Your First Link</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 rounded-lg border bg-card">
          <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Dynamic Redirects</h3>
          <p className="text-muted-foreground">
            Change destination URLs anytime without regenerating QR codes.
          </p>
        </div>
        <div className="text-center p-6 rounded-lg border bg-card">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">
            Track scans, device types, and geographic data.
          </p>
        </div>
        <div className="text-center p-6 rounded-lg border bg-card">
          <Smartphone className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
          <p className="text-muted-foreground">
            Optimized for mobile devices with responsive design.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Create your first dynamic link in seconds.
        </p>
        <Button asChild size="lg">
          <Link href="/create">Create Link</Link>
        </Button>
      </section>
    </div>
  );
}
