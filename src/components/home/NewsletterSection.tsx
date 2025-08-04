'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { isValidEmail } from '@/lib/utils';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual newsletter subscription API call
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <CheckCircle className="h-16 w-16 text-accent-green mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome to the Community!
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6">
            Thank you for subscribing! You'll receive our latest tutorials and programming tips directly in your inbox.
          </p>
          <Button 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => setIsSubscribed(false)}
          >
            Subscribe Another Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Mail className="h-4 w-4" />
          <span className="text-sm font-medium">Stay Updated</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Newsletter
        </h2>
        
        <p className="text-lg text-primary-foreground/90">
          Get the latest tutorials, tips, and programming insights delivered straight to your inbox. 
          No spam, unsubscribe anytime.
        </p>
      </div>
      
      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 h-12"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-accent-yellow text-primary hover:bg-accent-yellow/90 font-semibold h-12 px-6"
          >
            {isLoading ? (
              'Subscribing...'
            ) : (
              <>
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        {error && (
          <p className="text-red-300 text-sm">{error}</p>
        )}
      </form>
      
      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
          <CheckCircle className="h-4 w-4 text-accent-green" />
          <span>Weekly tutorials</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
          <CheckCircle className="h-4 w-4 text-accent-green" />
          <span>Exclusive content</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
          <CheckCircle className="h-4 w-4 text-accent-green" />
          <span>No spam, ever</span>
        </div>
      </div>
    </div>
  );
}