'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { Cookie, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      setShow(true);
    } else {
      setConsentGiven(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsentGiven(true);
    setShow(false);

    // Trigger custom event for analytics scripts to listen to
    window.dispatchEvent(new Event('cookieConsentAccepted'));
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setConsentGiven(false);
    setShow(false);

    // Trigger custom event
    window.dispatchEvent(new Event('cookieConsentRejected'));
  };

  // Load analytics scripts based on consent
  useEffect(() => {
    if (consentGiven === true) {
      // Google Analytics 4
      if (process.env.NEXT_PUBLIC_GA_ID) {
        // @ts-ignore
        window.gtag?.('consent', 'update', {
          analytics_storage: 'granted',
        });
      }

      // Microsoft Clarity is loaded automatically when scripts are injected
      // No additional consent update needed
    } else if (consentGiven === false) {
      // Disable analytics
      if (process.env.NEXT_PUBLIC_GA_ID) {
        // @ts-ignore
        window.gtag?.('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    }
  }, [consentGiven]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <Card className="pointer-events-auto max-w-4xl mx-auto shadow-lg border-t-4 border-primary">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  Cookie Consent
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShow(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to analyze site
                traffic, understand where our audience is coming from, and
                improve your browsing experience. You can choose to accept or
                reject these cookies. For more information, please read our{' '}
                <a
                  href="/privacy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <div className="flex gap-3">
                <Button onClick={handleAccept} className="flex-1 sm:flex-none">
                  Accept All Cookies
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReject}
                  className="flex-1 sm:flex-none"
                >
                  Reject
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Analytics cookies help us improve your experience
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
