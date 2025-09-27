'use client';

import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import HeadingText from '@/components/ui/heading-text';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error("Something Went Wrong", {
        description: "There was an error sending your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description:
        'Send us an email and we&apos;ll get back to you within 24 hours.',
      contact: 'support@erazor.ai',
      action: 'mailto:support@erazor.ai'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us during business hours (9 AM - 6 PM EST).',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ];

  return (
    <MainLayout>
      <div className='bg-background relative w-full overflow-hidden py-40'>
        {/* Background Pattern */}
        <div className='pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]' />

        <div className='container relative z-10 mx-auto px-6'>
          {/* Header Section */}
          <HeadingText
            heading='Get In '
            focusText=' Touch'
            headingStyles='font-manrope'
            paragraph="Have questions about Erazor AI? Need help with your account? We're here to help and would love to hear from you."
            boxStyles='mb-16'
          />

          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
              {/* Contact Information */}
              <div className='space-y-8'>
                <div>
                  <h3 className='text-foreground mb-4 text-2xl font-bold'>
                    Contact Information
                  </h3>
                  <p className='text-foreground/70 leading-relaxed'>
                    Choose the best way to reach us. We&apos;re committed to
                    providing excellent customer support and will respond to
                    your inquiry as quickly as possible.
                  </p>
                </div>

                <div className='space-y-6'>
                  {contactInfo.map((info, index) => (
                    <ContactInfoCard key={index} {...info} index={index} />
                  ))}
                </div>

                {/* FAQ Link */}
                <div className='rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50'>
                  <h4 className='text-foreground mb-2 font-semibold'>
                    Looking for quick answers?
                  </h4>
                  <p className='text-foreground/70 mb-4 text-sm'>
                    Check out our FAQ section for instant answers to common
                    questions.
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='hover:bg-gray-50 dark:hover:bg-gray-800'
                  >
                    Visit FAQ
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className='rounded-xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900/50'>
                {submitted ? (
                  <div className='text-center'>
                    <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30'>
                      <svg
                        className='h-8 w-8 text-green-600 dark:text-green-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                    <h3 className='text-foreground mb-2 text-xl font-semibold'>
                      Message Sent!
                    </h3>
                    <p className='text-foreground/70'>
                      Thank you for contacting us. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className='text-foreground mb-6 text-2xl font-bold'>
                      Send us a message
                    </h3>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                          <label className='text-foreground mb-2 block text-sm font-medium'>
                            Name *
                          </label>
                          <Input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className='focus:border-gray-400 focus:ring-gray-400'
                            placeholder='Your full name'
                          />
                        </div>
                        <div>
                          <label className='text-foreground mb-2 block text-sm font-medium'>
                            Email *
                          </label>
                          <Input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className='focus:border-gray-400 focus:ring-gray-400'
                            placeholder='your.email@example.com'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='text-foreground mb-2 block text-sm font-medium'>
                          Subject *
                        </label>
                        <Input
                          type='text'
                          name='subject'
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className='focus:border-gray-400 focus:ring-gray-400'
                          placeholder='What is this regarding?'
                        />
                      </div>

                      <div>
                        <label className='text-foreground mb-2 block text-sm font-medium'>
                          Message *
                        </label>
                        <Textarea
                          name='message'
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className='focus:border-gray-400 focus:ring-gray-400'
                          placeholder='Tell us more about your inquiry...'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full border-0 bg-gradient-to-r from-orange-500 to-purple-600 transition-all duration-300 hover:from-orange-600 hover:to-purple-700'
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const ContactInfoCard = ({
  icon: Icon,
  title,
  description,
  contact,
  action,
  index
}: {
  icon: any;
  title: string;
  description: string;
  contact: string;
  action: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/contact relative flex flex-col border-b py-6 dark:border-neutral-800',
        index === 0 && 'border-t dark:border-neutral-800'
      )}
    >
      {/* Subtle Hover Background Effect */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-gray-50/50 opacity-0 transition duration-300 group-hover/contact:opacity-100 dark:bg-gray-800/20' />

      <div className='relative z-10 flex items-start gap-4'>
        {/* Icon */}
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all duration-300 group-hover/contact:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:group-hover/contact:bg-gray-700'>
          <Icon className='h-6 w-6' />
        </div>

        {/* Content */}
        <div className='flex-1'>
          <h4 className='text-foreground mb-1 font-semibold transition duration-300'>
            {title}
          </h4>
          <p className='text-foreground/70 mb-2 text-sm'>{description}</p>
          <a
            href={action}
            className='text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          >
            {contact}
          </a>
        </div>
      </div>
    </div>
  );
};
