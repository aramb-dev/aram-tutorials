import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  Compass,
  FileQuestion,
  Folder,
  Home,
  Monitor,
  Search,
  Smartphone,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const popularTutorials = [
    {
      title: 'How to Install Homebrew on macOS',
      href: '/tutorials/homebrew-installation-macos',
      icon: Terminal,
      category: 'Mac',
    },
    {
      title: 'Setting up VS Code for Web Development',
      href: '/tutorials/vscode-web-development-setup',
      icon: Monitor,
      category: 'VS Code',
    },
    {
      title: 'Android Developer Options Guide',
      href: '/tutorials/android-developer-options-guide',
      icon: Smartphone,
      category: 'Android',
    },
    {
      title: 'Google Drive Organization Tips',
      href: '/tutorials/google-drive-organization-tips',
      icon: Folder,
      category: 'Google Tools',
    },
  ];

  const categories = [
    { name: 'Mac', href: '/tutorials?category=mac', count: '5+' },
    { name: 'VS Code', href: '/tutorials?category=vscode', count: '8+' },
    { name: 'Android', href: '/tutorials?category=android', count: '6+' },
    { name: 'Windows', href: '/tutorials?category=windows', count: '4+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <div className="relative mx-auto w-40 h-40 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-background rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <FileQuestion className="w-16 h-16 text-primary" />
                </div>
              </div>
              <h1 className="text-8xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-3xl font-semibold text-foreground mb-6">
                Tutorial Not Found
              </h2>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
              The tutorial you're looking for seems to have gotten lost in the
              code. But don't worry – we have plenty of other great tutorials to
              help you learn!
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="gap-2 text-lg px-8 py-6">
                <Link href="/">
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 py-6"
              >
                <Link href="/tutorials">
                  <BookOpen className="w-5 h-5" />
                  Browse All Tutorials
                </Link>
              </Button>

              <BackButton className="text-lg px-8 py-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Tutorials */}
            <Card className="shadow-lg border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Popular Tutorials
                  </h3>
                </div>

                <div className="space-y-4">
                  {popularTutorials.map((tutorial, index) => {
                    const IconComponent = tutorial.icon;
                    return (
                      <Link
                        key={index}
                        href={tutorial.href}
                        className="group flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                      >
                        <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                          <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {tutorial.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {tutorial.category}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/tutorials">
                      <Search className="w-4 h-4" />
                      View All Tutorials
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Browse by Category */}
            <Card className="shadow-lg border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Compass className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Browse by Category
                  </h3>
                </div>

                <div className="grid gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.href}
                      className="group flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-110 transition-transform"></div>
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {category.count} tutorials
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/about">About Aram Tutorials</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/contact">Get Help & Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help Section */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-muted/20 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Still can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're constantly adding new tutorials and improving our content.
                If you have a specific topic in mind or found a broken link, let
                us know!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">Request a Tutorial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/tutorials">
                    <Search className="w-4 h-4" />
                    Search Tutorials
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
