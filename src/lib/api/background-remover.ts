export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/tools/background-remover", { method: "POST", body: formData });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}
