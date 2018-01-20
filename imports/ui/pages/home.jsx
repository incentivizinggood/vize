import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../../api/data/companies.js";
import { Reviews } from "../../api/data/reviews.js";

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home">
                <div className="mission_statement">
                    <h1>Incentivizing Good</h1>
                    <h4 style={{ textAlign: "center", color: "white" }}>
                        With {this.props.numReviews} reviews on{" "}
                        {this.props.numCompanies} companies.
                    </h4>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("companies");
    Meteor.subscribe("reviews");

    return {
        numReviews: Reviews.find({}).count(),
        numCompanies: Companies.find({}).count()
    };
})(HomePage);
