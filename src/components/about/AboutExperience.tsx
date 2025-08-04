import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ExternalLink,
  Calendar,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AboutExperience() {
  const experiences = [
    {
      type: 'work',
      title: 'Full-Stack Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2022 - Present',
      description: 'Developing web applications and mobile apps for various clients, specializing in React, Node.js, and modern web technologies.',
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS']
    },
    {
      type: 'work',
      title: 'Content Creator & Educator',
      company: 'Aram Tutorials',
      location: 'Online',
      period: '2021 - Present',
      description: 'Creating educational content, tutorials, and courses to help developers learn programming and web development.',
      technologies: ['Teaching', 'Content Creation', 'Video Production', 'Technical Writing']
    },
    {
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      company: 'University',
      location: 'Bangladesh',
      period: '2019 - 2023',
      description: 'Studied computer science fundamentals, algorithms, data structures, and software engineering principles.',
      technologies: ['Computer Science', 'Algorithms', 'Data Structures', 'Software Engineering']
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      status: 'Completed',
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      status: 'Completed',
      link: '#'
    },
    {
      title: 'Learning Management System',
      description: 'An LMS platform for online courses with video streaming, progress tracking, and interactive quizzes.',
      technologies: ['Vue.js', 'Django', 'PostgreSQL', 'AWS S3'],
      status: 'In Progress',
      link: '#'
    },
    {
      title: 'Mobile Fitness App',
      description: 'A React Native app for fitness tracking with workout plans, progress monitoring, and social features.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      status: 'Completed',
      link: '#'
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      year: '2023',
      credentialId: 'AWS-DEV-2023'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      year: '2022',
      credentialId: 'META-REACT-2022'
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'freeCodeCamp',
      year: '2021',
      credentialId: 'FCC-FULLSTACK-2021'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Experience & Projects
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Here's a look at my professional journey, education, and some of the projects I've worked on.
        </p>
      </div>
      
      {/* Experience Timeline */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Professional Experience
        </h3>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {exp.type === 'work' ? (
                        <Briefcase className="h-4 w-4 text-primary" />
                      ) : (
                        <GraduationCap className="h-4 w-4 text-primary" />
                      )}
                      <h4 className="text-lg font-semibold text-foreground">
                        {exp.title}
                      </h4>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium text-primary">{exp.company}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Projects */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Award className="h-6 w-6" />
          Featured Projects
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge 
                    variant={project.status === 'Completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Link href={project.link}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    View Project
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Certifications */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Award className="h-6 w-6" />
          Certifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                
                <h4 className="font-semibold text-foreground mb-2">
                  {cert.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {cert.issuer}
                </p>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {cert.year}
                </p>
                
                <Badge variant="outline" className="text-xs">
                  {cert.credentialId}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}