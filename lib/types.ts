export type IGuess = {
  name: string;
  isValid: boolean;
};

export type ISubmission = {
  letter: string;
  guesses: IGuess[];
};
