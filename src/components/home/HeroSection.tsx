import { ArrowRight, BookOpen, Code, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/SearchInput';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-brand-primary/5 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-primary/20 to-brand-lighter/10 opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Learn, Build, and
            <span className="text-brand-primary"> Master</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Comprehensive tutorials and guides to help you master the tools and
            technologies you use every day. From development environments to
            productivity workflows.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <SearchInput placeholder="Search tutorials..." />
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-brand-primary hover:bg-brand-light"
            >
              <Link href="/tutorials">
                Browse Tutorials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                Comprehensive Guides
              </dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">
                Step-by-step tutorials covering everything from basic setup to
                advanced configurations.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light">
                  <Code className="h-6 w-6 text-white" />
                </div>
                Real-World Examples
              </dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">
                Practical examples and code snippets you can use immediately in
                your projects.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-lighter">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                Expert Tips
              </dt>
              <dd className="mt-2 text-base leading-7 text-muted-foreground">
                Pro tips and best practices from experienced developers and
                system administrators.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
