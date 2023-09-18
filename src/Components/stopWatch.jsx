import React, { Component } from 'react';
import './stop.css'

class Stopwatch extends Component {
  constructor() {
    super();
    this.state = {
      isRunning: false,
      startTime: 0,
      currentTime: 0,
      laps: [],
      showStartButton: true,
      showPauseButton: false,
      showLapButton: false,
      showResetButton: false,
      showResumeButton: false,
    };
    this.timer = null;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      const startTime = Date.now() - this.state.currentTime;
      this.timer = setInterval(this.updateTimer, 1000);
      this.setState({
        isRunning: true,
        startTime,
        showStartButton: false,
        showPauseButton: true,
        showLapButton: true,
      });
    }
  };

  updateTimer = () => {
    const currentTime = Date.now() - this.state.startTime;
    this.setState({ currentTime });
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({
      isRunning: false,
      showPauseButton: false,
      showLapButton: false,
      showResetButton: true,
      showResumeButton: true,
    });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      isRunning: false,
      startTime: 0,
      currentTime: 0,
      laps: [],
      showStartButton: true,
      showPauseButton: false,
      showLapButton: false,
      showResetButton: false,
      showResumeButton: false,
    });
  };

  lapTimer = () => {
    const { laps, currentTime } = this.state;
    this.setState({ laps: [...laps, currentTime] });
  };

  resumeTimer = () => {
    this.startTimer();
    this.setState({
      showPauseButton: true,
      showLapButton: true,
      showResetButton: false,
      showResumeButton: false,
    });
  };

  render() {
    const {
      isRunning,
      currentTime,
      laps,
      showStartButton,
      showPauseButton,
      showLapButton,
      showResetButton,
      showResumeButton,
    } = this.state;

    return (
      <div className='stopwatch-container'>
        <h1 style={{fontSize: "70px", }}>Stopwatch</h1>
        <div className="circle">
          <span>
            {Math.floor(currentTime / 3600000).toString().padStart(2, '0')}:
          </span>
          <span>
            {Math.floor((currentTime % 3600000) / 60000).toString().padStart(2, '0')}:
          </span>
          <span>
            {Math.floor((currentTime % 60000) / 1000).toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          {showStartButton && (
            <button onClick={this.startTimer}>Start</button>
          )}
          {showPauseButton && (
            <button onClick={this.pauseTimer}>Pause</button>
          )}
          {showLapButton && (
            <button onClick={this.lapTimer}>Lap</button>
          )}
          {showResetButton && (
            <button onClick={this.resetTimer}>Reset</button>
          )}
          {showResumeButton && (
            <button onClick={this.resumeTimer}>Resume</button>
          )}
        </div>
        <div>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index + 1}: {lap} milliseconds</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Stopwatch;