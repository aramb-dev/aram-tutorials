'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Tag,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'question',
      label: 'General Question',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
    {
      id: 'tutorial-request',
      label: 'Tutorial Request',
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      color:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    },
    {
      id: 'feedback',
      label: 'Feedback',
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    },
    {
      id: 'bug-report',
      label: 'Bug Report',
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    },
    {
      id: 'other',
      label: 'Other',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    },
  ];

  useEffect(() => {
    if (isSubmitted) {
      return;
    }

    if (!turnstileRef.current) {
      return;
    }

    if (!siteKey) {
      console.error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured.');
      setTurnstileError(
        'Security check is unavailable. Please try again later.'
      );
      return;
    }

    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile) {
        return;
      }

      const widgetId = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: token => {
          setTurnstileToken(token);
          setTurnstileError(null);
        },
        'error-callback': () => {
          setTurnstileToken(null);
          setTurnstileError('Security check failed. Please try again.');
        },
        'expired-callback': () => {
          setTurnstileToken(null);
          setTurnstileError('Security check expired. Please try again.');
        },
      });

      setTurnstileWidgetId(widgetId);
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile-script="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', renderWidget);
      return () => {
        existingScript.removeEventListener('load', renderWidget);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', renderWidget);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', renderWidget);
    };
  }, [siteKey, isSubmitted]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!turnstileToken) {
      setTurnstileError('Please complete the security check.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const selectedCategory = categories.find(
        category => category.id === formData.category
      );

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: selectedCategory?.label ?? null,
          message: formData.message,
          turnstile: turnstileToken,
        }),
      });

      const data: {
        success?: boolean;
        message?: string;
      } | null = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        const message =
          data?.message ??
          'Something went wrong while sending your message. Please try again.';
        setSubmitError(message);
        return;
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      });
      setErrors({});
      setTurnstileToken(null);
      setTurnstileError(null);
      if (turnstileWidgetId) {
        window.turnstile?.reset(turnstileWidgetId);
      } else {
        window.turnstile?.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        'Unable to send your message right now. Please try again in a moment.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  if (isSubmitted) {
    return (
      <Card
        id="contact-form"
        className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800"
      >
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Thank you for reaching out! I'll get back to you within 24-48 hours.
            In the meantime, feel free to explore more tutorials or check out my
            latest posts.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="contact-form">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Send me a message
        </CardTitle>
        <p className="text-muted-foreground">
          I'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello, don't hesitate to reach out.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                <User className="h-4 w-4 inline mr-2" />
                Full Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className={
                  errors.name ? 'border-red-500 focus:border-red-500' : ''
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={
                  errors.email ? 'border-red-500 focus:border-red-500' : ''
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              <Tag className="h-4 w-4 inline mr-2" />
              Category (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.category === category.id
                      ? `${category.color} ring-2 ring-primary/50`
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Subject *
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={e => handleInputChange('subject', e.target.value)}
              className={
                errors.subject ? 'border-red-500 focus:border-red-500' : ''
              }
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message *
            </label>
            <Textarea
              id="message"
              placeholder="Tell me more about your question, feedback, or idea..."
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              className={`min-h-[150px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.message ? (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Minimum 10 characters
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                {formData.message.length}/1000
              </p>
            </div>
          </div>

          {/* Turnstile */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Security Check *
            </label>
            <div
              ref={turnstileRef}
              className="rounded-md border border-input bg-background p-2 min-h-[65px]"
            />
            {turnstileError && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {turnstileError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
            {submitError && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {submitError}
              </p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              By submitting this form, you agree that I may contact you
              regarding your inquiry. Your information will never be shared with
              third parties.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
