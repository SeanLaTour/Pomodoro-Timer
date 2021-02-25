import React from 'react';
import { secondsToDuration } from "../../utils/duration";
import ProgressBar from "./ProgressBar";

// Handles the displayed time left for breaking.
function BreakComponent({ breakDuration, timeRemaining }) {
    return (
        <div>
          <div className="row mb-2">
            <div className="col">
              <h2 data-testid="session-title">
                On Break for {secondsToDuration(breakDuration)} minutes
              </h2>
              <p className="lead" data-testid="session-sub-title">
                {secondsToDuration(timeRemaining)} remaining
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <ProgressBar duration={breakDuration} timeRemaining={timeRemaining} />
            </div>
          </div>
        </div>
      );
}

export default BreakComponent;