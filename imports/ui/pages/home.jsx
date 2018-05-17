import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import TotalsCounter from "../totals-counter.jsx";
import Dialog from "../../ui/pages/dialog-box.jsx";
/* The home page of the site.
 */
export default class HomePage extends React.Component {
    render() {
        return(
                <div><Header />
                  <div className="banner">
                  <div className="banner-info">

                 <div className="banner-text">
               <div  id="top" className="callbacks_container">
                  <ul className="rslides" id="slider3">
                     <li>
                        <div className="banner-text-info">
                           <h1>Find the best job for you, from people like you</h1>
                           <form className="example" method="POST" action="#">
                              <input type="text" placeholder="Search..." name="search"/>
                              <button type="submit">SEARCH</button>
                           </form>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
                </div>
                </div>


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
          </div>
    <Footer />
                            <Dialog />
                </div>

        );
    }
}
