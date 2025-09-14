import { AuroraText } from './aurora-text';

const HeadingText = ({
  headingStyles,
  paragraphStyles,
  heading,
  focusText,
  paragraph,
  boxStyles
}: {
  headingStyles?: string;
  paragraphStyles?: string;
  paragraph: string;
  heading: string;
  focusText: string;
  boxStyles?: string;
}) => {
  return (
    <div className={`mb-16 space-y-4 text-center ${boxStyles}`}>
      <h2 className='text-4xl font-bold tracking-tight uppercase md:text-5xl lg:text-6xl'>
        {heading}
        <span
          className={`bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent ${headingStyles}`}
        >
          <AuroraText colors={['#ff6900', '#9810fa']}>{focusText}</AuroraText>
        </span>
      </h2>

      <p
        className={`text-foreground/70 mx-auto max-w-2xl text-xl leading-relaxed ${paragraphStyles}`}
      >
        {paragraph}
      </p>
    </div>
  );
};

export default HeadingText;
