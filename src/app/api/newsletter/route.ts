import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  turnstile: z.string().min(1, 'Captcha verification is required'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = newsletterSchema.parse(body);
    const { email, turnstile } = validatedData;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Newsletter service is not configured. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Verify Turnstile token
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstile,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Captcha verification failed. Please try again.',
        },
        { status: 400 }
      );
    }

    // Send notification email to you
    await resend.emails.send({
      from: 'Aram Tutorials <onboarding@resend.dev>',
      to: ['findarambilal@gmail.com'],
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>New subscriber email:</strong> ${email}</p>
        <p>Please add this email to your newsletter list.</p>
        <p><small>This notification is for internal use only - the subscriber has already received a confirmation.</small></p>
      `,
      text: `New Newsletter Subscription

New subscriber email: ${email}

Please add this email to your newsletter list.

This notification is for internal use only - the subscriber has already received a confirmation.
      `,
    });

    // Option 1: Add to Resend contacts list
    // Note: Requires Resend Audience API to be set up
    try {
      await resend.contacts.create({
        email,
        unsubscribed: false,
      });
    } catch (contactError) {
      console.log('Contacts API not available, skipping contact creation');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the newsletter!',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}
