import { getPricingPlans } from "@/lib/api/get-pricing-plans";
import { getUserSubscription } from "@/lib/api/get-user-subscription";
import { transformPlansToTiers } from "@/lib/pricing-utils";
import { TransformedPricingTier } from "@/types/billing";
import { Subscription } from "@polar-sh/sdk/dist/commonjs/models/components/subscription";
import { create } from "zustand";

interface SubscriptionStore {
    subscription: Subscription | null;
    plans: TransformedPricingTier[] | null;
    loading: boolean;
    error: string | null;
    fetchSubscription: () => Promise<void>;
    isSubscribed: () => boolean;
    fetchPlans: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
    subscription: null,
    plans: null,
    loading: false,
    error: null,
    fetchSubscription: async () => {
        try {
            set({ loading: true });
            const subscription = await getUserSubscription();
            set({ subscription, loading: false });
        } catch (error) {
            set({ error: String(error), loading: false });
        }
    },
    isSubscribed: () => get().subscription?.status === "active",
    fetchPlans: async () => {
        try {
            set({ loading: true });
            const plans = await getPricingPlans();
            const transformedTiers = transformPlansToTiers(plans.data);
            set({ plans: transformedTiers, loading: false });
        } catch (error) {
            set({ error: String(error), loading: false });
        }
    }
}));
