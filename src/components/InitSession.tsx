"use client";
import { useEffect } from "react";

export function InitSession() {
    useEffect(() => {
        fetch("/api/session").catch(() => { });
    }, []);

    return null;
}
