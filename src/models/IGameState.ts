import { IClue } from "./IClue";

interface IGameState {
    answer: string;
    guess: string[];
    clues: IClue[];
    inputFields: JSX.Element[];
    validValues: string;
}

export type { IGameState };