import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const { email } = newsletterSchema.parse(body);

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

    // Option 1: Add to Resend contacts list
    // Note: Requires Resend Audience API to be set up
    try {
      await resend.contacts.create({
        email,
        unsubscribed: false,
      });
    } catch (contactError) {
      // If contacts API fails, send a notification email instead
      console.log('Contacts API not available, sending notification email');
      await resend.emails.send({
        from: 'Aram Tutorials <onboarding@resend.dev>',
        to: ['aramtutorials@gmail.com'],
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p>Email: ${email}</p>
          <p>Please add this email to your newsletter list.</p>
        `,
        text: `
New Newsletter Subscription

Email: ${email}

Please add this email to your newsletter list.
        `,
      });
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
