export const getUserSubscription = async () => {
    const response = await fetch(`/api/billing/subscription`, {
        next: { revalidate: 60 }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
    }
    const data = await response.json();
    return data;
}