import React from "react";
import { secondsToDuration } from "../../utils/duration";
import ProgressBar from "./ProgressBar";

// Handles the displayed time left for focusing.
function FocusComponent({ timeRemaining, focusDuration }) {
  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            Focusing for {secondsToDuration(focusDuration)} minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(timeRemaining)} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <ProgressBar duration={focusDuration} timeRemaining={timeRemaining} />
        </div>
      </div>
    </div>
  );
}

export default FocusComponent;
