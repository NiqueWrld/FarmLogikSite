import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  accentColor: string;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      accentColor: '#00c6ff',
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setAccentColor: (color) => set({ accentColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
);