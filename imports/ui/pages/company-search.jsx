import React from "react";
import CompanySearchControls from "../company-search-controls.jsx";
import CompaniesList from "../companies-list.jsx";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";



/* TODO: Transform queryParams to a database query and pass that to CompaniesList.
         Initalize CompanySearchControls with queryParams.
*/

/* The page where users can search/browse companies.
 */
export default class CompanySearchPage extends React.Component {
    render() {
        return (

           <div className="customcompanypage">
	           <Header />
	           <div className="container-fluid  search_companies">
		         <div className="row all_boxcolor1 select_box1">
		            <div>
		               <div  id="companies_header1" className="callbacks_container">

		                  <ul className="rslides" id="slider3">
		                     <li>
		                        <div className="banner-text-info">
		                           <form className="example" method="POST" action="#">
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

   <div className="container box2 all_boxcolor">
            <div className="container  welpad1">
               <div className="col-md-3  prostar">
                  <a href="/companyprofile">
                     <div  className="shdo">
                        <img src="images/p5.jpg"  className="img-responsive"/>
                     </div>
                  </a>
               </div>
               <div className="col-md-4  prostar">
                  <label className="goo"><a href="/companyprofile">Google</a></label>
                  <div className="col-md-12 comp-class">
                     <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" />
                        <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                        <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                        <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                        <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                        <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" />
                        <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                     </fieldset>
                     <label className="renum">(5.0/5.0)</label>
                  </div>
                  <br/>
                  <div  className="col-md-12 comp-class">
                     <div  className="locahed">
                        <h4><i className="fa fa-map-marker" aria-hidden="true"></i><span> Mountain  View, CA</span></h4>
                        <h4><i className="fa fa-flask" aria-hidden="true"></i> <span>Science & Technology</span></h4>
                        <h4><i className="fa fa-users" aria-hidden="true"></i> <span>Size 1501-5000</span></h4>
                     </div>
                  </div>
               </div>
               <div className="col-md-5 prostar">
                  <div  className="col-md-12">
                     <div className="titlestar">
                        <div className="" data-toggle="buttons">
                           <label className="btn btn-lg btn-success active btn_follow1">
                           <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                           <i className="fa fa-check"></i> Following
                           </label>
                           <label className="btn btn-lg btn-danger btn_follow1">
                           <input type="radio" name="options" id="option" autoComplete="off"/>
                           Follow
                           </label>
                        </div>
                        <a href="/write-review" className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
            <div  className="container  welpad1">
               <div  className="col-md-3">
                  <div  className="reviews1">
                     <ul>
                        <li className="active"><a href="#">8.2K <br/><span className="review_text">Reviews</span></a></li>
                        <li><a href="#">17K <br/><span className="review_text">Salaries</span></a></li>
                        <li><a href="#">8.0K <br/><span className="review_text">Interviews</span></a></li>
                     </ul>
                  </div>
               </div>
               <div  className="col-md-9">
                  <div className="pargrf">
                     <p>LORM is a public association bringing together deafblind people, their families, friends, and others concerned with deafblindness and the problems associated with it. At present, LORM has about 200 members and maintains </p>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>

                 <div className="container box2 all_boxcolor">
            <div className="container  welpad1">
               <div className="col-md-3  prostar">
                  <div  className="shdo">
                     <a href="/companyprofile"><img src="images/p5.jpg"  className="img-responsive"/></a>
                  </div>
               </div>
               <div className="col-md-4  prostar">
                  <label className="goo"> <a href="/companyprofile">Google</a></label>
                  <div className="col-md-12 comp-class">
                     <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" />
                        <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                        <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                        <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                        <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                        <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" />
                        <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                     </fieldset>
                     <label className="renum">(5.0/5.0)</label>
                  </div>
                  <br/>
                  <div  className="col-md-12 comp-class">
                     <div  className="locahed">
                        <h4><i className="fa fa-map-marker" aria-hidden="true"></i><span> Mountain  View, CA</span></h4>
                        <h4><i className="fa fa-flask" aria-hidden="true"></i> <span>Science & Technology</span></h4>
                        <h4><i className="fa fa-users" aria-hidden="true"></i> <span>Size 1501-5000</span></h4>
                     </div>
                  </div>
               </div>
               <div className="col-md-5 prostar">
                  <div  className="col-md-12">
                     <div className="titlestar">
                        <div className="" data-toggle="buttons">
                           <label className="btn btn-lg btn-success active btn_follow1">
                           <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                           <i className="fa fa-check"></i> Following
                           </label>
                           <label className="btn btn-lg btn-danger btn_follow1">
                           <input type="radio" name="options" id="option" autoComplete="off"/>
                           Follow
                           </label>
                        </div>
                        <a href="#" className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
            <div  className="container  welpad1">
               <div  className="col-md-3">
                  <div  className="reviews1">
                     <ul>
                        <li className="active"><a href="#">8.2K <br/><span className="review_text">Reviews</span></a></li>
                        <li><a href="#">17K <br/><span className="review_text">Salaries</span></a></li>
                        <li><a href="#">8.0K <br/><span className="review_text">Interviews</span></a></li>
                     </ul>
                  </div>
               </div>
               <div  className="col-md-9">
                  <div className="pargrf">
                     <p>LORM is a public association bringing together deafblind people, their families, friends, and others concerned with deafblindness and the problems associated with it. At present, LORM has about 200 members and maintains </p>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>

         <div className="container box2 all_boxcolor">
            <div className="container  welpad1">
               <div className="col-md-3  prostar">
                  <a href="/companyprofile">
                     <div  className="shdo">
                        <img src="images/p5.jpg"  className="img-responsive"/>
                     </div>
                  </a>
               </div>
               <div className="col-md-4  prostar">
                  <label className="goo"><a href="/companyprofile">Google</a></label>
                  <div className="col-md-12 comp-class">
                     <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" />
                        <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                        <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                        <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                        <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                        <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" />
                        <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                     </fieldset>
                     <label className="renum">(5.0/5.0)</label>
                  </div>
                  <br/>
                  <div  className="col-md-12 comp-class">
                     <div  className="locahed">
                        <h4><i className="fa fa-map-marker" aria-hidden="true"></i><span> Mountain  View, CA</span></h4>
                        <h4><i className="fa fa-flask" aria-hidden="true"></i> <span>Science & Technology</span></h4>
                        <h4><i className="fa fa-users" aria-hidden="true"></i> <span>Size 1501-5000</span></h4>
                     </div>
                  </div>
               </div>
               <div className="col-md-5 prostar">
                  <div  className="col-md-12">
                     <div className="titlestar">
                        <div className="" data-toggle="buttons">
                           <label className="btn btn-lg btn-success active btn_follow1">
                           <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                           <i className="fa fa-check"></i> Following
                           </label>
                           <label className="btn btn-lg btn-danger btn_follow1">
                           <input type="radio" name="options" id="option" autoComplete="off"/>
                           Follow
                           </label>
                        </div>
                        <a href="#" className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
            <div  className="container  welpad1">
               <div  className="col-md-3">
                  <div  className="reviews1">
                     <ul>
                        <li className="active"><a href="#">8.2K <br/><span className="review_text">Reviews</span></a></li>
                        <li><a href="#">17K <br/><span className="review_text">Salaries</span></a></li>
                        <li><a href="#">8.0K <br/><span className="review_text">Interviews</span></a></li>
                     </ul>
                  </div>
               </div>
               <div  className="col-md-9">
                  <div className="pargrf">
                     <p>LORM is a public association bringing together deafblind people, their families, friends, and others concerned with deafblindness and the problems associated with it. At present, LORM has about 200 members and maintains </p>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>

         <div className="container box2 all_boxcolor">
            <div className="container  welpad1">
               <div className="col-md-3  prostar">
                  <div  className="shdo">
                     <a href="/companyprofile"><img src="images/p5.jpg"  className="img-responsive"/></a>
                  </div>
               </div>
               <div className="col-md-4  prostar">
                  <label className="goo"> <a href="/companyprofile">Google</a></label>
                  <div className="col-md-12 comp-class">
                     <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" />
                        <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                        <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" />
                        <label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                        <label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" />
                        <label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                        <label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" />
                        <label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                        <label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" />
                        <label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" />
                        <label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                     </fieldset>
                     <label className="renum">(5.0/5.0)</label>
                  </div>
                  <br/>
                  <div  className="col-md-12 comp-class">
                     <div  className="locahed">
                        <h4><i className="fa fa-map-marker" aria-hidden="true"></i><span> Mountain  View, CA</span></h4>
                        <h4><i className="fa fa-flask" aria-hidden="true"></i> <span>Science & Technology</span></h4>
                        <h4><i className="fa fa-users" aria-hidden="true"></i> <span>Size 1501-5000</span></h4>
                     </div>
                  </div>
               </div>
               <div className="col-md-5 prostar">
                  <div  className="col-md-12">
                     <div className="titlestar">
                        <div className="" data-toggle="buttons">
                           <label className="btn btn-lg btn-success active btn_follow1">
                           <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                           <i className="fa fa-check"></i> Following
                           </label>
                           <label className="btn btn-lg btn-danger btn_follow1">
                           <input type="radio" name="options" id="option" autoComplete="off"/>
                           Follow
                           </label>
                        </div>
                        <a href="#" className="btn btn-primary  add_review replus"> <i className="fa fa-plus" aria-hidden="true"></i>   Add a Review</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
            <div  className="container  welpad1">
               <div  className="col-md-3">
                  <div  className="reviews1">
                     <ul>
                        <li className="active"><a href="#">8.2K <br/><span className="review_text">Reviews</span></a></li>
                        <li><a href="#">17K <br/><span className="review_text">Salaries</span></a></li>
                        <li><a href="#">8.0K <br/><span className="review_text">Interviews</span></a></li>
                     </ul>
                  </div>
               </div>
               <div  className="col-md-9">
                  <div className="pargrf">
                     <p>LORM is a public association bringing together deafblind people, their families, friends, and others concerned with deafblindness and the problems associated with it. At present, LORM has about 200 members and maintains </p>
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>


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
