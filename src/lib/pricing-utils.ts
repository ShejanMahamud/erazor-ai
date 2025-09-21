import { BillingPlan, TransformedPricingTier } from '@/types/billing';

/**
 * Transform raw billing plans into formatted pricing tiers
 * @param plans Array of raw billing plans from the API
 * @returns Array of transformed pricing tiers ready for UI display
 */
export const transformPlansToTiers = (
    plans: BillingPlan[]
): TransformedPricingTier[] => {
    // Filter out archived plans
    const activePlans = plans.filter((plan) => !plan.isArchived);

    // Group plans by base name (removing AI, Monthly, Yearly suffixes)
    const planGroups = activePlans.reduce(
        (groups, plan) => {
            // Extract base name: "Erazor AI - Free Monthly" -> "Free"
            let baseName = plan.name
                .replace(/^Erazor AI\s*(AI)?\s*-\s*/, '') // Remove "Erazor AI -" prefix
                .replace(/\s*(Monthly|Yearly)$/, '') // Remove Monthly/Yearly suffix
                .trim();

            if (!groups[baseName]) {
                groups[baseName] = {};
            }
            groups[baseName][plan.recurringInterval] = plan;
            return groups;
        },
        {} as Record<string, Record<string, BillingPlan>>
    );

    const transformedPlans = Object.entries(planGroups)
        .map(([baseName, plansByInterval]) => {
            const monthlyPlan = plansByInterval.month;
            const yearlyPlan = plansByInterval.year;

            // Use monthly plan as primary, fallback to yearly
            const primaryPlan = monthlyPlan || yearlyPlan;

            if (!primaryPlan) return null;

            // Determine the plan type first for pricing logic
            let planType = 'other';
            let displayName = baseName;

            if (
                baseName.toLowerCase().includes('free') ||
                monthlyPlan?.prices[0]?.amountType === 'free' ||
                yearlyPlan?.prices[0]?.amountType === 'free'
            ) {
                displayName = 'Free';
                planType = 'free';
            } else if (baseName.toLowerCase().includes('starter')) {
                displayName = 'Starter';
                planType = 'starter';
            } else if (baseName.toLowerCase().includes('basic')) {
                displayName = 'Basic';
                planType = 'basic';
            } else if (baseName.toLowerCase().includes('pro')) {
                displayName = 'Pro';
                planType = 'pro';
            }

            // Calculate prices with original and discounted values
            const isFree = planType === 'free';

            let monthlyPrice: string | number;
            let yearlyPrice: string | number;
            let originalMonthlyPrice: string | number | null = null;
            let originalYearlyPrice: string | number | null = null;

            if (isFree) {
                // For free plans, show "Free" for both monthly and yearly
                monthlyPrice = 'Free';
                yearlyPrice = 'Free';
            } else {
                // Set pricing based on plan type with original (struck-through) prices
                if (planType === 'basic') {
                    originalMonthlyPrice = 14.99;
                    monthlyPrice = 9.99;
                    originalYearlyPrice = 179.99;
                    yearlyPrice = 99.99;
                } else if (planType === 'starter') {
                    originalMonthlyPrice = 29.99;
                    monthlyPrice = 19.99;
                    originalYearlyPrice = 359.99;
                    yearlyPrice = 199.99;
                } else if (planType === 'pro') {
                    originalMonthlyPrice = 49.99;
                    monthlyPrice = 29.99;
                    originalYearlyPrice = 599.99;
                    yearlyPrice = 299.99;
                } else {
                    // Fallback to API prices if available
                    monthlyPrice = monthlyPlan?.prices[0]?.priceAmount
                        ? monthlyPlan.prices[0].priceAmount / 100
                        : 'Custom';

                    yearlyPrice = yearlyPlan?.prices[0]?.priceAmount
                        ? yearlyPlan.prices[0].priceAmount / 100
                        : 'Custom';
                }
            }

            // Get credits from metadata or benefits
            const monthlyCredits = monthlyPlan?.metadata.credits
                ? parseInt(monthlyPlan.metadata.credits)
                : monthlyPlan?.benefits[0]?.properties.units || 0;

            const yearlyCredits = yearlyPlan?.metadata.credits
                ? parseInt(yearlyPlan.metadata.credits)
                : yearlyPlan?.benefits[0]?.properties.units || 0;

            // Generate features based on credits and benefits
            const features = [];

            // Handle credits - for Free plan, use monthly credits for both tabs since no yearly version exists
            let effectiveMonthlyCredits = monthlyCredits;
            let effectiveYearlyCredits = yearlyCredits;

            if (isFree && monthlyCredits && !yearlyCredits) {
                // For free plans with only monthly version, use same credits for yearly display
                effectiveYearlyCredits = monthlyCredits;
            }

            // Add credits information - show based on selected frequency
            if (effectiveMonthlyCredits && effectiveYearlyCredits) {
                // Will be handled dynamically in the component
                features.push('CREDITS_PLACEHOLDER');
            } else if (effectiveMonthlyCredits) {
                features.push(`${effectiveMonthlyCredits} credits per month`);
            } else if (effectiveYearlyCredits) {
                features.push(`${effectiveYearlyCredits} credits per year`);
            }

            // Add rollover feature if applicable
            const hasRollover = primaryPlan.benefits.some(
                (benefit) => benefit.properties?.rollover
            );
            if (hasRollover && !isFree) {
                features.push('Credit rollover');
            }

            // Add basic features based on plan type
            features.push('AI-powered background removal');

            if (planType === 'free') {
                features.push('Standard quality output');
                features.push('Standard processing speed');
                features.push('Community support');
            } else {
                features.push('High-quality output');
                features.push('Fast processing');

                if (planType === 'starter') {
                    features.push('Email support');
                    features.push('Instant processing');
                } else if (planType === 'basic') {
                    features.push('Email support');
                    features.push('Instant processing');
                } else if (planType === 'pro') {
                    features.push('Priority support');
                    features.push('Advanced features');
                    features.push('Bulk processing');
                    features.push('Instant processing');
                }
            }

            return {
                id: primaryPlan.id,
                planIds: {
                    monthly: monthlyPlan?.id,
                    yearly: yearlyPlan?.id
                },
                name: displayName,
                planType, // Add this for sorting
                price: {
                    monthly: monthlyPrice,
                    yearly: yearlyPrice
                },
                originalPrice:
                    originalMonthlyPrice || originalYearlyPrice
                        ? {
                            monthly: originalMonthlyPrice,
                            yearly: originalYearlyPrice
                        }
                        : undefined,
                description: primaryPlan.description,
                features,
                cta: planType === 'free' ? 'Get Started' : 'Subscribe',
                popular: planType === 'pro',
                highlighted: planType === 'enterprise',
                credits: {
                    monthly: effectiveMonthlyCredits,
                    yearly: effectiveYearlyCredits
                }
            } as TransformedPricingTier & { planType: string };
        })
        .filter(Boolean) as (TransformedPricingTier & { planType: string })[];

    // Sort plans: Free → Basic → Starter → Pro
    return (
        transformedPlans
            .sort((a, b) => {
                const order = { free: 0, basic: 1, starter: 2, pro: 3, other: 4 };
                const aOrder = order[a.planType as keyof typeof order] ?? 4;
                const bOrder = order[b.planType as keyof typeof order] ?? 4;

                if (aOrder !== bOrder) {
                    return aOrder - bOrder;
                }

                // If same type, sort alphabetically
                return a.name.localeCompare(b.name);
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(({ planType, ...tier }) => tier)
    ); // Remove planType from final result
};
