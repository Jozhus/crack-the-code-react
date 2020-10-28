import React, { Component } from "react";
import { Input } from "reactstrap";
import { IDynamicInputProps } from "./models/IDynamicInputProps";
import { IDynamicInputState } from "./models/IDynamicInputState";

class DynamicInput extends Component<IDynamicInputProps, IDynamicInputState> {

    constructor(props: IDynamicInputProps) {
        super(props);

        this.state = {
            value: ""
        };

        this.handleInput = this.handleInput.bind(this);
    }

    private handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.value.length > 1
            || (e.target.value.length !== 0 && !e.target.value.match(/[0-9]/g))
            || !this.props.getValidValues().includes(e.target.value)) return;

        this.props.updateGuess(parseInt(e.target.id) - 1, e.target.value);
        this.setState({ value: e.target.value });
    }

    public render() {
        return (
            <Input
                id={this.props.id}
                type="text"
                pattern="[0-9]"
                onChange={this.handleInput}
                value={this.state.value}
                required
            />
        );
    }
}

export { DynamicInput };
