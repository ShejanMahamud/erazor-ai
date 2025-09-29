import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import HeadingText from './ui/heading-text';

const pricingFAQItems = [
  {
    question: 'What happens when I run out of credits?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        When you run out of credits, you can either upgrade to a higher plan or
        wait until your next billing cycle for credits to renew. You can also
        purchase additional credit packs if needed.
      </p>
    )
  },
  {
    question: 'Can I change my plan anytime?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        Yes! You can upgrade or downgrade your plan at any time. When you
        upgrade, you&apos;ll be charged the prorated amount immediately. When
        you downgrade, the change will take effect at your next billing cycle.
      </p>
    )
  },
  {
    question: 'Do credits roll over to the next month?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        No, unused credits do not roll over to the next billing period. Credits
        reset monthly for all plans, so we recommend using your credits within
        the month to get the most value from your subscription.
      </p>
    )
  },
  {
    question: 'Is there a free trial?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        Yes! Our Free plan gives you access to try our AI-powered background
        removal with limited credits. No credit card required to get started.
      </p>
    )
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        We accept all major credit cards (Visa, Mastercard, American Express)
        and PayPal. All payments are processed securely through our payment
        provider.
      </p>
    )
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        Absolutely! You can cancel your subscription at any time from your
        account settings. You&apos;ll continue to have access to your plan until
        the end of your current billing period.
      </p>
    )
  },
  {
    question: 'Do you offer refunds?',
    answer: (
      <>
        <p className='mb-4 max-w-[580px]'>
          We offer a 30-day money-back guarantee for all paid plans. If
          you&apos;re not satisfied with our service, contact our support team
          within 30 days of your purchase.
        </p>
        <p className='mb-4 max-w-[580px]'>
          For more details, please review our{' '}
          <Link href='/terms' className='text-foreground underline'>
            terms of service
          </Link>{' '}
          and{' '}
          <Link href='/privacy' className='text-foreground underline'>
            privacy policy
          </Link>
          .
        </p>
      </>
    )
  },
  {
    question: 'Are there any setup fees or hidden costs?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        No, there are no setup fees, hidden costs, or long-term contracts. You
        only pay for the plan you choose, and you can cancel anytime without
        any additional fees.
      </p>
    )
  },
  {
    question: 'Can I upgrade or downgrade my plan mid-cycle?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        Yes! When you upgrade, you&apos;ll be charged the prorated difference
        immediately and get access to new features right away. Downgrades take
        effect at your next billing cycle to ensure you get the full value of
        your current plan.
      </p>
    )
  },
  {
    question: 'Do you offer discounts for annual subscriptions?',
    answer: (
      <p className='mb-4 max-w-[580px]'>
        Yes! Annual subscriptions come with significant savings compared to
        monthly billing. You&apos;ll save up to 20% when you choose to pay
        annually, and you&apos;ll never have to worry about monthly renewals.
      </p>
    )
  }
];

export const PricingFAQ = () => {
  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto px-4'>
        <HeadingText
          heading='Frequently Asked '
          focusText=' Questions'
          paragraph='Got questions? We&apos;ve got answers. Here are some of the most common questions about our pricing plans and services.'
        />

        <div className='mx-auto max-w-3xl'>
          <Accordion type='single' collapsible className='w-full'>
            {pricingFAQItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-left'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className='text-muted-foreground'>{item.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
