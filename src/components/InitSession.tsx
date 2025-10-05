"use client";
import { useSession } from "@/stores/session-store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export function InitSession() {

    const [initialized, initializeSession, setAnonId, setUserId] = useSession(useShallow((s) => [s.initialized, s.initializeSession, s.setAnonId, s.setUserId]));

    useEffect(() => {
        // Initialize session from cookies first
        if (!initialized) {
            initializeSession();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]);

    useEffect(() => {
        // Fetch session from API after initialization
        if (!initialized) return;

        fetch("/api/session")
            .then((res) => res.json())
            .then((data) => {
                if (data.user_id) {
                    setUserId(data.user_id);
                }
                if (data.anon_id) {
                    setAnonId(data.anon_id);
                }
            })
            .catch(() => { });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized]);

    return null;
}
