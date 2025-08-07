import { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactFAQ } from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact - Aram Tutorials',
  description: 'Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects. We\'d love to hear from you!',
  keywords: ['contact', 'Aram Tutorials', 'team', 'programming help', 'tutorial requests', 'collaboration'],
  openGraph: {
    title: 'Contact - Aram Tutorials',
    description: 'Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects.',
    type: 'website',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Aram Tutorials',
    description: 'Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Custom Contact Page Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </header>

      {/* Header Section */}
      <ContactHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info - Takes up 1 column */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <ContactFAQ />
        </div>
      </div>
    </div>
  );
}