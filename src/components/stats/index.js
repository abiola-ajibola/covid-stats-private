import React, { Fragment } from 'react';
import './index.css';

const Statsboard = ({ globalBreakdowns, fetchHistory }) => {
    const headHeight = document.querySelector('.head')
    return (
        <main className="board-container main-item">
            <div className="board-item">
                <div className='stat'>
                    <div className="flag-title">Flag</div>
                    <div className="country">Country</div>
                    <div className="confirmed">Confirmed</div>
                    <div className="recovered">Recovered</div>
                    <div className="death">Death</div>
                </div>
            </div>

            {
                globalBreakdowns.map((data, i) => {
                    return (
                        <Fragment key={data.location.countryOrRegion}>
                            <div className="board-item" onClick={() => {
                                window.scrollTo(0, headHeight.clientHeight)
                                fetchHistory(data.location.isoCode)
                            }
                            }>
                                <div className='stat'>
                                    <img className="flag"
                                        src={`https://www.countryflags.io/${data.location.isoCode}/flat/64.png`}
                                        alt='flag'
                                    />
                                    <div className="country">{data.location.countryOrRegion}</div>
                                    <div className="confirmed">
                                        {`${data.totalConfirmedCases}`}
                                        <span id="plus">
                                            {` + ${data.newlyConfirmedCases}`}
                                        </span>
                                    </div>
                                    <div className="recovered">
                                        {`${data.totalRecoveredCases}`}
                                        <span id="plus">
                                            {` + ${data.newlyRecoveredCases}`}
                                        </span>
                                    </div>
                                    <div className="death">
                                        {`${data.totalDeaths}`}
                                        <span id="plus">
                                            {` + ${data.newDeaths}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })
            }

        </main>
    )
}

export default Statsboard;