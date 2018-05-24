import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import i18n from "meteor/universe:i18n";
import HomePageSearch from "../components/home-page-search.jsx";
/* The home page of the site.
 */

const T = i18n.createComponent();

export default class HomePage extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div className="banner">
					<div className="banner-info">
						<div className="banner-text">
							<div id="top" className="callbacks_container">
								<ul className="rslides" id="slider3">
									<li>
										<div className="banner-text-info">
											<h1>
												<T>
													common.homePage.mainBanner
												</T>
											</h1>
											<HomePageSearch />
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="welcome  welpad">
					<div className="container  des-top-view">
						<div className="col-md-8 ">
							<div>
								<img
									className="img-responsive"
									src="images/home-img-2.png"
								/>
							</div>
						</div>
						<div className="col-md-4 ">
							<div className="great-job-hm">
								<h1>
									<T>common.homePage.findjob_part1</T> <br />{" "}
									<T>common.homePage.commonLine</T>{" "}
								</h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									<T>common.homePage.findjob_text</T>
								</h4>
							</div>
							<div className="titlestar  ">
								<center>
									<a
										href="/jobs"
										className="button out-butt-dark  "
									>
										<T>common.homePage.jobsButton</T>
									</a>
								</center>
							</div>
						</div>

						<div className="clearfix" />
					</div>

					{/* =====mobile view show====  */}

					<div className="container  mobile-view-box">
						<div className="col-md-4 ">
							<div className="great-job-hm">
								<h1>
									<T>common.homePage.findjob_part1</T> <br />{" "}
									<T>common.homePage.commonLine</T>{" "}
								</h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									<T>common.homePage.findjob_text</T>
								</h4>
							</div>
							<div className="titlestar  ">
								<center>
									<a
										href="/jobs"
										className="button out-butt-dark  "
									>
										<T>common.homePage.jobsButton</T>
									</a>
								</center>
							</div>
						</div>
						<br />
						<br />
						<div className="col-md-8 ">
							<div>
								<center>
									{" "}
									<img
										className="img-responsive"
										src="images/mobile-1.png"
									/>
								</center>
							</div>
						</div>

						<div className="clearfix" />
					</div>
					{/* ====mobile view show  end==== */}
				</div>

				{/*  find great employer */}

				<div className="welcome  welpad   back-hm-sect-colr">
					<div className="container  blu-section-desc">
						<div className="col-md-5 ">
							<div className="great-emp-hm">
								<h1>
									<T>common.homePage.findemp_part1</T> <br />
									<T>common.homePage.findemp_part2</T>{" "}
								</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									<T>common.homePage.findemp_text</T>
								</h4>
							</div>
							<div className="companies-btn  ">
								<center>
									<a
										href="/companies"
										className="button out-bodr  "
									>
										<T>common.homePage.companiesButton</T>
									</a>
								</center>
							</div>
						</div>
						<div className="col-md-7 ">
							<div>
								<img
									className="img-responsive"
									src="images/home-img-1.png"
								/>
							</div>
						</div>
						<div className="clearfix" />
					</div>

					{/* ===mobile view blue section==== */}

					<div className="container  blu-mobile-sect">
						<div className="col-md-5 ">
							<div className="great-emp-hm">
								<h1>
									<T>common.homePage.findemp_part1</T> <br />
									<T>common.homePage.findemp_part2</T>{" "}
								</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									<T>common.homePage.findemp_text</T>
								</h4>
							</div>
							<div className="companies-btn  ">
								<center>
									<a
										href="/companies"
										className="button out-bodr  "
									>
										<T>common.homePage.companiesButton</T>
									</a>
								</center>
							</div>
						</div>
						<br />
						<br />
						<div className="col-md-7 ">
							<div>
								<center>
									{" "}
									<img
										className="img-responsive"
										src="images/mobile-2.png"
									/>
								</center>
							</div>
						</div>
						<div className="clearfix" />
					</div>
				</div>

				{/* 2 cards section */}
				<div className="welcome  welpad  back-hm-community">
					<div className="container">
						<div className="col-md-12 ">
							<center>
								<div className="hover panel-hm">
									<div className="front">
										<div className="frontTitle">
											<T>common.homePage.hear</T>
											<br />
											<T>common.homePage.community</T>
										</div>
										<div className="frontLogo isas" />
										<div className="frontLocation">
											<T>common.homePage.hear_text</T>
										</div>
										<br />
										<div className="fl-ri-re">
											<a
												href={Meteor.absoluteUrl(
													"write-review/",
													{ secure: true }
												)}
												className="btn btn-primary"
											>
												{" "}
												<i
													className="fa fa-plus"
													aria-hidden="true"
												/>&nbsp;{" "}
												{i18n.__(
													"common.homePage.add_review_button"
												)}{" "}
											</a>
										</div>
										<br />
									</div>
								</div>

								<div className="hover panel-hm">
									<div className="front">
										<div className="frontTitle">
											<T>
												common.homePage.get_fair_salary
											</T>{" "}
											<br />
											<T>common.homePage.your_work</T>
										</div>
										<div className="frontLogo boisedigital" />
										<div className="frontLocation">
											<T>
												common.homePage.fairsalary_text
											</T>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
										<br />
										<div className="fl-ri-re">
											<a
												href={Meteor.absoluteUrl(
													"submit-salary-data/",
													{ secure: true }
												)}
												className="btn btn-primary"
											>
												{" "}
												<i
													className="fa fa-plus"
													aria-hidden="true"
												/>&nbsp;{" "}
												{i18n.__(
													"common.homePage.salary_button"
												)}{" "}
											</a>
										</div>
										<br />
									</div>
								</div>
							</center>
						</div>

						<div className="clearfix" />
					</div>
				</div>

				{/* services */}
				<div className="star" id="services">
					<div className="container">
						<div className="row">
							<div className="col-md-1" />
							<div className="col-md-8">
								<center>
									{" "}
									<h1 className="titlestar">
										<T>
											common.homePage.discover_employers
										</T>{" "}
									</h1>
								</center>
							</div>
							<div className="col-md-2">
								<div className="titlestar">
									<center>
										{" "}
										<a
											href="/register"
											className="button out-butt-dark"
										>
											<T>common.homePage.signup_button</T>
										</a>
									</center>
								</div>
							</div>
							<div className="col-md-1" />
						</div>
						<div className="clearfix" />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

/*
             <div className="welcome  welpad">
         <div className="container">
            <div className="col-md-12 welcome-text wtext-right">
               <h1>Find an employer that treats you right</h1>
            </div>

            <div className="col-md-12 welcome-text wtext-right">
               <h2>Vize helps you discover employers based on different industries, job sizes, and company size. The companies are compared based on ratings and reviews</h2>
            </div>
            <div className="col-md-12 welcome-text wtext-left">
               <div className="titlestar">
                  <a href="/companies" className="button out-butt-dark">Companies</a>
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>
      </div>

       <div className="clearfix"> </div>
        <div className="container">
         <div className="col-md-4  ">
            <div  className="#">
            </div>
         </div>
         <div className="col-md-8  ">
            <div  className="alisetright  homlaptopimg">
               <img src="images/laptopimg.jpg"  className="img-responsive"/>
            </div>
         </div>
         <div className="clearfix"> </div>
      </div>



           <div className="sectslider">
         <div className="container">
            <div className="row">
               <div className="col-md-3  title3">
                  <hr/>
               </div>
               <div className="col-md-6">
                  <p className="title1 few-txt">A few companies using
                     JobAdvisor
                  </p>
               </div>
               <div className="col-md-3  title3">
                  <hr/>
               </div>
            </div>
            <div className="slid-row11">
               <div className="col-md-3 losize">
                  <img src="/images/l1.png " className="img-responsive"/>
               </div>
               <div className="col-md-3  losize">
                  <img src="/images/l2.png"/>
               </div>
               <div className="col-md-3 losize">
                  <img src="/images/l3.png"/>
               </div>
               <div className="col-md-3  losize">
                  <img src="/images/l4.png"/>
               </div>
               <div className="clearfix"> </div>
            </div>
         </div>
      </div>
          <div className="star" id="services">
         <div className="container">
            <div className="row">
               <div className="col-md-1">
               </div>
               <div className="col-md-8">
                  <h1 className="titlestar">Start discovering new employers now  </h1>
               </div>
               <div className="col-md-2">
                  <div className="titlestar">
                     <a className="button out-butt-dark">SIGN UP</a>
                  </div>
               </div>
               <div className="col-md-1">
               </div>
            </div>
            <div className="clearfix"> </div>
         </div>
      </div> */
