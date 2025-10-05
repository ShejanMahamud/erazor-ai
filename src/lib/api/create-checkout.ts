export const createCheckoutSession = async (productId: string, clerkId: string) => {
    const response = await fetch('/api/billing/checkout/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            clerkId
        }),
    });

    const data = await response.json();
    return data;
}