import { transformPlansToTiers } from '@/lib/pricing-utils';
import { BillingPlansResponse, TransformedPricingTier } from '@/types/billing';
import { useEffect, useState } from 'react';

interface UsePricingPlansReturn {
    tiers: TransformedPricingTier[];
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook for fetching and transforming pricing plans
 * @returns Object containing tiers, loading state, and error
 */
export const usePricingPlans = (): UsePricingPlansReturn => {
    const [tiers, setTiers] = useState<TransformedPricingTier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Prevent state updates if component unmounts

        const fetchPlans = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/billing/plans');

                if (!isMounted) return; // Component unmounted, don't update state

                if (!response.ok) {
                    throw new Error(`Failed to fetch plans: ${response.statusText}`);
                }

                const data: BillingPlansResponse = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch plans');
                }

                const transformedTiers = transformPlansToTiers(data.data);
                setTiers(transformedTiers);
            } catch (err) {
                if (isMounted) {
                    console.warn('API error, but fallback data should be returned from API route:', err);
                    setError('Unable to load pricing plans. Please refresh the page.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        // Only fetch plans once when component mounts
        fetchPlans();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array - only run once on mount

    return {
        tiers,
        loading,
        error
    };
};
