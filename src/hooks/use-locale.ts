import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocaleState {
  locale: string;
  // eslint-disable-next-line no-unused-vars
  setLocale: (locale: string) => void;
}
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale: string) => set({ locale: locale }),
    }),
    {
      name: 'app-locale',
    },
  ),
);
