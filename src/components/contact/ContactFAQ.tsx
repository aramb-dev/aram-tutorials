'use client';

import { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  BookOpen,
  Users,
  Code,
  Lightbulb,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'tutorials' | 'collaboration' | 'technical';
}

export function ContactFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'How quickly do you respond to messages?',
      answer: 'I typically respond to emails within 24-48 hours during weekdays. For Discord messages, I usually respond within 2-6 hours. If your matter is urgent, please mention it in the subject line and I\'ll prioritize it for same-day response.'
    },
    {
      id: '2',
      category: 'tutorials',
      question: 'Can I request a specific tutorial topic?',
      answer: 'Absolutely! I love hearing tutorial requests from the community. Please provide as much detail as possible about what you\'d like to learn, your current skill level, and any specific technologies or frameworks you\'re interested in. I prioritize tutorials based on community demand and relevance.'
    },
    {
      id: '3',
      category: 'tutorials',
      question: 'Do you offer personalized coding help?',
      answer: 'Yes, I offer limited one-on-one mentoring sessions for complex projects or specific learning goals. You can schedule a 30-minute consultation through the contact form. For quick questions, the Discord community is usually the fastest way to get help.'
    },
    {
      id: '4',
      category: 'collaboration',
      question: 'Are you available for freelance projects?',
      answer: 'I occasionally take on interesting freelance projects, especially those that align with my expertise in React, Next.js, and modern web development. Please reach out with project details, timeline, and budget for consideration.'
    },
    {
      id: '5',
      category: 'collaboration',
      question: 'Can we collaborate on content creation?',
      answer: 'I\'m always open to collaborating with other developers and content creators! Whether it\'s guest posts, joint tutorials, podcast appearances, or video collaborations, I\'d love to explore opportunities. Please share your ideas and how you envision working together.'
    },
    {
      id: '6',
      category: 'technical',
      question: 'What technologies do you specialize in?',
      answer: 'My main expertise includes React, Next.js, TypeScript, Node.js, and modern web development practices. I also work with databases (PostgreSQL, MongoDB), cloud platforms (Vercel, AWS), and various CSS frameworks. Check my tutorials page for a complete overview of topics I cover.'
    },
    {
      id: '7',
      category: 'general',
      question: 'Do you offer code reviews?',
      answer: 'I provide code reviews on a case-by-case basis, usually for educational purposes or community projects. Please share your code repository, specific areas you\'d like feedback on, and the context of your project. Note that detailed code reviews may require scheduling a consultation session.'
    },
    {
      id: '8',
      category: 'tutorials',
      question: 'Can I translate your tutorials to other languages?',
      answer: 'I appreciate the interest in making content more accessible! Please reach out if you\'d like to translate any of my tutorials. I\'m happy to discuss attribution, hosting options, and how we can work together to reach more developers globally.'
    },
    {
      id: '9',
      category: 'general',
      question: 'How can I support your work?',
      answer: 'There are several ways to support my work: sharing tutorials with others, providing feedback, suggesting improvements, contributing to discussions in the community, or supporting me financially through coffee donations or GitHub sponsorship. Every bit of support helps me create better content!'
    },
    {
      id: '10',
      category: 'technical',
      question: 'Do you provide debugging help?',
      answer: 'For quick debugging questions, the Discord community is your best bet. For complex issues, please provide a minimal reproducible example, error messages, and what you\'ve already tried. I\'m happy to help, but detailed debugging sessions may require a scheduled consultation.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'collaboration', label: 'Collaboration', icon: Users },
    { id: 'technical', label: 'Technical', icon: Code }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8" />
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about tutorials, collaboration, and getting in touch. 
          Can't find what you're looking for? Feel free to reach out!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {filteredFAQs.map((item) => {
            const isOpen = openItems.includes(item.id);
            
            return (
              <Card key={item.id} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-6 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                
                {isOpen && (
                  <CardContent className="pt-0 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No questions found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or view all questions.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Still Have Questions */}
      <Card className="mt-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still have questions?
          </h3>
          
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Don't hesitate to reach out! 
            I'm always happy to help and answer any questions you might have.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => {
              const formElement = document.getElementById('contact-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Send a Message
            </Button>
            
            <Button variant="outline" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Join Discord Community
            </Button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24-48h response time</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>500+ questions answered</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}