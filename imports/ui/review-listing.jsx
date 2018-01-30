import React from "react";
import Stars from "./stars.jsx";

export default class ReviewListing extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.review.text}</p>
                safety <Stars x={this.props.review.safety} max={5} />
                <br />
                respect <Stars x={this.props.review.respect} max={5} />
            </div>
        );
    }
}
