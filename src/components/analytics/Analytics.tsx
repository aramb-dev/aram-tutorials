'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function Analytics() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    // Check existing consent
    const consentValue = localStorage.getItem('cookie-consent');
    setConsent(consentValue === 'accepted');

    // Listen for consent changes
    const handleConsentUpdate = () => {
      const newConsent = localStorage.getItem('cookie-consent');
      setConsent(newConsent === 'accepted');
    };

    window.addEventListener('cookieConsentAccepted', handleConsentUpdate);
    window.addEventListener('cookieConsentRejected', handleConsentUpdate);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentUpdate);
      window.removeEventListener('cookieConsentRejected', handleConsentUpdate);
    };
  }, []);

  if (!gaId && !clarityId) return null;

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Set default consent state
              gtag('consent', 'default', {
                analytics_storage: ${consent ? "'granted'" : "'denied'"},
                ad_storage: 'denied',
              });

              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {clarityId && consent && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
