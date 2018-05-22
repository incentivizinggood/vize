import React from "react";
/* The "header" page. */
export default class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="col-md-3 footer-grids">
						<h4>Vize</h4>
						<ul className=" footer_nav navigation1 ">
							<li>
								<a href="/about">About Us</a>
							</li>
						</ul>
					</div>
					<div className="col-md-3 footer-grids">
						<h4>Employers</h4>
						<ul className=" footer_nav navigation2">
							{/*<li><a href="#">Pricing</a></li>*/}
							<li>
								<a href="/register">
									Create a Free Employer Account
								</a>
							</li>
							{/*<li><a href="#">Post a Job</a></li>*/}
						</ul>
					</div>
					{/*<div className="col-md-3 footer-grids">
               <h4>Community</h4>
               <ul className=" footer_nav navigation3">
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Guidelines</a></li>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Privacy & Cookies</a></li>
               </ul>
            </div>
            <div className="col-md-3 footer-grids">
               <h4>Community</h4>
               <ul className=" footer_nav navigation4">
                  <li><a href="#">Privacy & Cookie Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Subscription Services</a></li>
                  <li><a href="#">Community Standards</a></li>
                  <li><a href="#">Help</a></li>
               </ul>
            </div>*/}
					<div className="clearfix"> </div>
					<div>
						<div className="container">
							<div className="col-md-12">
								<div className="footer-bottom">
									{/*<a href="#"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-twitter-square" aria-hidden="true"></i></a> */}
								</div>
							</div>
						</div>
					</div>
					<div className="footer-copy">
						<p>Vize © 2018. All rights reserved</p>
					</div>
				</div>
			</div>
		);
	}
}
