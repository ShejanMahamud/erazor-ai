'use client';

import { cn } from '@/lib/utils';
import { FAQItem as FAQItemData } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import HeadingText from './ui/heading-text';

export const faqData: FAQItemData[] = [
  {
    id: '1',
    question: 'How accurate is the AI background removal?',
    answer:
      'Our AI achieves 99.9% accuracy in background removal. Using advanced neural networks, it can precisely identify subjects and remove backgrounds while preserving fine details like hair, fur, and complex edges.',
    category: 'technical'
  },
  {
    id: '2',
    question: 'What file formats are supported?',
    answer:
      'We support JPG, PNG, and WEBP formats for uploads. You can download your results as high-quality PNG files with transparency or add custom backgrounds.',
    category: 'technical'
  },
  {
    id: '3',
    question: 'How fast is the processing time?',
    answer:
      'Most images are processed in just 3 seconds! Our optimized AI models and cloud infrastructure ensure lightning-fast results without compromising quality.',
    category: 'general'
  },
  {
    id: '4',
    question: 'Is there a file size limit?',
    answer:
      'Free users can upload files up to 10MB. Pro users get higher limits up to 50MB, and can process 4K resolution images for professional quality output.',
    category: 'general'
  },
  {
    id: '5',
    question: 'What happens to my uploaded images?',
    answer:
      'Your privacy is our priority. Images are processed securely and automatically deleted from our servers after 24 hours. We never store or share your content.',
    category: 'support'
  },
  {
    id: '6',
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes! You can cancel your subscription at any time with no cancellation fees. Your plan remains active until the end of your billing period.',
    category: 'pricing'
  },
  {
    id: '7',
    question: 'Do unused credits roll over?',
    answer:
      "Yes, for paid plans, unused credits roll over to the next month so you never lose what you've paid for. Free plan credits reset monthly.",
    category: 'pricing'
  },
  {
    id: '8',
    question: 'Can I use this for commercial purposes?',
    answer:
      'Absolutely! All our plans include commercial usage rights. You can use the processed images for business, e-commerce, marketing, and any commercial projects.',
    category: 'general'
  }
];

export const FAQ = ({ showHeading = true }: { showHeading?: boolean }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div id='faq' className='bg-background relative w-full overflow-hidden py-20'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]' />

      {showHeading && (
        <HeadingText
          heading='Frequently Asked '
          focusText=' Questions'
          headingStyles='font-manrope'
          paragraph='Everything you need to know about our AI background removal service'
        />
      )}

      <FAQSection
        faqData={faqData}
        openItems={openItems}
        toggleItem={toggleItem}
      />
    </div>
  );
};

export function FAQSection({
  faqData,
  openItems,
  toggleItem
}: {
  faqData: FAQItemData[];
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}) {
  return (
    <div className='relative z-10 mx-auto max-w-3xl px-10 py-10 lg:px-20'>
      <div className='space-y-0'>
        {faqData.map((faq, index) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            index={index}
            isOpen={openItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle
}: {
  faq: FAQItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={cn(
        'group/faq relative flex flex-col border-b py-8 dark:border-neutral-800',
        index === 0 && 'border-t dark:border-neutral-800'
      )}
    >
      {/* Hover Background Effect */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-orange-50/50 via-purple-50/30 to-transparent opacity-0 transition duration-300 group-hover/faq:opacity-100 dark:from-orange-950/20 dark:via-purple-950/10' />

      {/* Question */}
      <button
        onClick={onToggle}
        className='relative z-10 flex w-full items-center justify-between px-6 text-left'
      >
        <div className='flex items-center gap-4'>
          <div className='absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-300 group-hover/faq:h-8 group-hover/faq:bg-gradient-to-b group-hover/faq:from-orange-500 group-hover/faq:to-purple-600 dark:bg-neutral-700' />
          <span className='inline-block text-lg font-bold text-neutral-800 transition duration-300 group-hover/faq:translate-x-2 group-hover/faq:bg-gradient-to-r group-hover/faq:from-orange-500 group-hover/faq:to-purple-600 group-hover/faq:bg-clip-text group-hover/faq:text-transparent dark:text-neutral-100'>
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-neutral-600 transition-transform duration-200 dark:text-neutral-400',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Answer */}
      <div
        className={cn(
          'relative z-10 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className='px-6 pt-4 text-sm text-neutral-600 dark:text-neutral-300'>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};
