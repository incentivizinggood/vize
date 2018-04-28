import React from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Notifications, remove_notification } from "../api/notifications.js";

class NotificationListing extends React.Component {
    constructor(props) {
        super(props);

        // These bindings are necessary to make `this` work in callbacks.
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss () {
        remove_notification(this.props.notification._id);
    }

    render() {
        return (
            <div className="notification">
                {this.props.notification.content}
                <button onClick={this.onDismiss}>X</button>
            </div>
        );
    }
}

class NotificationsList extends React.Component {
    renderList() {
        return this.props.notifications.map(notification => (
            <NotificationListing
                key={notification._id}
                notification={notification}
            />
        ));
    }

    render() {
        return <div id="notifications">{this.renderList()}</div>;
    }
}

export default withTracker(() => {
    // There is no need to make a connection because this is a local collection.
    // Meteor.subscribe("notifications");

    return {
        notifications: Notifications.find({}).fetch()
    };
})(NotificationsList);
