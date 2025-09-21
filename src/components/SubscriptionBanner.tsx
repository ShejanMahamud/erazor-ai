import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { forwardRef } from 'react';

interface SubscriptionBannerProps {
    show: boolean;
}

export const SubscriptionBanner = forwardRef<HTMLDivElement, SubscriptionBannerProps>(
    ({ show }, ref) => {
        const router = useRouter();

        if (!show) return null;

        return (
            <div
                ref={ref}
                className="rounded-lg border border-white/10 p-4 shadow-lg"
            >
                <div className="flex items-center gap-3 text-white">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-medium text-sm">
                            You don't have an active subscription!
                        </p>
                        <p className="text-xs opacity-90">
                            Subscribe to our plan to start removing backgrounds from your images.
                        </p>
                    </div>
                    <Button
                        size="sm"
                        variant="secondary"
                        className=" font-medium flex-shrink-0"
                        onClick={() => router.push('/pricing')}
                    >
                        Subscribe Now
                    </Button>
                </div>
            </div>
        );
    }
);

SubscriptionBanner.displayName = 'SubscriptionBanner';
