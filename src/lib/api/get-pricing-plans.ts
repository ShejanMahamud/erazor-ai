import { BillingPlansResponse } from "@/types/billing";

export const getPricingPlans = async () => {
    const response = await fetch('/api/billing/plans', {
        next: { revalidate: 3600 }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch plans: ${response.statusText}`);
    }

    const data: BillingPlansResponse = await response.json();
    return data;
}