'use client';

import { Mail, MessageCircle, Users, Lightbulb, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ContactHeader() {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      icon: MessageCircle,
      value: '500+',
      label: 'Questions Answered',
    },
    {
      icon: Users,
      value: '1,000+',
      label: 'Developers Helped',
    },
    {
      icon: Lightbulb,
      value: '50+',
      label: 'Tutorial Ideas from Community',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-transparent" />

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <Mail className="h-4 w-4 mr-2" />
            Let's Connect
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Get in{' '}
            <span className="bg-gradient-to-r from-brand-light to-brand-lighter bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Have a question about a tutorial? Want to suggest a new topic?
            Looking to collaborate on a project? I'd love to hear from you!
          </p>

          {/* Subtext */}
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Whether you're a beginner just starting your coding journey or an
            experienced developer looking to learn something new, I'm here to
            help make tech accessible for everyone.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-brand-primary text-white hover:bg-brand-light font-semibold px-8 py-4 text-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Send Message
            <ArrowDown className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-light to-brand-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 lg:h-20"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-background"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-background"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
