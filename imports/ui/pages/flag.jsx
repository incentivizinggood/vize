import React from "react";
import { Meteor } from 'meteor/meteor'
import "../../api/data/methods.js";
import { Email } from 'meteor/email'
import {Accounts} from "meteor/accounts-base";

/* The page where users write/edit their reviews.
 */




export default class FlagSystem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value:'',
            count: 0,
        };
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }



    handleSubmit(event) {
        alert("sent1" + ": " + this.state.value);
        alert("sent2" + ": " + this.state.name);

        //this.setState({selectedOption: event.target.selectedOption});
        //this.state.selectedOption = "option1";



        // //Client: Asynchronously send an email.
        Meteor.call(
            "sendEmail",
            "perfectpud@yahoo.com",
            "udjiogan@yahoo.com",
            "Hello from Meteor!",
            "This is a test of Email.send.",
            (err,res) => {
                if (err) {
                    console.log("Error:");
                    console.log(err);
                } else {
                    console.log("Good:");
                    console.log(res);
                }
            }
        );

        // sending
        // Email.send({
        //     to: "perfectpud@yahoo.com",
        //     from: "perfectpud@yahoo.com",
        //     subject: "Example Email",
        //     text: "The contents of our email in plain text."
        // });

        // if (Meteor.isServer) {
        //     Email.send({
        //         from: "perfectpud@yahoo.com",
        //         to: "perfectpud@yahoo.com",
        //         subject: "Subject",
        //         text: "Here is some text"
        //     });
        // }

        // if (Meteor.isServer) {
        //
        //     Meteor.startup( function() {
        //         process.env.MAIL_URL =
        //             "***REMOVED***";
        //
        //         Email.send({
        //             to: "perfectpud@yahoo.com",
        //             from: "perfectpud@yahoo.com",
        //             subject: "Meteor Email",
        //             text: "The email content..."
        //         });
        //     });
        // }

        alert("wassup");

        event.preventDefault();
    }

    handleOptionChange(event) {
        // alert("ground");
        //this.setState({value: event.target.value});
        this.setState({name: event.target.value})


        // this.setState({selectedOption: event.target.selectedOption});
        // alert('Submitted: ' + this.state.selectedOption);
        // event.preventDefault();
        // onChange={this.handleOptionChange}
        // this.setState({value: event.target.value});
    }
    handleTextChange(event) {
        // alert("ground");
        this.setState({value: event.target.value});

        //this.setState({selectedOption: event.target.selectedOption});
    }
    countUp(event) {
        this.setState({
            count: this.state.count + 1
        });
    }
    countDown(event) {
        this.setState({
            count: this.state.count - 1
        });
    }


    render() {
        return (
            <div className="system flag">
                <h1>Flag system  <span >&#9872;</span> </h1>
                <br/>
                <br/>
                <button onClick={this.countUp.bind(this)}> up </button>
                <button onClick={this.countDown.bind(this)}> down </button>
                <label> {"Counter: " + this.state.count}</label>
                <br/>
                <br/>
                <a href="#modal" class="modal-trigger">Push</a>
                <div class="modal" id="modal">
                    <div class="modal__dialog">

                        /* Section begins here */
                        <section class="modal__content">
                            <header class="modal__header">
                                <h2 class="modal__title">Report comment</h2>
                                <a href="#" class="modal__close">&times;</a>
                            </header>

                            <form onSubmit={this.handleSubmit} id="submitForm">
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="option1" name= "sexual content" onChange={this.handleOptionChange} />
                                        Not true
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="option2" name= "sexual content" onChange={this.handleOptionChange} />
                                        not even the case
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" value="option3" name= "sexual content" onChange={this.handleOptionChange} />
                                        completely false
                                    </label>
                                </div>

                                <div>
                                    <label> {"Please let us know why you picked" + ": " + this.state.name}</label>
                                    <textarea rows="4" cols="50" class="textBox-flag" placeholder={"Thank you..."} onChange={this.handleTextChange} />
                                </div>
                            </form>

                            <footer class="modal__footer">
                                <button type="button" className="">Cancel</button>
                                <button type="submit" className="done-button" form="submitForm" value="Submit">SUBMIT</button>
                            </footer>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}


// // Server: Define a method that the client can call.
// Meteor.methods({
//     sendEmail(to, from, subject, text) {
//         Email.send({ to, from, subject, text });
//     }
// });







