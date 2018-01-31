import React from "react";

export default class Stars extends React.Component {
    render() {
        return (
            <span>
                {this.props.x} of {this.props.max}
            </span>
        );
    }
}
