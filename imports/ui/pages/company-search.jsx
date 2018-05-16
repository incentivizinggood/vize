import React from "react";
import CompanySearchControls from "../company-search-controls.jsx";
import CompaniesList from "../companies-list.jsx";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import CompanyComponent from "../../ui/components/companyComponent.jsx";



/* TODO: Transform queryParams to a database query and pass that to CompaniesList.
         Initalize CompanySearchControls with queryParams.
*/

/* The page where users can search/browse companies.
 */
export default class CompanySearchPage extends React.Component {

componentWillMount() {
    const script = document.createElement("script");
    script.src = "/js/custom.js";
    script.async = true;
    document.body.appendChild(script);
    }
    render() {
        return (

           <div className="navbarwhite">
	           <Header />
	           <div className="container-fluid  search_companies">
		         <div className="row all_boxcolor1 select_box1">
		            <div>
		               <div  id="companies_header1" className="callbacks_container">

		                  <ul className="rslides" id="slider3">
		                     <li>
		                        <div className="banner-text-info">
		                           <form className="example" Method="POST" action="#">
		                              <input type="text" placeholder="Search for a Company..." name="search"/>
		                              <button type="submit">SEARCH</button>
		                           </form>
		                        </div>
		                     </li>
		                  </ul>
		               </div>
		            </div>
		         </div>
		         <div className="clearfix"> </div>
		      </div>
		       <div className="company_section" id="companies1">


         <CompanyComponent />

         <CompanyComponent />

         <CompanyComponent />

         <CompanyComponent />

         <CompanyComponent />


         <div className="container pagination_text">
            <div className=" col-md-4">
               <p>Showing 1 to 10 of 50 records</p>
            </div>
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
               <ul className="pagination pagination-lg">
                  <li className="disabled"><a href="#"><i className="fa fa-angle-left">«</i></a></li>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#"><i className="fa fa-angle-right">»</i></a></li>
               </ul>
            </div>
            <div className="clearfix"> </div>
         </div>
      </div>

	           <Footer />
           </div>

        );
    }


}


/*
<div className="container box2 ">
   <div className="row all_boxcolor1 select_box">
      <div className="dropdown_width_equal">
         <div className=" col-md-3  ">
            <select id="multi-select-demo" multiple="multiple">
               kjekrw
               <option value="">Industry </option>
               <option value="Banking & Financial ">Banking & Financial </option>
               <option value="Services">Services</option>
               <option value="Manufacturing">Manufacturing</option>
               <option value="Construction">Construction tricks</option>
            </select>



         </div>
      </div>
      <div className="dropdown_width_equal">
         <div className=" col-md-3 ">
            <select id="multi-select-demo1" multiple="multiple">
               kjekrw
               <option value="">jobs </option>
               <option value="Construction">Construction</option>
               <option value="Sales">Sales</option>
               <option value="Manufacturing">Manufacturing</option>
            </select>
         </div>
      </div>
      <div className="dropdown_width_equal">
         <div className=" col-md-3 ">
            <select id="multi-select-demo2" multiple="multiple">
               kjekrw
               <option value="" >Size </option>
               <option value="1 - 10">1 - 10</option>
               <option value="11 - 50">11 - 50</option>
               <option value="51 - 200">51 - 200</option>
               <option value="201 - 1500">201 - 1500</option>
               <option value="1501 - 5000">1501 - 5000</option>
               <option value="5001">5001</option>
            </select>
         </div>
      </div>
      <div className="dropdown_width_equal">
         <div className=" col-md-3 ">
            <select id="multi-select-demo3" multiple="multiple">
               kjekrw
               <option value="" defaultValue>location </option>
               <option value="Tijuana,Mexico">Tijuana,Mexico</option>
            </select>
         </div>
      </div>
   </div>
   <div className="clearfix"> </div>
</div>
*/
