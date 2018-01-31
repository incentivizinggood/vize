import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Companies } from "../api/data/companies.js";
import CompanyListing from "./company-listing.jsx";

/* Display several companies in a list.
 * This is primarily for use on the CompanySearchPage.
 */
class CompaniesList extends React.Component {
    renderCompanyList() {
        return this.props.companies.map(company => (
            <CompanyListing key={company._id} company={company} />
        ));
    }
    render() {
        if (!this.props.isReady) {
            return <h2>Loading...</h2>;
        }

        return <div>{this.renderCompanyList()}</div>;
    }
}

export default withTracker(({ query }) => {
    if (query === undefined) {
        query = {};
    }
    var handle = Meteor.subscribe("companies");

    return {
        isReady: handle.ready(),
        companies: Companies.find(query).fetch()
    };
})(CompaniesList);
