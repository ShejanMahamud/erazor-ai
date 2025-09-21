import { SubscriptionResponse } from '@/types/billing';
import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

interface UseSubscriptionReturn {
    hasActiveSubscription: boolean | null;
    subscriptionChecked: boolean;
    isLoading: boolean;
    error: string | null;
    checkSubscription: () => Promise<boolean>;
    refetchSubscription: () => Promise<void>;
}

export const useSubscription = (): UseSubscriptionReturn => {
    const { userId, getToken } = useAuth();
    const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);
    const [subscriptionChecked, setSubscriptionChecked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const checkSubscription = useCallback(async (): Promise<boolean> => {
        if (!userId) return false;

        const token = await getToken();
        if (!token) return false;

        try {
            const response = await fetch(`/api/billing/subscription/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SubscriptionResponse = await response.json();

            if (!data.success || !data.data) {
                return false;
            }

            const subscription = data.data;

            // Check if subscription is active and not expired
            const isActive = subscription.status === 'active' || subscription.status === 'trialing';
            const isNotExpired = !subscription.endsAt || new Date(subscription.endsAt) > new Date();
            const isNotCanceled = !subscription.canceledAt || new Date(subscription.canceledAt) > new Date();

            return isActive && isNotExpired && isNotCanceled;
        } catch (error) {
            console.error('Failed to check subscription:', error);
            throw error;
        }
    }, [userId, getToken]);

    const refetchSubscription = useCallback(async (): Promise<void> => {
        if (!userId) {
            setHasActiveSubscription(false);
            setSubscriptionChecked(true);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const isActive = await checkSubscription();
            setHasActiveSubscription(isActive);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to check subscription';
            setError(errorMessage);
            setHasActiveSubscription(false);
        } finally {
            setIsLoading(false);
            setSubscriptionChecked(true);
        }
    }, [userId, checkSubscription]);

    // Check subscription on mount and when userId changes
    useEffect(() => {
        refetchSubscription();
    }, [refetchSubscription]);

    return {
        hasActiveSubscription,
        subscriptionChecked,
        isLoading,
        error,
        checkSubscription,
        refetchSubscription
    };
};
