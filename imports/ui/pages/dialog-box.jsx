import React from "react";
import { Meteor } from 'meteor/meteor'

/* The "Dialog" page. */
export default class Dialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			value:'',
			count: 0,
		};
		this.buttonClicked = this.buttonClicked.bind(this)

	}
	buttonClicked(event){
		event.preventDefault(); // Prevent the default behavior for this event
		$(document).ready(function(){
			const chatbox = jQuery.noConflict();
			chatbox(() => {
				chatbox(".chatbox-open").click(() =>
					chatbox(".chatbox-popup, .chatbox-close").fadeIn()
				);
				chatbox(".chatbox-close").click(() =>
					chatbox(".chatbox-popup, .chatbox-close").fadeOut()
				);

			});
		});

	}

	sendClicked(event) {
		event.preventDefault();
		alert("waduso");  // Send us an email


		Meteor.call(
			"sendEmail",
			"incentivizinggood@gmail.com",
			"postmaster@incentivizinggood.com",
			`Contacting us: ${this.state.name}`,
			`${"Howdy Vize reader,\n" + "Below is the message: \n"}${
				this.state.textBox
				}.\n\nSincerely,\n\n Vize Inc.\n\n Sender's email: ${
				this.state.emailSending
				}`,
			(err, res) => {
				if (err) {
					console.log("--- BEGIN error:");
					alert("Please try again");
					console.log(err);
					console.log("--- END error");
				} else {
					console.log("--- BEGIN success:");
					console.log(res);
					console.log("--- END success");
					alert("Thank you for the feedback!");
				}
			}
		);

		alert("wassup2");

	}


	render() {
		return (
			<div>
				<button className="chatbox-open">
					<i className="fa fa-comment fa-2x" aria-hidden="true" onClick={this.buttonClicked}/>
				</button>
				<button className="chatbox-close">
					<i className="fa fa-close fa-2x" aria-hidden="true" onClick={this.buttonClicked}/>
					</button>
				<section className="chatbox-popup">
					<header className="chatbox-popup__header">
					</header>
					<main className="chatbox-popup__main">
						Please send us feedback on how to improve below... thank you!
					</main>
					<footer className="chatbox-popup__footer">
						<aside style={{flex:"1",color:"#888", text:"center"}}>
						</aside>
						<aside style={{flex:"10"}}>
							<textarea type="text" placeholder="Type your message here..." autofocus/>
						</aside>
						<aside style={{flex:"1",color:"#888", text:"center"}}>
							<i className="fa fa-paper-plane" aria-hidden="true" onClick={this.sendClicked}/>
						</aside>
					</footer>
				</section>
			</div>
		);
	}
}

