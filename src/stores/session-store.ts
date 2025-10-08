import Cookies from 'js-cookie'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { createStore } from 'zustand/vanilla'

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
    setUserId: (id: string) => {
        // Update cookie and state
        if (typeof window !== 'undefined') {
            Cookies.set('user_id', id, { sameSite: 'lax', secure: true })
        }
        set({ userId: id, loading: false })
    },
    setAnonId: (id: string) => {
        // Update cookie and state
        if (typeof window !== 'undefined') {
            Cookies.set('anon_id', id, { sameSite: 'lax', secure: true })
        }
        set({ anonId: id, loading: false })
    },
    loading: true,
    initialized: false,
    initializeSession: () => {
        if (typeof window === 'undefined') return

        const anonId = Cookies.get('anon_id') || null
        const userId = Cookies.get('user_id') || null

        set({
            userId,
            anonId,
            loading: false,
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