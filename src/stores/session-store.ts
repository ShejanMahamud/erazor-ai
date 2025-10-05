import Cookies from 'js-cookie'
import { create } from 'zustand'

interface SessionState {
    userId: string | null
    anonId: string | null
    setUserId: (id: string) => void
    setAnonId: (id: string) => void
    loading: boolean
    initialized: boolean
    initializeSession: () => void
}

export const useSession = create<SessionState>((set, get) => ({
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
}))