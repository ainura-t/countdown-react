import React from "react";

import "./styles.css";

class App extends React.Component {
  constructor(timer) {
    super();
    this.timer = timer;

    this.state = {
      hour: 0,
      minute: 1,
      second: 0,
      isPaused: false
    };
  }

  handleStart = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        return {
          second: prevState.second - 1
        };
      });

      if (this.state.second === -1) {
        this.setState((prevState) => {
          return {
            minute: prevState.minute - 1,
            second: 59
          };
        });
      }
      if (this.state.minute === -1) {
        this.setState((prevState) => {
          return {
            hour: prevState.hour - 1,
            minute: 59
          };
        });
      }
      if (
        this.state.hour === 0 &&
        this.state.minute === 0 &&
        this.state.second === 0
      ) {
        clearInterval(this.timer);
      }
    }, 1000);
    if (this.state.isPaused === false) {
      this.setState({ isPaused: !this.state.isPaused });
    } else {
      this.setState({ isPaused: this.state.isPaused });
    }
  };

  handleStop = () => {
    clearInterval(this.timer);
    if (this.state.isPaused === false) {
      this.setState({ isPaused: this.state.isPaused });
    } else {
      this.setState({ isPaused: !this.state.isPaused });
    }
  };

  render() {
    const { hour, minute, second } = this.state;
    const text = this.state.isPaused ? "stop" : "start";
    return (
      <div className="box">
        <h1>
          {hour < 9 ? "0" + hour : hour} : {minute < 9 ? "0" + minute : minute}{" "}
          : {second < 9 ? "0" + second : second}
        </h1>
        <button
          onClick={() =>
            this.state.isPaused ? this.handleStop() : this.handleStart()
          }
        >
          {text}
        </button>
      </div>
    );
  }
}

export default App;
