import React from "react";
import Loader from "../Loader";

const GlobalBreakdowns = ({ globalBreakdowns, fetchHistory }) => {
  const breakdowns = globalBreakdowns.map((data, i) => {
    return (
      <div key={data.location.countryOrRegion}>
        <div
          className="board-item"
          onClick={() => fetchHistory(data.location.isoCode)}
        >
          <div className="stat">
            <img
              className="flag"
              src={`https://www.countryflags.io/${data.location.isoCode}/flat/64.png`}
              alt="flag"
            />
            <div className="country">{data.location.countryOrRegion}</div>
            <div className="confirmed">
              {`${data.totalConfirmedCases}`}
              <span id="plus">{` + ${data.newlyConfirmedCases}`}</span>
            </div>
            <div className="recovered">
              {`${data.totalRecoveredCases}`}
              <span id="plus">{` + ${data.newlyRecoveredCases}`}</span>
            </div>
            <div className="death">
              {`${data.totalDeaths}`}
              <span id="plus">{` + ${data.newDeaths}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return breakdowns.length ? breakdowns : <Loader />;
};

export default GlobalBreakdowns;
