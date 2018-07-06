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
						We make it simple and seamless forbussiness and people to talk to each other. Ask us anything.
					</main>
					<footer className="chatbox-popup__footer">
						<aside style={{flex:"1",color:"#888", text:"center"}}>
						</aside>
						<aside style={{flex:"10"}}>
							<textarea type="text" placeholder="Type your message here..." autofocus/>
						</aside>
						<aside style={{flex:"1",color:"#888", text:"center"}}>
							<i className="fa fa-paper-plane" aria-hidden="true"/>
						</aside>
					</footer>
				</section>
			</div>
		);
	}
}

