import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Award,
  BookOpen,
  Eye,
  Globe,
  Heart,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

export function AboutExperience() {
  const journeyMilestones = [
    {
      period: 'August 2024',
      title: 'Foundation',
      description:
        'Aram Tutorials was launched with a clear mission: to make technology accessible through simple, practical tutorials.',
      icon: Rocket,
      highlight: 'Launch',
    },
    {
      period: 'Late 2024',
      title: 'First Content Wave',
      description:
        'We published our initial set of tutorials, focusing on essential tools for developers and learners.',
      icon: BookOpen,
      highlight: 'Content Creation',
    },
    {
      period: 'Early 2025',
      title: 'Building Momentum',
      description:
        'Our community grew rapidly, with our tutorials surpassing 5,000 views from learners worldwide.',
      icon: TrendingUp,
      highlight: 'Community Growth',
    },
    {
      period: 'Present (August 2025)',
      title: 'Expanding Our Library',
      description:
        'Nearing our one-year anniversary, we now offer a library of over 20 tutorials and continue to expand into new technologies based on community feedback.',
      icon: Globe,
      highlight: 'Expansion',
    },
  ];

  const currentStats = [
    {
      value: '21',
      label: 'Tutorials Created',
      description: 'Quality content focused on practical skills',
    },
    {
      value: '5,700+',
      label: 'Community Views',
      description: 'Real engagement from learners worldwide',
    },
    {
      value: '6+',
      label: 'Years Experience',
      description: 'Deep expertise behind every tutorial',
    },
    {
      value: '6',
      label: 'Core Technologies',
      description: 'Focused mastery in key areas',
    },
  ];

  const coreExpertise = [
    {
      category: 'macOS',
      description:
        'System optimization, productivity tips, and essential workflows',
      level: 'Expert',
      tutorialCount: 4,
    },
    {
      category: 'Windows',
      description: 'Configuration, troubleshooting, and power user techniques',
      level: 'Expert',
      tutorialCount: 3,
    },
    {
      category: 'Android',
      description: 'Device setup, customization, and mobile productivity',
      level: 'Advanced',
      tutorialCount: 2,
    },
    {
      category: 'VS Code',
      description: 'Editor mastery, extensions, and development workflows',
      level: 'Expert',
      tutorialCount: 5,
    },
    {
      category: 'Homebrew',
      description: 'Package management and command-line efficiency',
      level: 'Advanced',
      tutorialCount: 3,
    },
    {
      category: 'Google Suite',
      description: 'Productivity optimization and collaboration workflows',
      level: 'Advanced',
      tutorialCount: 4,
    },
  ];

  const values = [
    {
      title: 'Authentic Growth',
      description:
        'We celebrate our journey honestly, building trust through transparency about our progress.',
      icon: Heart,
    },
    {
      title: 'Focused Excellence',
      description:
        'Rather than claiming expertise in everything, we master the technologies we actually teach.',
      icon: Target,
    },
    {
      title: 'Community-Driven',
      description:
        'Our content direction is shaped by real feedback from learners like you.',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Journey So Far
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          In less than a year, we&apos;ve built something meaningful.
          Here&apos;s our authentic story of growth, learning, and community
          building.
        </p>
      </div>

      {/* Journey Timeline */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeyMilestones.map((milestone, index) => {
            const IconComponent = milestone.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1 text-xs">
                        {milestone.period}
                      </Badge>
                      <CardTitle className="text-lg">
                        {milestone.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </CardContent>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {milestone.highlight}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Current Stats */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground text-center">
          Where We Stand Today
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills & Expertise Aligned with Content */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Our Expertise Matches Our Content
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreExpertise.map((area, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{area.category}</CardTitle>
                  <Badge
                    variant={area.level === 'Expert' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {area.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {area.description}
                </p>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {area.tutorialCount} tutorials available
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Approach */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Award className="h-6 w-6" />
          Our Approach
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>

                  <h4 className="font-semibold text-foreground mb-3">
                    {value.title}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
