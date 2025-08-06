import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Cloud,
  GitBranch,
  Palette,
  Zap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AboutSkills() {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend Development',
      color: '#4A7C59',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'HTML5', 'CSS3']
    },
    {
      icon: Database,
      title: 'Backend Development',
      color: '#2E5E15',
      skills: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'REST APIs', 'GraphQL']
    },
    {
      icon: Database,
      title: 'Databases',
      color: '#7BA05A',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase']
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      color: '#6B7280',
      skills: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Netlify', 'Railway']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      color: '#A8C78A',
      skills: ['React Native', 'Flutter', 'Expo', 'iOS', 'Android']
    },
    {
      icon: GitBranch,
      title: 'Tools & Workflow',
      color: '#4A7C59',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Linux']
    },
    {
      icon: Palette,
      title: 'Design & UI/UX',
      color: '#7BA05A',
      skills: ['Tailwind CSS', 'Figma', 'Adobe XD', 'Responsive Design', 'UI/UX Principles']
    },
    {
      icon: Zap,
      title: 'Other Technologies',
      color: '#2E5E15',
      skills: ['Machine Learning', 'Data Analysis', 'Web Scraping', 'Automation', 'Testing']
    }
  ];

  const achievements = [
    {
      number: '50+',
      label: 'Tutorials Created',
      description: 'Comprehensive guides and tutorials'
    },
    {
      number: '1000+',
      label: 'Students Helped',
      description: 'Learners across various platforms'
    },
    {
      number: '5+',
      label: 'Years Experience',
      description: 'In software development'
    },
    {
      number: '20+',
      label: 'Technologies',
      description: 'Mastered and taught'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Expertise
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our team brings together years of experience across a wide range of technologies and frameworks.
          Here's what we specialize in and love to teach.
        </p>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {achievement.number}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {achievement.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <IconComponent
                      className="h-5 w-5"
                      style={{ color: category.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Philosophy */}
      <div className="bg-gradient-to-r from-primary/5 to-brand-light/5 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Our Teaching Philosophy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-brand-light/20 rounded-lg flex items-center justify-center mx-auto">
                <Code2 className="h-6 w-6 text-brand-light" />
              </div>
              <h4 className="font-semibold text-foreground">Learn by Doing</h4>
              <p className="text-sm text-muted-foreground">
                We believe the best way to learn programming is through hands-on practice and real projects.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6 text-brand-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Stay Current</h4>
              <p className="text-sm text-muted-foreground">
                Technology evolves rapidly. We continuously update our content to reflect the latest trends and best practices.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-brand-lighter/20 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-brand-lighter" />
              </div>
              <h4 className="font-semibold text-foreground">Clear & Practical</h4>
              <p className="text-sm text-muted-foreground">
                Our tutorials focus on clear explanations and practical applications you can use immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}