import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";
import WorkerHeader from "/imports/ui/components/workerHeader.jsx";
import EmployerHeader from "/imports/ui/components/employerHeader.jsx";

const T = i18n.createComponent();

/* The "header" page. */
class Header extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
		if (this.props.user) {
			if (this.props.user.role === "company") return <EmployerHeader />;
			if (this.props.user.role === "worker") return <WorkerHeader />;
		}
		return <WorkerHeader />;
	}
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(Header);
/*
export default withTracker(({ review, userVotes }) => {
	// One of the more ridiculous pieces of code I've had to write
	const userVote = userVotes.findOne({
		submittedBy: Meteor.userId(),
		references: review._id,
		voteSubject: "review",
	});
	const upButtonStyle =
		userVote === undefined || userVote.value === false
			? { backgroundColor: "transparent" }
			: { backgroundColor: "green" };
	const downButtonStyle =
		userVote === undefined || userVote.value === true
			? { backgroundColor: "transparent" }
			: { backgroundColor: "red" };
	return {
		review,
		vote: userVote,
		upStyle: upButtonStyle,
		downStyle: downButtonStyle,
	};
})(VoteButtons);
*/
/* <li>
	<a
		href="/my-account"
		type="button"
		id="register-button"
		className="btn navbar-btn margin-right btn-green hvr-icon-forward"
	>
		{i18n.__(
			"common.header.myaccount"
		)}
	</a>
</li>
<li>
	<a
		onClick={Meteor.logout}
		className="navbar-link margin-right"
	>
		<T>common.header.logout</T>
	</a>
</li> */
