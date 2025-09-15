import MainLayout from '@/components/layout/main-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Erazor - AI Background Removal',
  description:
    'Learn about how Erazor uses cookies and similar technologies to enhance your experience with our AI background removal service.'
};

export default function CookiePolicyPage() {
  return (
    <MainLayout>
      <div className='bg-background min-h-screen'>
        {/* Header */}
        <div className='border-b border-gray-200/50 bg-gradient-to-br from-orange-50 to-purple-50 pt-20 dark:border-gray-800/50 dark:from-orange-950/20 dark:to-purple-950/20'>
          <div className='container mx-auto px-6 py-16'>
            <div className='mx-auto max-w-4xl space-y-4 text-center'>
              <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                Cookie{' '}
                <span className='bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent'>
                  Policy
                </span>
              </h1>
              <p className='text-foreground/70 text-xl leading-relaxed'>
                Learn how we use cookies and similar technologies to enhance
                your experience with our AI background removal service.
              </p>
              <div className='text-foreground/60 flex items-center justify-center gap-2 text-sm'>
                <span>Last updated:</span>
                <span className='font-medium'>September 15, 2025</span>
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
                  What Are Cookies?
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences, analyzing
                  site usage, and enabling certain features of our AI background
                  removal service.
                </p>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  This Cookie Policy explains how Erazor (&ldquo;we,&rdquo;
                  &ldquo;our,&rdquo; or &ldquo;us&rdquo;) uses cookies and
                  similar technologies on our website at erazor.com (the
                  &ldquo;Service&rdquo;).
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  By continuing to use our Service, you consent to our use of
                  cookies in accordance with this Cookie Policy.
                </p>
              </section>

              {/* Types of Cookies */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Types of Cookies We Use
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Necessary Cookies
                </h3>
                <div className='mb-6 rounded-xl border border-green-200/50 bg-green-50/50 p-6 dark:border-green-800/50 dark:bg-green-950/20'>
                  <p className='text-foreground/80 mb-4 leading-relaxed'>
                    These cookies are essential for the website to function
                    properly and cannot be disabled.
                  </p>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Authentication:</strong> Remember your login
                      status and keep you signed in
                    </li>
                    <li>
                      <strong>Security:</strong> Protect against cross-site
                      request forgery and other security threats
                    </li>
                    <li>
                      <strong>Session Management:</strong> Maintain your session
                      while using the service
                    </li>
                    <li>
                      <strong>Cookie Preferences:</strong> Remember your cookie
                      consent choices
                    </li>
                  </ul>
                </div>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Analytics Cookies
                </h3>
                <div className='mb-6 rounded-xl border border-blue-200/50 bg-blue-50/50 p-6 dark:border-blue-800/50 dark:bg-blue-950/20'>
                  <p className='text-foreground/80 mb-4 leading-relaxed'>
                    These cookies help us understand how visitors interact with
                    our website and improve our service.
                  </p>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Google Analytics:</strong> Tracks website usage,
                      page views, and user behavior
                    </li>
                    <li>
                      <strong>Performance Monitoring:</strong> Helps us identify
                      and fix technical issues
                    </li>
                    <li>
                      <strong>Feature Usage:</strong> Shows us which features
                      are most popular
                    </li>
                    <li>
                      <strong>Error Tracking:</strong> Helps us improve service
                      reliability
                    </li>
                  </ul>
                </div>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Functional Cookies
                </h3>
                <div className='mb-6 rounded-xl border border-purple-200/50 bg-purple-50/50 p-6 dark:border-purple-800/50 dark:bg-purple-950/20'>
                  <p className='text-foreground/80 mb-4 leading-relaxed'>
                    These cookies enable enhanced functionality and
                    personalization features.
                  </p>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Chat Support:</strong> Enable the customer support
                      chat widget (Chatwoot)
                    </li>
                    <li>
                      <strong>Theme Preferences:</strong> Remember your
                      dark/light mode preference
                    </li>
                    <li>
                      <strong>Language Settings:</strong> Store your preferred
                      language
                    </li>
                    <li>
                      <strong>User Interface:</strong> Remember your layout and
                      display preferences
                    </li>
                  </ul>
                </div>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Marketing Cookies
                </h3>
                <div className='mb-6 rounded-xl border border-orange-200/50 bg-orange-50/50 p-6 dark:border-orange-800/50 dark:bg-orange-950/20'>
                  <p className='text-foreground/80 mb-4 leading-relaxed'>
                    These cookies are used to deliver relevant advertisements
                    and track marketing campaign effectiveness.
                  </p>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Google Ads:</strong> Show you relevant
                      advertisements on other websites
                    </li>
                    <li>
                      <strong>Facebook Pixel:</strong> Track conversions from
                      social media campaigns
                    </li>
                    <li>
                      <strong>Retargeting:</strong> Show you ads for our service
                      on other websites
                    </li>
                    <li>
                      <strong>Campaign Tracking:</strong> Measure the
                      effectiveness of our marketing efforts
                    </li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Third-Party Cookies and Services
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We use several third-party services that may set their own
                  cookies. These services help us provide better functionality
                  and understand how our service is used.
                </p>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Analytics and Performance
                </h3>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Google Analytics:</strong> Web analytics service
                    that tracks and reports website traffic
                  </li>
                  <li>
                    <strong>Vercel Analytics:</strong> Performance monitoring
                    and web vitals tracking
                  </li>
                  <li>
                    <strong>Sentry:</strong> Error tracking and performance
                    monitoring
                  </li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Support and Communication
                </h3>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Chatwoot:</strong> Customer support chat widget for
                    real-time assistance
                  </li>
                  <li>
                    <strong>Mailchimp:</strong> Email marketing and newsletter
                    services
                  </li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Payment Processing
                </h3>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Stripe:</strong> Secure payment processing for
                    subscriptions and purchases
                  </li>
                  <li>
                    <strong>PayPal:</strong> Alternative payment method with its
                    own cookie policy
                  </li>
                </ul>
              </section>

              {/* Cookie Management */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Managing Your Cookie Preferences
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Our Cookie Consent Tool
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  When you first visit our website, you'll see a cookie consent
                  banner that allows you to:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Accept all cookies for the best experience</li>
                  <li>Reject all non-essential cookies</li>
                  <li>
                    Customize your preferences for different types of cookies
                  </li>
                  <li>
                    Change your preferences at any time using the cookie
                    settings
                  </li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Browser Settings
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  You can also manage cookies through your browser settings.
                  Most browsers allow you to:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>View and delete existing cookies</li>
                  <li>Block all cookies or cookies from specific websites</li>
                  <li>Set preferences for cookie acceptance</li>
                  <li>Clear cookies when you close your browser</li>
                </ul>

                <div className='rounded-xl border border-yellow-200/50 bg-yellow-50/50 p-6 dark:border-yellow-800/50 dark:bg-yellow-950/20'>
                  <p className='text-foreground/80 leading-relaxed'>
                    <strong>Note:</strong> Disabling necessary cookies may
                    affect the functionality of our website. Some features may
                    not work properly without these cookies.
                  </p>
                </div>
              </section>

              {/* Browser-Specific Instructions */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Browser-Specific Cookie Management
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Here's how to manage cookies in popular browsers:
                </p>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='rounded-xl border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <h4 className='text-foreground mb-2 font-semibold'>
                      Google Chrome
                    </h4>
                    <p className='text-foreground/80 text-sm'>
                      Settings → Privacy and Security → Cookies and other site
                      data
                    </p>
                  </div>
                  <div className='rounded-xl border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <h4 className='text-foreground mb-2 font-semibold'>
                      Firefox
                    </h4>
                    <p className='text-foreground/80 text-sm'>
                      Settings → Privacy & Security → Cookies and Site Data
                    </p>
                  </div>
                  <div className='rounded-xl border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <h4 className='text-foreground mb-2 font-semibold'>
                      Safari
                    </h4>
                    <p className='text-foreground/80 text-sm'>
                      Preferences → Privacy → Manage Website Data
                    </p>
                  </div>
                  <div className='rounded-xl border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <h4 className='text-foreground mb-2 font-semibold'>
                      Microsoft Edge
                    </h4>
                    <p className='text-foreground/80 text-sm'>
                      Settings → Cookies and site permissions → Cookies and site
                      data
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Retention */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Cookie Data Retention
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Different types of cookies are stored for different periods:
                </p>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <div>
                      <h4 className='text-foreground font-semibold'>
                        Session Cookies
                      </h4>
                      <p className='text-foreground/80 text-sm'>
                        Deleted when you close your browser
                      </p>
                    </div>
                    <span className='text-foreground/60 text-sm'>
                      Browser session
                    </span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <div>
                      <h4 className='text-foreground font-semibold'>
                        Authentication Cookies
                      </h4>
                      <p className='text-foreground/80 text-sm'>
                        Keep you logged in
                      </p>
                    </div>
                    <span className='text-foreground/60 text-sm'>30 days</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <div>
                      <h4 className='text-foreground font-semibold'>
                        Preference Cookies
                      </h4>
                      <p className='text-foreground/80 text-sm'>
                        Remember your settings
                      </p>
                    </div>
                    <span className='text-foreground/60 text-sm'>1 year</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <div>
                      <h4 className='text-foreground font-semibold'>
                        Analytics Cookies
                      </h4>
                      <p className='text-foreground/80 text-sm'>
                        Track usage patterns
                      </p>
                    </div>
                    <span className='text-foreground/60 text-sm'>2 years</span>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-gray-200/50 bg-gray-50/50 p-4 dark:border-gray-800/50 dark:bg-gray-900/50'>
                    <div>
                      <h4 className='text-foreground font-semibold'>
                        Marketing Cookies
                      </h4>
                      <p className='text-foreground/80 text-sm'>
                        Personalized advertising
                      </p>
                    </div>
                    <span className='text-foreground/60 text-sm'>90 days</span>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Your Rights and Choices
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  You have several rights regarding cookies and your personal
                  data:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    <strong>Right to Object:</strong> You can object to the use
                    of non-essential cookies
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> You can change
                    your cookie preferences at any time
                  </li>
                  <li>
                    <strong>Right to Access:</strong> You can request
                    information about the data we collect
                  </li>
                  <li>
                    <strong>Right to Delete:</strong> You can request deletion
                    of your personal data
                  </li>
                </ul>

                <div className='rounded-xl border border-blue-200/50 bg-blue-50/50 p-6 dark:border-blue-800/50 dark:bg-blue-950/20'>
                  <p className='text-foreground/80 leading-relaxed'>
                    For more information about your privacy rights, please see
                    our{' '}
                    <a
                      href='/privacy'
                      className='text-blue-600 underline hover:text-blue-700 dark:text-blue-400'
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Updates to Policy */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Updates to This Cookie Policy
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons.
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  When we make material changes to this policy, we will notify
                  you by updating the &ldquo;Last updated&rdquo; date at the top
                  of this page and, where appropriate, provide additional notice
                  on our website.
                </p>
              </section>

              {/* Contact Information */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Contact Us About Cookies
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  If you have questions about our use of cookies or this Cookie
                  Policy, please contact us:
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
                      <strong className='text-foreground'>Subject Line:</strong>
                      <span className='text-foreground/80 ml-2'>
                        Cookie Policy Inquiry
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Related Policies */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Related Policies
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  For more information about how we handle your data and our
                  service terms, please review:
                </p>

                <div className='grid gap-4 md:grid-cols-2'>
                  <a
                    href='/privacy'
                    className='group rounded-xl border border-gray-200/50 bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 transition-all hover:border-blue-300/50 hover:shadow-lg dark:border-gray-800/50 dark:from-blue-950/20 dark:to-blue-900/20 dark:hover:border-blue-700/50'
                  >
                    <h3 className='text-foreground mb-2 font-semibold group-hover:text-blue-600'>
                      Privacy Policy
                    </h3>
                    <p className='text-foreground/70 text-sm'>
                      Learn how we collect, use, and protect your personal
                      information
                    </p>
                  </a>
                  <a
                    href='/terms'
                    className='group rounded-xl border border-gray-200/50 bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 transition-all hover:border-purple-300/50 hover:shadow-lg dark:border-gray-800/50 dark:from-purple-950/20 dark:to-purple-900/20 dark:hover:border-purple-700/50'
                  >
                    <h3 className='text-foreground mb-2 font-semibold group-hover:text-purple-600'>
                      Terms of Service
                    </h3>
                    <p className='text-foreground/70 text-sm'>
                      Read the terms and conditions for using our AI background
                      removal service
                    </p>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
