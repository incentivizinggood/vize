import React from "react";
import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx"; 

/* A page where visitors can get information about Vize and this app.
 */
export default class AboutPage extends React.Component {
    render() {
        return (
            <div><Header />
             <div  id="home" className="banner about-banner">
         <div className="banner-info">       
            <div className="banner-text about">
               <h1>About</h1>
            </div>
         </div>
      </div>

        <div className="about">
         <div className="container">
            <div className="col-md-12">
               <h1 className="al">The Problem</h1>               
               <h3 className="emplh3">EMPLOYEES DON'T HAVE LEVERAGE</h3>
            </div>
            <div className="col-md-12 ">
               <div className="about-row">
                  <p>To fill large orders in a timely manner and get enough business to survive as a company, factories cuts corners, working their employees beyond their limits and not taking the time to ensure that the job is safe.
                     In highly developed legal systems this would be stopped by the police and enforced with legislation that protects workers' labor rights. In most developing countries, such legislation either doesn't exist or they lack the capacity to enforce it.
                     In short, factories have every incentive to cut corners, and no incentive to be held accountable to their employees. So how do we increase the leverage that workers have in this circumstance? 
                  </p>
               </div>
               <div className="clearfix"> </div>
            </div>
         </div>
      </div>

       <div className="about  bl">
         <div className="container">
            <div className="col-md-12  cdoun">
               <h1 className="al">Our Solution</h1>
             
               <h3 className="emplh3">REVIEWS ARE A FORM OF ACCOUNTABILITY</h3>
            </div>
            <div className="col-md-12 ">
               <div className="about-row">
                  <p>To provide employees in developing countries with more leverage, we're creating a platform for workers to share reviews of their working conditions with all other workers in their region. This will give workers the information they need to avoid factories with terrible working conditions. Factories with poor reviews will get fewer workers, thus be unable to fill large orders from buyers, and lose profits. This will create a direct incentive for factories to improve conditions based on feedback coming directly from the workers themselves. </p>
               </div>
               <div className="clearfix"> </div>
            </div>
         </div>
      </div>

       <div  className="cont about-cont">
         <div className="container">
            <div className="container-contact100">
               <div className="wrap-contact100">
                  <form method="POST"  action="#" className="contact100-form validate-form">
                     <span className="contact100-form-title">
                     Feel free to reach out to us
                     </span>
                     <div className="wrap-input100 rs1 validate-input">
                        <input id="first-name" className="input100" type="text" name="first-name" placeholder="Your Name"/>
                        <span className="focus-input100"></span>
                     </div>
                     <div className="wrap-input100 rs1 validate-input">
                        <input id="email" className="input100" type="text" name="email" placeholder="Eg. example@email.com"/>
                        <span className="focus-input100"></span>
                     </div>
                     <div className="wrap-input100 validate-input">
                        <textarea id="message" className="input100" name="message" placeholder="Please enter your comments..."></textarea>
                        <span className="focus-input100"></span>
                     </div>
                     <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn">
                        <span>
                        Submit
                        <i className="zmdi zmdi-arrow-right m-l-8"></i>
                        </span>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
        
            <Footer /></div>
        );
    }
}
