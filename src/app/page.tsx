import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-tape/30 bg-paper/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-ink">
            FlexSession
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse" className="text-sm hover:text-accent transition-colors">
              Browse Engineers
            </Link>
            <Link href="/how-it-works" className="text-sm hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink mb-6 leading-tight">
              Move your music forward — one professional session at a time.
            </h1>
            <p className="text-xl md:text-2xl text-ink/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book trusted mix engineers, producers, and mastering specialists in flexible 1–4 hour sessions — 
              the real studio help you need, exactly when you need it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Browse Engineers
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border-2 border-tape shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-tape/30 to-accent/20 flex items-center justify-center">
                <div className="text-center text-ink/40">
                  <div className="text-sm font-medium mb-2">Hero Image</div>
                  <div className="text-xs">Warm analog studio desk, console + notebook + dim lamp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-tape/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center mb-16">
              Professional Sessions, Your Schedule
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Flexible Sessions</h3>
                <p className="text-ink/70">Book 1–4 hour sessions that fit your workflow and budget</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Vetted Professionals</h3>
                <p className="text-ink/70">Work with carefully selected engineers and producers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">Instant or Scheduled</h3>
                <p className="text-ink/70">Book instantly or request a specific time slot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Ready to elevate your sound?
            </h2>
            <p className="text-xl text-ink/70 mb-8">
              Browse our roster of trusted professionals and book your first session today.
            </p>
            <Link href="/browse">
              <Button size="lg" className="text-base px-10">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tape/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-serif font-bold text-ink">
              FlexSession
            </div>
            <div className="flex gap-6 text-sm text-ink/60">
              <Link href="/about" className="hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
