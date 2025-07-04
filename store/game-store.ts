import { create } from "zustand";

export type GuessType = {
  name: string;
  isValid: boolean;
};

type GameStore = {
  letter: string;
  guesses: GuessType[];
  duration: number;
  addGuess: (name: string) => void;
  removeGuess: (id: number) => void;
  initializeGame: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  // this generates a random character for the set
  letter: "",
  guesses: [],
  duration: 15,
  addGuess(name) {
    set((state) => {
      const guess = {
        name,
        isValid: name.charAt(0) === state.letter,
      } satisfies GuessType;

      return { guesses: [guess, ...state.guesses] };
    });
  },
  removeGuess(id) {
    set((state) => {
      return { guesses: state.guesses.filter((_, idx) => idx !== id) };
    });
  },
  initializeGame() {
    set(() => ({
      letter: String.fromCharCode(65 + (Math.ceil(Math.random() * 100) % 26)),
    }));
  },
}));
