import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/db';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const { email } = newsletterSchema.parse(body);
    
    // Subscribe to newsletter
    await Database.subscribeToNewsletter(email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to the newsletter!' 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address', 
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
