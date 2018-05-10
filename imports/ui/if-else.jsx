import React from "react";

function isElse (x) {
    return (typeof x === "object" && typeof x.type === "function" && x.type.name === "Else");
}

export class If extends React.Component {
    render () {
        let i = this.props.children.findIndex(isElse);
        if (i == -1) {
            if (this.props.cond) {
                return this.props.children;
            }
        } else {
            if (this.props.cond) {
                return this.props.children.slice(0,i);
            } else {
                return this.props.children.slice(i+1);
            }
        }
    }
}

export class Else extends React.Component {
    render () {
        console.log("Error: an <Else/> got rendered. This should never happen.");
        return null;
    }
}
