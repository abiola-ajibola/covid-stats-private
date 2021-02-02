import React from "react";
import "./index.css";
import GlobalBreakdowns from "./GlobalBreakdowns";

const Statsboard = ({ globalBreakdowns, fetchHistory }) => {

  return (
    <main className="board-container main-item">
      <div className="board-item">
        <div className="stat">
          <div className="flag-title">Flag</div>
          <div className="country">Country</div>
          <div className="confirmed">Confirmed</div>
          <div className="recovered">Recovered</div>
          <div className="death">Death</div>
        </div>
      </div>
      <GlobalBreakdowns
        globalBreakdowns={globalBreakdowns}
        fetchHistory={fetchHistory}
      />
    </main>
  );
};

export default Statsboard;
