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
        event.preventDefault();
        $(document).ready(function(){
            $('#live-chat header').on('click', function() {
                $('.chat').slideToggle(300, 'swing');
            });
            $('.chat-close').on('click', function(e) {
                $('#live-chat').fadeOut(300);
            });
        });
    }


    render() {
    return (
        <div>
            <div id="live-chat">
                <header className="clearfix">
                    <a href="#" className="chat-close" onClick={this.buttonClicked}>x</a>
                    <h4>Live feedback</h4>
                    <span className="chat-message-counter">3</span>
                </header>
                <div className ="chat">
                    <p className = "chat-feedback">Send us immediate feedback using this chat</p>
                    <form action="#" method="post">
                        <fieldset>
                            <textarea rows="4" cols="40" placeholder = "Type your message…" className = "dialog_button" autoFocus="true"/>
                            <input type="hidden"/>
                        </fieldset>
                        <button type="submit" className = "sendMessage" form ="submitForm" value ="Submit"> send message </button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}
