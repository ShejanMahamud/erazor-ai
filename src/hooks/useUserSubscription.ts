import { SubscriptionResponse } from '@/types/billing';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface UseUserSubscriptionReturn {
    userSubscription: any | null;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook for fetching user subscription data for display in pricing components
 * @returns Object containing user subscription data, loading state, and error
 */
export const useUserSubscription = (): UseUserSubscriptionReturn => {
    const [userSubscription, setUserSubscription] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { userId, isSignedIn } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const fetchUserSubscription = async () => {
            if (!isSignedIn || !userId) {
                setUserSubscription(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/billing/subscription/${userId}`);

                if (!isMounted) return;

                if (response.ok) {
                    const data: SubscriptionResponse = await response.json();
                    if (data.success) {
                        setUserSubscription(data.data);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    // Continue without subscription data - error is non-critical
                    console.warn('Failed to fetch user subscription:', err);
                    setError('Failed to load subscription data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUserSubscription();

        return () => {
            isMounted = false;
        };
    }, [isSignedIn, userId]);

    return {
        userSubscription,
        loading,
        error
    };
};
