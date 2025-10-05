
export const getAImage = async (id: string) => {
    const res = await fetch(`/api/images/${id}`);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || res.statusText);
    }
    const data = await res.json();
    return data;
}