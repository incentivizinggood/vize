import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.homePage");
const T = i18n.createComponent(t);

export default class HomePageSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: "" };

		// These bindings are necessary to make `this` work in callbacks.
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleInputChange(event) {
		const { target } = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		FlowRouter.go(`/companies/?input=${this.state.search}`);
	}

	render() {
		return (
			<form className="example" onSubmit={this.handleSubmit}>
				<input
					name="search"
					type="text"
					placeholder={t("placeholder")}
					value={this.state.search}
					onChange={this.handleInputChange}
				/>
				<button type="submit">
					<T>searchButton</T>
				</button>
			</form>
		);
	}
}
