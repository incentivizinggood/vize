import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../api/data/companies.js";
import { Reviews } from "../api/data/reviews.js";

/* Show the total number of reviews and companies in the database.
 * For use as a subtitle on the HomePage.
 */
class TotalsCounter extends React.Component {
    render() {
        if (!this.props.isReady) {
            return <h4 style={{ textAlign: "center", color: "white" }} />;
        }

        return (
            <h4 style={{ textAlign: "center", color: "white" }}>
                With {this.props.numReviews} reviews on{" "}
                {this.props.numCompanies} companies.
            </h4>
        );
    }
}

export default withTracker(() => {
    var companiesHandle = Meteor.subscribe("companies");
    var reviewsHandle = Meteor.subscribe("reviews");

    return {
        isReady: companiesHandle.ready() && reviewsHandle.ready(),
        numReviews: Reviews.find({}).count(),
        numCompanies: Companies.find({}).count()
    };
})(TotalsCounter);
