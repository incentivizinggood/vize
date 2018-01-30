import React from "react";

/**
 * Display a star rating.
 */
export default class Stars extends React.Component {
    render() {
        return (
            <span>
                {this.props.x} of {this.props.max}
            </span>
        );
    }
}
