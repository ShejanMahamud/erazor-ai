import sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email to admin/support
    const adminEmail = {
      to: process.env.CONTACT_EMAIL || 'support@erazor.ai',
      from: {
        email: process.env.FROM_EMAIL || 'noreply@erazor.ai',
        name: 'Erazor Contact Form'
      },
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
            <p style="margin: 0; color: #333;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to customer
    const autoReplyEmail = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@erazor.ai',
        name: 'Erazor Support'
      },
      subject: 'Thank you for contacting Erazor - We\'ve received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #f97316 0%, #9333ea 100%); border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
          </div>
          
          <div style="padding: 30px; background-color: #fff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for reaching out to us! We've successfully received your message and our team will review it shortly.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Our typical response time is within 24 hours during business days. If your inquiry is urgent, 
              please don't hesitate to call us directly at <strong>+1 (555) 123-4567</strong>.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://erazor.ai'}" 
                 style="background: linear-gradient(135deg, #f97316 0%, #9333ea 100%); 
                        color: white; 
                        text-decoration: none; 
                        padding: 12px 24px; 
                        border-radius: 6px; 
                        display: inline-block; 
                        font-weight: bold;">
                Visit Erazor.ai
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The Erazor Team<br>
              <a href="mailto:support@erazor.ai" style="color: #f97316;">support@erazor.ai</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(autoReplyEmail)
    ]);

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('SendGrid Error:', error);
    
    // Handle SendGrid specific errors
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}