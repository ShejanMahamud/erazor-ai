"use client";
import { useEffect } from "react";

export function InitAnonUser() {
    useEffect(() => {
        fetch("/api/root/anon-user").catch(() => { });
    }, []);

    return null;
}
