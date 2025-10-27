import {
  BookOpen,
  Code,
  Users,
  Target,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function AboutStory() {
  const milestones = [
    {
      icon: Rocket,
      year: 'Aug 2024',
      title: 'Foundation',
      description:
        'Aram Tutorials was launched with a clear mission: to make technology accessible through simple, practical tutorials.',
    },
    {
      icon: BookOpen,
      year: 'Late 2024',
      title: 'First Content Wave',
      description:
        'We published our initial set of tutorials, focusing on essential tools for developers and learners.',
    },
    {
      icon: TrendingUp,
      year: 'Early 2025',
      title: 'Building Momentum',
      description:
        'Our community grew rapidly, with our tutorials surpassing 5,000 views from learners worldwide.',
    },
    {
      icon: Target,
      year: 'Aug 2025',
      title: 'Expanding Our Library',
      description:
        'Nearing our one-year anniversary, we now offer a library of over 20 tutorials and continue to expand into new technologies based on community feedback.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Story
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          From a passion for accessible technology education to building a
          growing community of learners, here's our authentic journey over the
          past year.
        </p>
      </div>

      {/* Story Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Story Text */}
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-primary">Aram Tutorials</strong> was
              launched in August 2024 with a simple but powerful mission: to
              make technology accessible through clear, practical tutorials that
              anyone can follow.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As we approach our first anniversary, we've focused on creating
              quality content in the areas where we have genuine expertise -
              from macOS and Windows systems to development tools like VS Code
              and essential utilities like Homebrew.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              What started as a vision to help learners navigate technology has
              grown into a community of over 5,700 views and 21 carefully
              crafted tutorials.
              <strong className="text-primary">
                {' '}
                Our approach is simple: teach what we know well, be honest about
                our journey, and grow with our community.
              </strong>
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We believe in authentic growth over inflated claims. Every
              tutorial we create comes from real experience, and every milestone
              we share reflects our actual progress. This transparency has
              become the foundation of our relationship with learners.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon;

            return (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">
                          {milestone.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Our Mission
        </h3>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          To build trust through authentic content and transparent growth. We
          focus on the technologies we know well, share our real journey
          milestones, and create tutorials that deliver practical value from day
          one of learning.
        </p>
      </div>
    </div>
  );
}
