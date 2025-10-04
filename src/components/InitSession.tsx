"use client";
import { useSession } from "@/stores/session-store";
import { useEffect } from "react";

export function InitSession() {

    const session = useSession((state) => state);

    useEffect(() => {
        fetch("/api/session")
            .then((res) => res.json())
            .then((data) => {
                if (data.user_id) {
                    session.setUserId(data.user_id);
                }
                if (data.anon_id) {
                    session.setAnonId(data.anon_id);
                }
            })
            .catch(() => { });
    }, []);

    return null;
}
