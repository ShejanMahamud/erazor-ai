"use client";
import { useSession } from "@/stores/session-store";
import { useEffect } from "react";

export function InitSession() {

    const session = useSession((state) => state);

    useEffect(() => {
        // Initialize session from cookies first
        if (!session.initialized) {
            session.initializeSession();
        }

        // Then try to get session from API
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
    }, [session.initialized, session.initializeSession, session.setUserId, session.setAnonId]);

    return null;
}
