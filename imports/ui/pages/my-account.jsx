import React from "react";
import PasswordChanger from "../password-changer.jsx";

/* The page where users can view their account details,
 * update their profiles, and change settings.
 */
export default class MyAccountPage extends React.Component {
    renderContent() {
        return (
            <div>
                <PasswordChanger />
            </div>
        );
    }

    render() {
        let content = null;
        if (Meteor.userId() !== null) {
            content = this.renderContent();
        } else {
            content = (
                <div>
                    You must be logged in to use this page.{" "}
                    <a href="/login">Log In</a>
                </div>
            );
        }

        return (
            <div className="page my-account">
                <h1>My Account</h1>
                {content}
            </div>
        );
    }
}
