'use client';

import { 
  Mail, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';

export function AboutContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/aramtutorials',
      description: 'Check out our code and projects'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/aramtutorials',
      description: 'Connect with us professionally'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/aramtutorials',
      description: 'Follow for tech updates and tips'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@aramtutorials',
      description: 'Subscribe for video tutorials'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@aramtutorials.com',
      link: 'mailto:contact@aramtutorials.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Global Team',
      link: null
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Usually within 24 hours',
      link: null
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Let's Connect
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Have a question, want to collaborate, or just say hello? We'd love to hear from you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Send a Message
            </h3>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          {isSubmitted ? (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me more about your project, question, or just say hello!"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Contact Info & Social Links */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                );
                
                return info.link ? (
                  <Link key={index} href={info.link} className="block">
                    {content}
                  </Link>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Follow Us
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4">
                      <Link 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {social.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {social.description}
                          </p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link 
                href="/tutorials" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                → Browse All Tutorials
              </Link>
              <Link 
                href="/contact" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                → Contact Page
              </Link>
              <Link 
                href="/newsletter" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                → Subscribe to Newsletter
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}