import React from "react";
import CompaniesList from "../companies-list.jsx";

export default class CompaniesPage extends React.Component {
    render() {
        return (
            <div className="page companies">
                <CompaniesList />
            </div>
        );
    }
}
