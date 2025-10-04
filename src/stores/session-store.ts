import Cookies from 'js-cookie'
import { create } from 'zustand'

const anonId = Cookies.get('anon_id') || null
const userId = Cookies.get('user_id') || null

interface SessionState {
    userId: string | null
    anonId: string | null
    setUserId: (id: string) => void
    setAnonId: (id: string) => void
    loading: boolean
}

export const useSession = create<SessionState>((set) => ({
    userId: userId,
    anonId: anonId,
    setUserId: (id: string) => set({ userId: id }),
    setAnonId: (id: string) => set({ anonId: id }),
    loading: !userId && !anonId,
}))