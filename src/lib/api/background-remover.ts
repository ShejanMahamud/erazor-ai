export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/tools/background-remover", { method: "POST", body: formData });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || res.statusText);
    }
    return await res.json();
}
