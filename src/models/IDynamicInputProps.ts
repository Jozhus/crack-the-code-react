interface IDynamicInputProps {
    id: string;
    getValidValues: () => string;
    updateGuess: (index: number, value: string) => void;
}

export type { IDynamicInputProps };