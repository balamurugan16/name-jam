import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameStore = {
  letter: string;
  names: string[];
  addName: (name: string) => void;
  removeName: (id: number) => void;
};

export const useGameStore = create(
  persist<GameStore>(
    (set) => ({
      letter: "",
      names: [],
      addName(name) {
        set((state) => {
          return { names: [name, ...state.names] };
        });
      },
      removeName(id) {
        set((state) => {
          return { names: state.names.filter((_, idx) => idx !== id) };
        });
      },
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
