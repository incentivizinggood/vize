import React from "react";
import JobPosting from "../../ui/components/jobPosting.jsx";

export default class JobTab extends React.Component {

  render() {
      return(
        <div role="tabpanel" className="tab-pane" id="jobs">
           <div className="col-md-12  section_rview_back_color03 ">
              <div  className="ava_job ">
                <h4  className="head_section_font">15 Jobs Available</h4>
              </div>
            </div>

            <JobPosting />




                   {/* job section  2 */}

            <div className="col-md-12 section_rview_back_color05 ">
                  <div  className="sect_re11 ">
                 <div >
                    <h4><strong>Software Engineer</strong></h4>
                 </div>
                 <div>
                    <p> <i className="fa fa-map-marker" ></i>&nbsp;&nbsp;&nbsp;San Fransisco California</p>
                    <p> <i className="fa fa-money" ></i>&nbsp;&nbsp;$50-$80/Hour</p>
                    <p> <i className="fa fa-calendar" ></i>&nbsp;&nbsp;Full Time</p>
                 </div>
                   <div  className="fl-ri-app">
                            <button>Apply Now</button>
                          </div>

               <hr />
                 <h4 className="h4-font-sz-job">Job Description</h4>
                 <div  className="h4-font-sz">
                  <article>
                       <p>Egestas mollitia quos metus natus assumenda ullam suscipit ultricies. Voluptas, nihil natoque elementum error ligula exercitatione
                          quuntur turpis eros aut justo qui recusandae eos, soluta repellat ipsa tortor tempus ultricesfermentum! Corporis accusamus dictum! Sapien laboris massa fugit deserunt laboriosam mi consectetur curabitur cum.
                       </p>
                      <input id="read-more-toggle-01" className="read-more-toggle" type="checkbox" />
                       <div className="read-more-content">
                          <br />
                          <h4>Qualifications</h4>
                          <p>-5 Year experience</p>
                          <p>-Masters Degree in computer Science</p>
                          <br />
                          <div>
                             <h4>Responsibilities</h4>
                             <p>-write server-side code for web-based applisations, create robust high-volume production and develop prototypes
                             </p>
                             <p>-Build platform, systems and networking infrastructure using background in distributed system, OS/kernel, network system design and large scale storage systems</p>
                          </div>
                            </div>

                       <label className="read-more-toggle-label" htmlFor="read-more-toggle-01">  </label>
                      <div   className="fl-ri">
                             <p>posted on April 19th, 2018</p>
                          </div>
                    </article>

                        </div>
                      </div>
                         </div>

        </div>
      )
    }
    }
