import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LocaleState {
  locale: string;
  toggleLocale: () => void
}
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      toggleLocale: () => set({ locale: get().locale === 'jp' ? 'en' : 'jp' }),
    }),
    {
      name: 'app-locale',
    },
  ),
)