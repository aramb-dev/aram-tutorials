import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000),
  turnstile: z.string().min(1, 'Captcha verification is required'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service is not configured. Please try again later.',
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
          response: validatedData.turnstile,
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

    // Send confirmation email to submitter
    await resend.emails.send({
      from: 'Aram Tutorials <onboarding@resend.dev>',
      to: [validatedData.email],
      subject: 'Thank you for contacting Aram Tutorials',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${validatedData.name},</p>
        <p>We've received your message and will get back to you soon.</p>
        <p>Here's a copy of your message:</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${validatedData.message.replace(/\n/g, '<br>')}
        </div>
        <p>Best regards,<br>The Aram Tutorials Team</p>
      `,
      text: `Thank you for your message!

Hi ${validatedData.name},

We've received your message and will get back to you soon.

Here's a copy of your message:

${validatedData.message}

Best regards,
The Aram Tutorials Team
      `,
    });

    // Send notification email to you
    await resend.emails.send({
      from: 'Aram Tutorials <onboarding@resend.dev>',
      to: ['findarambilal@gmail.com'],
      subject: `New Contact Form Submission from ${validatedData.name}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          ${validatedData.message.replace(/\n/g, '<br>')}
        </div>
        <p><a href="mailto:${validatedData.email}">Reply to this message</a></p>
      `,
      text: `New Contact Form Submission

From: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}

Reply to: ${validatedData.email}
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}
