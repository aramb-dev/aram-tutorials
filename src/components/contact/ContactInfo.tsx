'use client';

import {
  Mail,
  MapPin,
  Clock,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  ExternalLink,
  Calendar,
  Coffee,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'aramtutorials@gmail.com',
      href: 'mailto:aramtutorials@gmail.com',
      description: 'Best for detailed questions and collaboration'
    },
    {
      icon: MessageCircle,
      label: 'Discord',
      value: 'Join our community',
      href: '#',
      description: 'Quick questions and community discussions'
    },
    {
      icon: Calendar,
      label: 'Schedule a Call',
      value: 'Book 30-min session',
      href: '#',
      description: 'For complex projects or mentoring'
    }
  ];

  const socialLinks = [
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://YouTube.com/@AramTutorials',
      color: 'hover:text-red-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/aramtutorials',
      color: 'hover:text-blue-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/aramtutorials',
      color: 'hover:text-blue-600'
    }
  ];

  const responseTime = {
    email: '24-48 hours',
    discord: '2-6 hours',
    urgent: 'Same day'
  };

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Get in Touch</CardTitle>
          <p className="text-muted-foreground">
            Choose the best way to reach us based on your needs.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                className="block p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{method.label}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">
                      {method.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </CardContent>
      </Card>

      {/* Response Times */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email inquiries</span>
              <Badge variant="outline">{responseTime.email}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Discord messages</span>
              <Badge variant="outline">{responseTime.discord}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Urgent matters</span>
              <Badge variant="default">{responseTime.urgent}</Badge>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Our team operates across multiple timezones. We typically respond faster during
              weekdays (9 AM - 6 PM UTC).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Location & Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="font-medium text-foreground">Team Available</p>
                <p className="text-sm text-muted-foreground">Global Team (Multiple Timezones)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Working Hours</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Limited availability</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Follow Us</CardTitle>
          <p className="text-muted-foreground text-sm">
            Stay updated with our latest tutorials and coding tips.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all text-muted-foreground ${social.color}`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support My Work */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Support Our Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If our tutorials have helped you, consider supporting our work to help us create more quality content.
          </p>

          <div className="space-y-3">
            <Button className="w-full" size="sm">
              <Coffee className="h-4 w-4 mr-2" />
              Buy me a coffee
            </Button>

            <Button variant="outline" className="w-full" size="sm">
              <Youtube className="h-4 w-4 mr-2" />
              Subscribe on YouTube
            </Button>
          </div>

          <div className="mt-4 p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Your support helps us dedicate more time to creating free, high-quality tutorials for the community.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">21</div>
              <div className="text-xs text-muted-foreground">Tutorials Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">5.7K+</div>
              <div className="text-xs text-muted-foreground">Community Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">6+</div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-xs text-muted-foreground">Core Technologies</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}