import { Tab } from '@/components/ui/tab';
import HeadingText from './ui/heading-text';

export const PricingHeader = ({
  title,
  subtitle,
  focusText,
  frequencies,
  selectedFrequency,
  onFrequencyChange
}: {
  title: string;
  subtitle: string;
  focusText: string;
  frequencies: string[];
  selectedFrequency: string;
  onFrequencyChange: (frequency: string) => void;
}) => (
  <div className='space-y-7 text-center'>
    <HeadingText heading={title} paragraph={subtitle} focusText={focusText} />
    <div className='mx-auto flex w-fit rounded-full bg-[#F3F4F6] p-1 dark:bg-[#222]'>
      {frequencies.map((freq) => (
        <Tab
          key={freq}
          text={freq}
          selected={selectedFrequency === freq}
          setSelected={onFrequencyChange}
          discount={freq === 'yearly'}
        />
      ))}
    </div>
  </div>
);
