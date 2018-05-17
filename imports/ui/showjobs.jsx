import React from "react";
import JobPosting from "../../ui/components/jobPosting.jsx";

export default class ShowJobs extends React.Component {

  render() {

    // const RenderedItems = this.props.jobAds.map(function(item, i){
    //   return <JobPosting key ={i} item = {item}/>
    // });

      return(
        <div>
          <p>In the jobs page!</p>

              {/* <div  className="ava_job ">
                <h4  className="head_section_font">{this.props.jobsCount} Job(s) Available</h4>
              </div> */}


            {/* {RenderedItems} */}
        </div>
      )
    }
    }
