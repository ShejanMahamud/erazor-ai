import Cookies from 'js-cookie'
import { createStore } from 'zustand/vanilla'
import { useStoreWithEqualityFn } from 'zustand/traditional'

interface SessionState {
    userId: string | null
    anonId: string | null
    setUserId: (id: string) => void
    setAnonId: (id: string) => void
    loading: boolean
    initialized: boolean
    initializeSession: () => void
}

const sessionStore = createStore<SessionState>((set) => ({
    userId: null,
    anonId: null,
    setUserId: (id: string) => set({ userId: id }),
    setAnonId: (id: string) => set({ anonId: id }),
    loading: true,
    initialized: false,
    initializeSession: () => {
        if (typeof window === 'undefined') return

        const anonId = Cookies.get('anon_id') || null
        const userId = Cookies.get('user_id') || null

        set({
            userId,
            anonId,
            loading: !userId && !anonId,
            initialized: true
        })
    }
}));

export function useSession<T>(
    selector: (state: SessionState) => T,
    equals?: (a: T, b: T) => boolean
): T {
    return useStoreWithEqualityFn(sessionStore, selector, equals);
}