export async function getImageHistory(filters: URLSearchParams) {
    const res = await fetch(
        `/api/images/history?${filters}`
    );
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || res.statusText);
    }
    const data = await res.json();
    return data;
}
