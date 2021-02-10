// Pomodoro.js

import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import BreakComponent from "./BreakComponent";
import FocusComponent from "./FocusComponent";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [timeRemaining, setTimeRemaining] = useState(focusDuration);
  const [onBreak, setOnBreak] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const sound = new Audio(`./public/alarm/submarine-dive-horn.mp3`);

  useInterval(
    () => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
      play();
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setShowInfo(true);
    sound.play();
  }

  // Handle PLAY
  function play() {
    if (timeRemaining === 0) {
      sound.play();
      if (onBreak) {
        setTimeRemaining((timeRemaining) => timeRemaining + focusDuration);
        setOnBreak(false);
      }
      if (!onBreak) {
        setTimeRemaining((timeRemaining) => timeRemaining + breakDuration);
        setOnBreak(true);
      }
    }
  }

  // Handle the STOP button
  const handleStopBtn = () => {
    setIsTimerRunning(false);
    setFocusDuration(1500);
    setBreakDuration(300);
    setTimeRemaining(1500);
    setShowInfo(false);
  };

  // Handle the focus duration view SUBTRACT
  const handleFocusTimeSub = () => {
    if (focusDuration > 300) {
      setFocusDuration((focusDuration) => focusDuration - 300);
      if (!onBreak) setTimeRemaining((timeRemaining) => timeRemaining - 300);
    } else {
      setFocusDuration((focusDuration) => focusDuration);
    }
  };

  // Handle the focus duration view ADD
  const handleFocusTimeAdd = () => {
    if (focusDuration < 3600) {
      setFocusDuration((focusDuration) => focusDuration + 300);
      if (!onBreak) setTimeRemaining((timeRemaining) => timeRemaining + 300);
    } else {
      setFocusDuration((focusDuration) => focusDuration);
    }
  };

  // Handle the break duration view SUBTRACT
  const handleBreakTimeSub = (breakDuration) => {
    if (breakDuration > 60) {
      setBreakDuration((breakDuration) => breakDuration - 60);
      if (onBreak) setTimeRemaining((timeRemaining) => timeRemaining - 60);
    } else {
      setBreakDuration((breakDuration) => breakDuration);
    }
  };

  // Handle the break duration view ADD
  const handleBreakTimeAdd = (breakDuration) => {
    if (breakDuration < 900) {
      setBreakDuration((breakDuration) => breakDuration + 60);
      if (onBreak) setTimeRemaining((timeRemaining) => timeRemaining + 60);
    } else {
      setBreakDuration((breakDuration) => breakDuration);
    }
  };

  // Handle the infoComponent
  const infoComponent = () => {
    if (showInfo) {
      if (onBreak) {
        return (
          <BreakComponent
            breakDuration={breakDuration}
            timeRemaining={timeRemaining}
          />
        );
      }
      if (!onBreak) {
        return (
          <FocusComponent
            focusDuration={focusDuration}
            timeRemaining={timeRemaining}
          />
        );
      }
      return null;
    }
  };

  // Return Pomodoro
  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {secondsToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              <button
                onClick={() => {
                  handleFocusTimeSub(focusDuration);
                }}
                disabled={isTimerRunning}
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>

              <button
                onClick={() => {
                  handleFocusTimeAdd(focusDuration);
                }}
                disabled={isTimerRunning}
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {secondsToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                <button
                  onClick={() => handleBreakTimeSub(breakDuration)}
                  disabled={isTimerRunning}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                <button
                  onClick={() => handleBreakTimeAdd(breakDuration)}
                  disabled={isTimerRunning}
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              onClick={handleStopBtn}
              disabled={!isTimerRunning}
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>{infoComponent()}</div>
    </div>
  );
}

export default Pomodoro;
