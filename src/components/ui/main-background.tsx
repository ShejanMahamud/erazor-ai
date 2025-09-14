export const MainBackground = ({ className = '' }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]' />
    <div className='absolute top-0 left-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl' />
    <div className='absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl' />
  </div>
);
