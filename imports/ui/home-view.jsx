import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import "../imports.css";
import { Companies } from "../api/data/companies.js";
import { Reviews } from "../api/data/reviews.js";

class Home extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Homepage</title>
                </head>
                <body class="home">
                    <div class="mission_statement">
                        <h1>Incentivizing Good</h1>
                        <h4 style={{ textAlign: "center", color: "white" }}>
                            With {this.props.numReviews} reviews on{" "}
                            {this.props.numCompanies} companies.
                        </h4>
                    </div>
                </body>
            </html>
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
})(Home);
