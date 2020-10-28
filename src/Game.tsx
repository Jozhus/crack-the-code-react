import React, { Component } from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { v4 as uuid } from "uuid";
import { DynamicInput } from "./DynamicInput";
import { IClue } from "./models/IClue";
import { IGameProps } from "./models/IGameProps";
import { IGameState } from "./models/IGameState";

class Game extends Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);

        this.state = {
            answer: "",
            guess: [],
            clues: [],
            inputFields: [],
            validValues: ""
        };

        this.getValidValues = this.getValidValues.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.updateGuess = this.updateGuess.bind(this);
    }

    public componentDidMount(): void {
        this.restart(this.props.length);
    }

    // Length should be restricted between 0 and 10.
    private restart(length: number): void {
        let pool: string = "0123456789";
        let newAnswer: string = "";
        const newGuess: string[] = []
        const newInputFields: JSX.Element[] = [];

        for (; length > 0; length--) {
            const char: string = pool[Math.floor(Math.random() * pool.length)];
            pool = pool.replace(char, '');
            newAnswer += char;
            newGuess.push(' ');

            newInputFields.push(
                <DynamicInput
                    key={uuid()}
                    id={`${length}`}
                    getValidValues={this.getValidValues}
                    updateGuess={this.updateGuess}
                />
            );
        }

        this.setState({ answer: newAnswer, guess: newGuess, clues: [], inputFields: newInputFields.reverse(), validValues: "0123465789" });
    }

    private evaluate(): void {
        const newClues: IClue[] = [...this.state.clues];
        let newClue: IClue = {
            guess: this.state.guess.join(''),
            partialCorrect: 0,
            fullCorrect: 0
        };

        this.state.guess.forEach((char: string, index: number) => {
            if (char === this.state.answer[index]) {
                newClue.fullCorrect += 1;
            } else if (this.state.answer.includes(char)) {
                newClue.partialCorrect += 1;
            }
        });

        newClues.push(newClue);

        this.setState({ clues: newClues });
    }

    public getValidValues(): string {
        return this.state.validValues;
    }

    public updateGuess(index: number, value: string): void {
        const newGuess: string[] = [...this.state.guess];
        let newValidValues: string = "0123456789";
        newGuess[index] = value;

        newGuess.forEach((guess: string) => {
            newValidValues = newValidValues.replace(guess, '');
        });

        this.setState({ guess: newGuess, validValues: newValidValues });
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Col>
                    <Form onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => { event.preventDefault(); }}>
                        {this.state.inputFields}
                        <Button
                            onClick={this.evaluate}
                        >
                            Try
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {this.state.clues.map((clue: IClue) => {
                        return (
                            <Row>
                                <div>{JSON.stringify(clue, null, 3)}</div>
                            </Row>
                        );
                    })}
                </Col>
            </React.Fragment>
        );
    }
}

export { Game };
