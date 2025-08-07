import { Metadata } from 'next';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactFAQ } from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact - Aram Tutorials',
  description:
    "Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects. We'd love to hear from you!",
  keywords: [
    'contact',
    'Aram Tutorials',
    'team',
    'programming help',
    'tutorial requests',
    'collaboration',
  ],
  openGraph: {
    title: 'Contact - Aram Tutorials',
    description:
      'Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects.',
    type: 'website',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Aram Tutorials',
    description:
      'Get in touch with the Aram Tutorials team. Ask questions, suggest tutorial topics, or collaborate on projects.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
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
