import React from "react";
import { secondsToDuration } from "../utils/duration";

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
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={100 - (timeRemaining / focusDuration) * 100}
              style={{
                width: `${100 - (timeRemaining / focusDuration) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusComponent;
