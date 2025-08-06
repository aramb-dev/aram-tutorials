import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BackButton } from '@/components/ui/BackButton';
import { Home, Search, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-2 border-dashed border-muted-foreground/20">
          <CardContent className="p-12">
            {/* 404 Icon */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                <FileQuestion className="w-16 h-16 text-primary mx-auto mt-8" />
              </div>
              <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Oops! The page you're looking for seems to have wandered off.
              Don't worry though – there's plenty of great content waiting for you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/tutorials">
                  <Search className="w-4 h-4" />
                  Browse Tutorials
                </Link>
              </Button>


              <BackButton />
            </div>

            {/* Popular Links */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Popular Tutorials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <Link
                  href="/tutorials/getting-started-with-react-hooks"
                  className="text-primary hover:text-primary/80 transition-colors p-2 rounded hover:bg-muted"
                >
                  Getting Started with React Hooks
                </Link>
                <Link
                  href="/tutorials/building-rest-apis-nodejs-express"
                  className="text-primary hover:text-primary/80 transition-colors p-2 rounded hover:bg-muted"
                >
                  Building REST APIs with Node.js
                </Link>
                <Link
                  href="/tutorials"
                  className="text-primary hover:text-primary/80 transition-colors p-2 rounded hover:bg-muted"
                >
                  All Tutorials
                </Link>
                <Link
                  href="/contact"
                  className="text-primary hover:text-primary/80 transition-colors p-2 rounded hover:bg-muted"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Suggestion */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Can't find what you're looking for? Try{' '}
            <Link href="/tutorials" className="text-primary hover:underline">
              browsing our tutorials
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>{' '}
            for help.
          </p>
        </div>
      </div>
    </div>
  );
}
