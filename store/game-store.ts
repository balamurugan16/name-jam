import { create } from "zustand";

type State = {
  duration: number;
  genre: string;
  numberOfRounds: number;
};

interface Action {
  initializeGame: (
    duration: number,
    genre: string,
    numberOfRounds: number,
  ) => void;
}

export const useGameStore = create<State & Action>((set) => ({
  duration: 0,
  genre: "",
  numberOfRounds: 0,
  initializeGame(duration, genre, numberOfRounds) {
    set(() => ({ duration, genre, numberOfRounds }));
  },
}));
