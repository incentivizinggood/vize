import React from "react";
import { Mongo } from "meteor/mongo";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../../api/data/companies.js";
import ReviewsList from "../reviews-list.jsx";

/* The page where users can view details of a company.
 */
class CompanyPage extends React.Component {
    render() {
        if (!this.props.isReady) {
            return <h2>Loading...</h2>;
        }
        if (this.props.company === undefined) {
            return <h2>That company was not found</h2>;
        }

        return (
            <div className="page company">
                <h2>{this.props.company.name}</h2>
                <ReviewsList query={{ company_id: this.props.company._id }} />
            </div>
        );
    }
}

export default withTracker(({ company_id }) => {
    var handle = Meteor.subscribe("companies");

    return {
        isReady: handle.ready(),
        company: Companies.findOne(new Mongo.ObjectID(company_id))
    };
})(CompanyPage);
