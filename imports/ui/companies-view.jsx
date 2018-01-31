import React from "react";
import { withTracker } from "meteor/react-meteor-data";

import { Companies } from "../api/data/companies.js";

import CompanyListing from "./company-listing.jsx";

class CompaniesView extends React.Component {
    renderCompanyList() {
        return this.props.companies.map(company => (
            <CompanyListing key={company._id} company={company} />
        ));
    }
    render() {
        return <div>{this.renderCompanyList()}</div>;
    }
}

export default withTracker(() => {
    Meteor.subscribe("companies");

    return {
        companies: Companies.find({}).fetch()
    };
})(CompaniesView);
