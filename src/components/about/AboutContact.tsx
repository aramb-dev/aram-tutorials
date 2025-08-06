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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'aramtutorials@gmail.com',
      link: 'mailto:aramtutorials@gmail.com'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Typically within 24 hours',
      link: null
    }
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://YouTube.com/@AramTutorials',
      description: 'Subscribe for video tutorials'
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
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Let's Connect
        </h2>
        <p className="text-lg text-white/80 leading-relaxed">
          Have a question, want to collaborate, or just say hello? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Send a Message */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Send a Message
            </h3>
            <p className="text-white/80">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {isSubmitted ? (
            <div className="border border-green-300/30 bg-green-500/10 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-6 w-6 text-green-300" />
              </div>
              <h4 className="font-semibold text-green-200 mb-2">
                Message Sent Successfully!
              </h4>
              <p className="text-green-300 text-sm">
                Thank you for reaching out. We'll get back to you soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-foreground/90 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:ring-primary-foreground/20"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-foreground/90 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:ring-primary-foreground/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary-foreground/90 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:ring-primary-foreground/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-foreground/90 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me more about your project, question, or just say hello!"
                    rows={6}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:ring-primary-foreground/20"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-lightest text-primary hover:bg-brand-lighter font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
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
            </div>
          )}
        </div>

        {/* Other Ways to Connect */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-6">
              Other Ways to Connect
            </h3>

            {/* Direct Contact */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-primary-foreground/90 mb-4">Direct Contact</h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-colors">
                      <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-brand-lightest" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-foreground">{info.label}</p>
                        <p className="text-sm text-primary-foreground/70">{info.value}</p>
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

            {/* Community & Code */}
            <div>
              <h4 className="text-lg font-semibold text-primary-foreground/90 mb-4">Community & Code</h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                        <IconComponent className="h-5 w-5 text-brand-lightest" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-primary-foreground group-hover:text-brand-lightest transition-colors">
                          {social.name}
                        </p>
                        <p className="text-xs text-primary-foreground/70">
                          {social.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}