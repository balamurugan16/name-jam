import { IGuess } from "@/lib/types";
import { create } from "zustand";

type State = {
  letter: string;
  guesses: IGuess[];
};

interface Action {
  addGuess: (name: string) => void;
  removeGuess: (id: number) => void;
  initializeRound: () => void;
}

export const useRoundStore = create<State & Action>((set) => ({
  // this generates a random character for the set
  letter: "",
  guesses: [],
  addGuess(name) {
    set((state) => {
      const guess = {
        name,
        isValid: name.charAt(0) === state.letter,
      } satisfies IGuess;

      return { guesses: [guess, ...state.guesses] };
    });
  },
  removeGuess(id) {
    set((state) => {
      return { guesses: state.guesses.filter((_, idx) => idx !== id) };
    });
  },
  initializeRound() {
    set(() => ({
      letter: String.fromCharCode(65 + (Math.ceil(Math.random() * 100) % 26)),
      guesses: [],
    }));
  },
}));
