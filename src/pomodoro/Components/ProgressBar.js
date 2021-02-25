import React from 'react';

// Displays the time left in progressbar form.
function ProgressBar({ duration, timeRemaining }) {
    return(
        <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={(100 - (timeRemaining / duration) * 100)}
                  style={{ width: `${(100 - (timeRemaining / duration) * 100)}%` }} 
                />
              </div>
    )
}

export default ProgressBar;