import { BookOpen, Code, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export function AboutStory() {
  const milestones = [
    {
      icon: Code,
      year: '2019',
      title: 'Foundation',
      description: 'Our team came together with a shared passion for technology and education.'
    },
    {
      icon: BookOpen,
      year: '2021',
      title: 'First Tutorials',
      description: 'We began creating comprehensive tutorials to help learners understand complex concepts.'
    },
    {
      icon: Users,
      year: '2022',
      title: 'Growing Community',
      description: 'Built a thriving community of learners and educators sharing knowledge across platforms.'
    },
    {
      icon: Target,
      year: '2024',
      title: 'Aram Tutorials',
      description: 'Launched this platform to make tech education more accessible and comprehensive.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Story
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          From passionate developers to dedicated educators, here's how our love for technology 
          and teaching shaped the creation of Aram Tutorials.
        </p>
      </div>
      
      {/* Story Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Story Text */}
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-primary">Aram Tutorials</strong> was born from a collective passion 
              for technology and education. Our team consists of experienced developers and educators 
              who understand the challenges of learning programming.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              We've all been through the journey of learning to code - from the initial excitement 
              of writing your first "Hello World" to the satisfaction of building complex applications. 
              We know the struggles, the breakthroughs, and everything in between.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Through our combined experience, we noticed that many learners struggled with the same 
              concepts we had once found challenging. This sparked our mission: 
              <strong className="text-primary"> to create clear, practical tutorials that make learning accessible to everyone.</strong>
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our approach focuses on breaking down complex concepts into simple, digestible pieces. 
              We believe that technology should be accessible to everyone, regardless of their 
              background or experience level, and we're committed to making that vision a reality.
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
          To make technology education accessible, engaging, and practical for learners at every level. 
          We believe that with the right guidance and clear explanations, anyone can master programming 
          and build amazing things with code.
        </p>
      </div>
    </div>
  );
}