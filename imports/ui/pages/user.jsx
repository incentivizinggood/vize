import React from "react";
import { Mongo } from "meteor/mongo";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../../api/data/companies.js";

/* Users can view the public information of other users on this page.
 */
class UserPage extends React.Component {
    render() {
        if (!this.props.isReady) {
            return <h2>Loading...</h2>;
        }
        if (this.props.user === undefined) {
            return <h2>That user was not found</h2>;
        }

        return (
            <div className="page user">
                <h2>This page is not implemented yet.</h2>
            </div>
        );
    }
}

export default withTracker(({ user_id }) => {
    var handle = Meteor.subscribe("users");

    return {
        isReady: handle.ready(),
        user: Meteor.users.findOne(new Mongo.ObjectID(user_id)),
    };
})(UserPage);
