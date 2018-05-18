import React from "react";
import JobPosting from "../ui/components/jobPosting.jsx";
import { JobAds } from "../api/data/jobads.js";
import { withTracker } from "meteor/react-meteor-data";
import ShowJobComponent from "../ui/components/showJobComponent.jsx";

class ShowJobs extends React.Component {



  render() {
    console.log(this.props);
    
    if (!this.props.isReady) {
        return <h2>Loading...</h2>;
    }
    console.log(this.props);
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
          <p>In the jobs page!</p>

              {/* <div  className="ava_job ">
                <h4  className="head_section_font">{this.props.jobsCount} Job(s) Available</h4>
              </div> */}

            {message}
            {RenderedItems}
        </div>
      )
  }
}


export default withTracker(() => {
   var handle = Meteor.subscribe("JobAds");


   return {
     isReady: handle.ready(),
     jobads: JobAds.find({}).fetch(),
   };
})(ShowJobs);
