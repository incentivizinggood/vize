import React from "react";
import CompanySearchControls from "../company-search-controls.jsx";
import CompaniesList from "../companies-list.jsx";

/* TODO: Transform queryParams to a database query and pass that to CompaniesList.
         Initalize CompanySearchControls with queryParams.
*/

/* The page where users can search/browse companies.
 */
export default class CompanySearchPage extends React.Component {
    render() {
        return (
            <div className="page company-search">
                <CompanySearchControls />
                <CompaniesList />
            </div>
        );
    }
}
