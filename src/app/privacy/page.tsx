import MainLayout from '@/components/layout/main-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Erazor - AI Background Removal',
  description:
    'Learn how Erazor protects your privacy and handles your data when using our AI background removal service.'
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className='bg-background min-h-screen'>
        {/* Header */}
        <div className='border-b border-gray-200/50 bg-gradient-to-br from-orange-50 to-purple-50 pt-20 dark:border-gray-800/50 dark:from-orange-950/20 dark:to-purple-950/20'>
          <div className='container mx-auto px-6 py-16'>
            <div className='mx-auto max-w-4xl space-y-4 text-center'>
              <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                Privacy{' '}
                <span className='bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent'>
                  Policy
                </span>
              </h1>
              <p className='text-foreground/70 text-xl leading-relaxed'>
                Your privacy is important to us. Learn how we collect, use, and
                protect your information.
              </p>
              <div className='text-foreground/60 flex items-center justify-center gap-2 text-sm'>
                <span>Last updated:</span>
                <span className='font-medium'>September 14, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='container mx-auto bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] px-6 py-16'>
          <div className='mx-auto max-w-4xl'>
            <div className='prose prose-lg dark:prose-invert max-w-none'>
              {/* Introduction */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Introduction
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Erazor (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                  &ldquo;us&rdquo;) is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you use our AI-powered
                  background removal service available at erazor.com (the
                  &ldquo;Service&rdquo;).
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  By using our Service, you agree to the collection and use of
                  information in accordance with this Privacy Policy. If you do
                  not agree with our policies and practices, please do not use
                  our Service.
                </p>
              </section>

              {/* Information We Collect */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Information We Collect
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Personal Information
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Create an account or register for our Service</li>
                  <li>Upload images for background removal</li>
                  <li>
                    Subscribe to our newsletter or marketing communications
                  </li>
                  <li>Contact us for customer support</li>
                  <li>Make a purchase or payment</li>
                </ul>

                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  This information may include:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Name and email address</li>
                  <li>Billing and payment information</li>
                  <li>Account credentials</li>
                  <li>Communication preferences</li>
                  <li>Images you upload for processing</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Automatically Collected Information
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  When you use our Service, we may automatically collect certain
                  information:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  How We Use Your Information
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We use the information we collect for various purposes:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Service Provision:</strong> To provide, maintain,
                    and improve our background removal service
                  </li>
                  <li>
                    <strong>Image Processing:</strong> To process your uploaded
                    images using our AI technology
                  </li>
                  <li>
                    <strong>Account Management:</strong> To manage your account
                    and provide customer support
                  </li>
                  <li>
                    <strong>Billing:</strong> To process payments and manage
                    subscriptions
                  </li>
                  <li>
                    <strong>Communication:</strong> To send service-related
                    notifications and updates
                  </li>
                  <li>
                    <strong>Improvement:</strong> To analyze usage patterns and
                    improve our Service
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> To comply with legal
                    obligations and protect our rights
                  </li>
                </ul>
              </section>

              {/* Image Data Handling */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Image Data Handling
                </h2>
                <div className='mb-6 rounded-xl border border-orange-200/50 bg-orange-50/50 p-6 dark:border-orange-800/50 dark:bg-orange-950/20'>
                  <h3 className='text-foreground mb-3 text-lg font-semibold'>
                    Important: Your Images
                  </h3>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Temporary Storage:</strong> Uploaded images are
                      temporarily stored for processing only
                    </li>
                    <li>
                      <strong>Automatic Deletion:</strong> Images are
                      automatically deleted from our servers within 24 hours
                    </li>
                    <li>
                      <strong>No Training Data:</strong> Your images are never
                      used to train our AI models
                    </li>
                    <li>
                      <strong>Secure Processing:</strong> All image processing
                      occurs in secure, encrypted environments
                    </li>
                    <li>
                      <strong>No Human Access:</strong> Our staff cannot access
                      your uploaded images
                    </li>
                  </ul>
                </div>
              </section>

              {/* Information Sharing */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Information Sharing and Disclosure
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties, except in the following
                  circumstances:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Service Providers:</strong> We may share information
                    with trusted third-party service providers who assist in
                    operating our Service
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose
                    information when required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> Information may be
                    transferred in connection with a merger, acquisition, or
                    asset sale
                  </li>
                  <li>
                    <strong>Consent:</strong> We may share information when you
                    have given explicit consent
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Data Security
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We implement appropriate technical and organizational security
                  measures to protect your information:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className='text-foreground/80 leading-relaxed'>
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure. We cannot guarantee
                  absolute security but strive to use commercially acceptable
                  means to protect your information.
                </p>
              </section>

              {/* Your Rights */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Your Privacy Rights
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Access:</strong> Request access to your personal
                    information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your
                    information in a portable format
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain processing of
                    your information
                  </li>
                  <li>
                    <strong>Restriction:</strong> Request restriction of
                    processing in certain circumstances
                  </li>
                </ul>
                <p className='text-foreground/80 leading-relaxed'>
                  To exercise these rights, please contact us using the
                  information provided in the &ldquo;Contact Us&rdquo; section
                  below.
                </p>
              </section>

              {/* Cookies */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Cookies and Tracking
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We use cookies and similar tracking technologies to enhance
                  your experience:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Essential Cookies:</strong> Required for the Service
                    to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    you use our Service
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your settings
                    and preferences
                  </li>
                </ul>
                <p className='text-foreground/80 leading-relaxed'>
                  You can control cookies through your browser settings.
                  However, disabling certain cookies may affect the
                  functionality of our Service.
                </p>
              </section>

              {/* Third-Party Services */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Third-Party Services
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Our Service may contain links to third-party websites or
                  integrate with third-party services. We are not responsible
                  for the privacy practices of these third parties. We encourage
                  you to review their privacy policies.
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  Third-party services we may use include:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Analytics services (Google Analytics)</li>
                  <li>Customer support tools</li>
                  <li>Cloud storage providers</li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Children&apos;s Privacy
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  Our Service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If we become aware that we have collected
                  personal information from a child under 13, we will take steps
                  to delete such information.
                </p>
              </section>

              {/* International Transfers */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  International Data Transfers
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  Your information may be transferred to and processed in
                  countries other than your country of residence. We ensure that
                  such transfers comply with applicable data protection laws and
                  implement appropriate safeguards to protect your information.
                </p>
              </section>

              {/* Changes to Policy */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Changes to This Privacy Policy
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new Privacy
                  Policy on our website and updating the &ldquo;Last
                  updated&rdquo; date. Your continued use of the Service after
                  such changes constitutes acceptance of the updated Privacy
                  Policy.
                </p>
              </section>

              {/* Contact Information */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Contact Us
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>

                <div className='rounded-xl border border-gray-200/50 bg-gray-50 p-6 dark:border-gray-800/50 dark:bg-gray-900/50'>
                  <div className='space-y-3'>
                    <div>
                      <strong className='text-foreground'>Email:</strong>
                      <span className='text-foreground/80 ml-2'>
                        privacy@erazor.com
                      </span>
                    </div>
                    <div>
                      <strong className='text-foreground'>Support:</strong>
                      <span className='text-foreground/80 ml-2'>
                        support@erazor.com
                      </span>
                    </div>
                    <div>
                      <strong className='text-foreground'>
                        Response Time:
                      </strong>
                      <span className='text-foreground/80 ml-2'>
                        We will respond to privacy inquiries within 30 days
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* GDPR/CCPA Compliance */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Regional Privacy Rights
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  European Union (GDPR)
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  If you are located in the European Union, you have additional
                  rights under the General Data Protection Regulation (GDPR),
                  including the right to lodge a complaint with a supervisory
                  authority.
                </p>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  California (CCPA)
                </h3>
                <p className='text-foreground/80 leading-relaxed'>
                  California residents have specific rights under the California
                  Consumer Privacy Act (CCPA), including the right to know what
                  personal information is collected and the right to delete
                  personal information.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
