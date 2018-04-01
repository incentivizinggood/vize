import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx"; 

/* The Company Profile  page of the site. */

export default class CompanyProfile extends React.Component {
    render() {
        return(
         <div className="customcompanypage"><Header />
         <div className="container-fluid box-search companyprofilepage ">
         <div className="row all_boxcolor1 select_box1">
            <div>
               <div  id="companies_header1" className="callbacks_container">
                  <ul className="rslides" id="slider3">
                     <li>
                        <div className="banner-text-info">
                           <form className="example" action="#">
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
       <div className="welcome  welpadgo wel_profile">
         <div className="container  welpad12 box_shadow">
            <div className="col-md-2  prostar">
               <img src="images/p5.jpg"  className="img-responsive  hi"/>
            </div>
            <div className="col-md-6  prostar">
               <div className="col-md-12">
                  <fieldset className="rating">
                     <input type="radio" id="star5" name="rating" value="5" />
                     <label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                     <input type="radio" id="star4half" name="rating" value="4 and a half" />
                     <label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                     <input type="radio" id="star4" name="rating" value="4"/>
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
                     <span className="headingoo">Google</span>  
                  </fieldset>
                  <label className="renum">(5.0/5.0)</label>
               </div>              
               <div  className="col-md-12 comp-prfl">
                  <p><i className="fa fa-map-marker" aria-hidden="true"></i> Mountain  View, CA</p>
				  <p><i className="fa fa-flask" aria-hidden="true"></i> Science & Technology</p>
				  <p><i className="fa fa-globe" aria-hidden="true"></i> www.google.com</p>
                  <p><i className="fa fa-users" aria-hidden="true"></i>  Size 1501-5000</p>
               </div>
            </div>
  
            <div className="col-md-4 prostar">
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
      </div>
      <div className="tabs1">
         <div className="container tab_background ">
            <div className="">
            <div className=" tab_bg bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
               <div className="tabpanel tabpanel_fullwidth ">
                  <ul id="myTab" className="nav nav-tabs nav-justified " role="tablist">
                     <li role="presentation" className="active"><a href="#home" id="home-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">Overview</a></li>
                     <li role="presentation"><a href="#profile" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile">Working With Us</a></li>
                     <li role="presentation"><a href="#profile1" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile">Reviews</a></li>
                     <li role="presentation"><a href="#profile2" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile">Jobs</a></li>
                     <li role="presentation"><a href="#profile3" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile">Contact</a></li>
                  </ul>
               </div>
               <div id="myTabContent" className="tab-content">
                  <div role="tabpanel" className="tab-pane fade in active  t1" id="home" aria-labelledby="home-tab">
                     <h3 className="tab_section">Lorem Ipsum is simply dummy text of the printing and typesetting </h3>
                     <p className="profile_ptext">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                     <p className="profile_ptext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                     
                  </div>
                  <div role="tabpanel" className="tab-pane fade t1" id="profile" aria-labelledby="profile-tab">
                     <h3 className="tab_section">Lorem Ipsum is simply dummy text of the printing and typesetting </h3>
                     <p className="profile_ptext">Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                     <p className="profile_ptext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    
                  </div>
                  <div role="tabpanel" className="tab-pane fade t1" id="profile1" aria-labelledby="profile-tab">
                     <h3 className="tab_section">Lorem Ipsum is simply dummy text of the printing and typesetting </h3>
                     <p className="profile_ptext">Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                     <p className="profile_ptext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                   
                  </div>
                  <div role="tabpanel" className="tab-pane fade t1" id="profile2" aria-labelledby="profile-tab">
                     <h3 className="tab_section">Lorem Ipsum is simply dummy text of the printing and typesetting </h3>
                     <p className="profile_ptext">Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                     <p className="profile_ptext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                   
                  </div>
                  <div role="tabpanel" className="tab-pane fade t1" id="profile3" aria-labelledby="profile-tab">
                     <h3 className="tab_section">Lorem Ipsum is simply dummy text of the printing and typesetting </h3>
                     <p className="profile_ptext">Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                     <p className="profile_ptext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                   
                  </div>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>
         </div>
                  
      </div>
         <Footer /></div>
        )
        }
        }