'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    Clock,
    Code,
    HelpCircle,
    Lightbulb,
    MessageCircle,
    Users,
} from 'lucide-react';
import { useState } from 'react';

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
      question: 'What is Aram Tutorials about?',
      answer:
        'Aram Tutorials focuses on creating clear, beginner-friendly tech tutorials. The content covers a wide range of topics including software installation, productivity tools, cloud services, and basic tech guides to help users navigate technology with ease.',
    },
    {
      id: '2',
      category: 'tutorials',
      question: 'How often are new tutorials posted?',
      answer:
        "There is no fixed upload schedule. New videos are posted whenever they are fully prepared to ensure the best quality. You can subscribe on YouTube to stay updated whenever a new tutorial goes live.",
    },
    {
      id: '3',
      category: 'tutorials',
      question: 'Can I suggest a tutorial topic?',
      answer:
        "Yes! Suggestions are always welcome. If there is a specific tool or topic you would like covered, you can email your idea to aramtutorials@gmail.com or use the contact form on the website.",
    },
    {
      id: '4',
      category: 'collaboration',
      question: 'Do you accept collaborations or sponsorships?',
      answer:
        'Yes - relevant collaborations with tech brands, services, and tools are considered. If you would like to work together, please send details to aramtutorials@gmail.com.',
    },
    {
      id: '5',
      category: 'general',
      question: 'Are your tutorials free to access?',
      answer:
        'Yes, all tutorials on the YouTube channel and website are free to watch and learn from. Occasionally, affiliate links may be used to support the channel, but there is no extra cost to viewers.',
    },
    {
      id: '6',
      category: 'general',
      question: 'Do you offer one-on-one help or consulting?',
      answer:
        'While direct support is not guaranteed, some personalized guidance or future tutorials based on common questions may be offered. Priority is given to widely useful topics.',
    },
    {
      id: '7',
      category: 'general',
      question: 'How can I stay updated on new videos and guides?',
      answer:
        'Subscribe to the YouTube channel (https://www.youtube.com/@AramTutorials) and follow on social platforms to get notified when new tutorials are published.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'collaboration', label: 'Collaboration', icon: Users },
    { id: 'technical', label: 'Technical', icon: Code },
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs =
    activeCategory === 'all'
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
          Find answers to common questions about tutorials, collaboration, and
          getting in touch. Cannot find what you are looking for? Feel free to
          reach out!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
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
          {filteredFAQs.map(item => {
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
            Cannot find the answer you are looking for? Do not hesitate to reach
            out! I am always happy to help and answer any questions you might
            have.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => {
                const formElement = document.getElementById('contact-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Send a Message
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
