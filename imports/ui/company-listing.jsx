import React from "react";
import Stars from "./stars.jsx";

export default class CompanyListing extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.company.name}</h3>
                safety <Stars x={this.props.company.safety} max={5} />
                <br />
                respect <Stars x={this.props.company.respect} max={5} />
            </div>
        );
    }
}
