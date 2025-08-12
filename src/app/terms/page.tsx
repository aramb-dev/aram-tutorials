import { BackButton } from '@/components/ui/BackButton';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Aram Tutorials',
  description:
    'Terms of service for Aram Tutorials website - rules and guidelines for using our platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BackButton />

          <div className="mt-8">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Aram Tutorials (&quot;the
                  website&quot;, &quot;our service&quot;), you accept and agree
                  to be bound by the terms and provision of this agreement. If
                  you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Description of Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aram Tutorials is a technology education platform that
                  provides tutorials, guides, and educational content related to
                  programming, web development, and technology tools. Our
                  service includes blog posts, video content, newsletters, and
                  community features.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  User Responsibilities
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a user of our service, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>
                    Provide accurate and truthful information when required
                  </li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any harmful or disruptive behavior</li>
                  <li>
                    Not attempt to gain unauthorized access to any part of the
                    service
                  </li>
                  <li>
                    Not use the service to distribute spam or malicious content
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Intellectual Property Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on Aram Tutorials, including but not limited to
                  text, graphics, logos, images, videos, and software, is the
                  property of Aram Tutorials or its content suppliers and is
                  protected by copyright and other intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may view, download, and print content from our website for
                  personal, non-commercial use only, provided you do not modify
                  the content and retain all copyright and other proprietary
                  notices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  User-Generated Content
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you submit comments, feedback, or other content to our
                  website, you grant us the right to use, modify, and display
                  such content in connection with our service. You represent
                  that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>
                    You own or have the right to use the content you submit
                  </li>
                  <li>Your content does not violate any third-party rights</li>
                  <li>Your content is not unlawful, harmful, or offensive</li>
                  <li>
                    Your content does not contain viruses or malicious code
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Privacy Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the service, to
                  understand our practices regarding the collection and use of
                  your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Disclaimers
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The information on this website is provided on an &quot;as
                  is&quot; basis. We make no warranties, expressed or implied,
                  and hereby disclaim all other warranties including without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We do not warrant or make any representations concerning the
                  accuracy, likely results, or reliability of the use of the
                  materials on its website or otherwise relating to such
                  materials or on any sites linked to this site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Aram Tutorials or its suppliers be liable
                  for any damages (including, without limitation, damages for
                  loss of data or profit, or due to business interruption)
                  arising out of the use or inability to use the materials on
                  our website, even if we or our authorized representative has
                  been notified orally or in writing of the possibility of such
                  damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your access to
                  our service immediately, without prior notice or liability,
                  for any reason whatsoever, including without limitation if you
                  breach the Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in
                  accordance with the laws of the jurisdiction in which Aram
                  Tutorials operates, and you irrevocably submit to the
                  exclusive jurisdiction of the courts in that state or
                  location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Service at any
                  time. We will notify users of any material changes by posting
                  the new Terms of Service on this page and updating the
                  &quot;Last updated&quot; date. Your continued use of the
                  service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground">
                    Email:{' '}
                    <Link
                      href="mailto:aramtutorials@gmail.com"
                      className="text-primary hover:underline"
                    >
                      aramtutorials@gmail.com
                    </Link>
                  </p>
                  <p className="text-foreground">
                    Contact Form:{' '}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      aramtutorials.com/contact
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
