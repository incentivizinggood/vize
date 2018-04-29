import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx"; 


/* A page Foremployers  */

export default class ForEmployers extends React.Component
{
	render(){
				return (
                         <div>
                         <Header />
                         <div className="employer">
                         <div className="banner-info">		
				             <div className="banner-text">
                               <div  id="top" className="callbacks_container">
								 <ul className="rslides" id="slider3">
									         <li>
									        <div className="banner-text-info">
									        <h1>Attract more workers to optimize for workforce</h1>				
											   <form className="example" method="POST" action="#">
			                                   <input type="text" placeholder="Search for a company..." name="search"/>
			                                   <button type="submit">SEARCH</button>
			                                   </form>
											</div>
									</li>
									
								</ul>
							</div>
				             </div>	
		                 </div>
		                 </div>
                         <div className="welcome welpad">
						   <div className="container">
						      <div className="col-md-12 ">
						         <h1>Give yourself the best chance</h1>
						      </div>
						     
						      <div className="col-md-12 ">
						         <h2>JobAdvisor helps you discover which employers exist and compare them side by side. Apply for jobs, let them know you're interested, or simply follow the ones you like to add them to your short-list. </h2>
						      </div>
						      <div className="col-md-12 ">
						         <div className="more more2">
						            <div className="titlestar">
						               <a href="#" className="button out-butt-dark">TAKE A LOOK</a>
						            </div>
						          
						         </div>
						      </div>
						      <div className="clearfix"> </div>
						   </div>
						   <div className="container for-emp-right">
						      <div className="col-md-4  ">
						         
						      </div>
						      <div className="col-md-8  ">
						         <div  className="alisetright">					
						            <img src="images/laptopimg.jpg"  className="img-responsive"/>
						         </div>
						      </div>
						      <div className="clearfix"> </div>
						   </div>
						</div>
                         
                         <Footer /></div>
				       );
         
            }

}

