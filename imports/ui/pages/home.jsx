import React from "react";
import TotalsCounter from "../totals-counter.jsx";

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="page home">
                <div className="mission_statement">
                    <h1>Incentivizing Good</h1>
                    <TotalsCounter />
                </div>
            </div>
        );
    }
}
