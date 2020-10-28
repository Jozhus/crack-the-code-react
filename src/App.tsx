import React, { Component } from "react";
import { Game } from "./Game";

class App extends Component {

  public render() {
    return (
      <Game length={3} />
    );
  }
}

export { App };
