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
			var chatWidget = (".chat-widget-container"),
				chatBox = $(".chat-box-container");
			$(chatWidget).click(function(e){
				e.preventDefault();
				$(chatBox).toggleClass("show");
				$(chatWidget).toggleClass("open");
			})
		});
	}

	render() {
		return (
			<div className="chat-widget-wrapper" onClick={this.buttonClicked}>
				<div className="chat-widget-container">
					<div className="chat-widget-text">
						<p className="heading">Quick Feedback</p>
						<p>Reach out to us by clicking here
						</p>
					</div>
				</div>
				<div className="chat-box-container">
					<div className="chat-box-nav">
						<p className="heading-2"> What's on your mind?</p>
					</div>
					<div className="chat-box-content">
						<form action="" className="chat-box-form">
							<textarea rows="4" cols="30" placeholder = "Please type your message here… Thank you!" className="textbox-content"> </textarea>
							<br/>

							<div className="send-button">
								<button type="submit" className="btn btn-outline-info" form ="submitForm" value ="Submit"> send message </button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

