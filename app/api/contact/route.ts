// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize the Resend instance with your secret key
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(5).max(1000),
  token: z.string(), 
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Structural Validation
    const parsedData = contactSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: 'Invalid input fields.' }, { status: 400 });
    }
    const { email, message, token } = parsedData.data;

    // 2. Validate Token with Cloudflare Siteverify API
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const clientIp = req.headers.get('x-forwarded-for') || '';

    const cloudflareResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
        remoteip: clientIp, 
      }),
    });

    const verificationResult = await cloudflareResponse.json();

    if (!verificationResult.success) {
      return NextResponse.json({ error: 'Security verification failed.' }, { status: 403 });
    }

    // 3. Execution Processing via Resend
    const { error } = await resend.emails.send({
      // Read the 'Important Note' below regarding the "from" field address
      from: 'Portfolio Contact <onboarding@resend.dev>', 
      to: 'amberjlparker@gmail.com', // Your destination inbox
      replyTo: email,               // Keeps the sender email bound when you hit reply
      subject: `New StackBuildr Message from: ${email}`,
      text: `You received a new message from your portfolio form.\n\nSender: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend delivery failure:', error);
      return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });

  } catch (error) {
    console.error('Server execution exception: ', error);
    return NextResponse.json({ error: 'Server error processing request.' }, { status: 500 });
  }
}