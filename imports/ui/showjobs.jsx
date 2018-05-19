import React from "react";
import JobPosting from "../ui/components/jobPosting.jsx";
import { JobAds } from "../api/data/jobads.js";
import { withTracker } from "meteor/react-meteor-data";
import ShowJobComponent from "../ui/components/showJobComponent.jsx";
import Header from "./pages/header.jsx";

class ShowJobs extends React.Component {



  render() {

    if (!this.props.isReady) {
        return <h2>Loading...</h2>;
    }

    const RenderedItems = this.props.jobads.map(function(jobad){
      return <ShowJobComponent key={jobad._id} item={jobad} />
    });
    var message;
    if(RenderedItems.length < 1){
      message = <h2>No Jobs Available right now.</h2>
    }else{
      message = '';
    }

    return(
        <div>
          <div className="navbarwhite"><Header /></div>
          <div className="container-fluid  search_companies">
          <div className="row all_boxcolor1 select_box1">
          <div  id="companies_header1" className="callbacks_container">
            <ul className="rslides" id="slider3">
               <li>
                    <h2>{this.props.numberofjobs} Ofertas de empleo</h2>
            {message}
            {RenderedItems}
          
        </li>
      </ul>
        </div>
      </div>
      </div>
    </div>
      )
  }
}


export default withTracker(() => {
   var handle = Meteor.subscribe("JobAds");


   return {
     isReady: handle.ready(),
     jobads: JobAds.find({}).fetch(),
     numberofjobs: JobAds.find({}).count(),
   };
})(ShowJobs);
