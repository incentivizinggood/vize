import React from "react";

// Hotfix: This does not work on production.
//function isElse (x) {
//    return (typeof x === "object" && typeof x.type === "function" && x.type.name === "Else");
//}

export class If extends React.Component {
    render() {
        if (this.props.cond) {
            return this.props.children[0];
        } else {
            if (this.props.children.length > 1) {
                return this.props.children[1];
            } else {
                return null;
            }
        }
    }
}

export class Then extends React.Component {
    render() {
        return this.props.children;
    }
}

export class Else extends React.Component {
    render() {
        return this.props.children;
    }
}
