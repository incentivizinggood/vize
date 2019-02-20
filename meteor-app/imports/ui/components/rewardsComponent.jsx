import React from "react";
import i18n from "meteor/universe:i18n";
import Modal from "react-modal";
import { CSSTransitionGroup } from "react-transition-group";

const t = i18n.createTranslator("common.reviewSubmitted");
const T = i18n.createComponent(t);

function RewardsComponent() {
	return (
		<div>
			<div className="congratulations">
				<div className="congratulations-gif" />
				<p className="rewarded">
					<T>earnedReward</T>
				</p>
			</div>
			<CSSTransitionGroup
				transitionName="success"
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				<div className="success-widget">
					<h3>
						<T>phoneSuccess</T>
					</h3>
					<h3>
						<T>phoneSuccess2</T>
					</h3>
				</div>
			</CSSTransitionGroup>

			<div className="col-md-12">
				<div>
					<p>
						<T>rewardYou</T>
					</p>
					<p>
						<T>rewardOptions</T>
					</p>
					<div className="rewards">
						<div className="reward">
							<div className="reward-visual">
								<img
									src="images/payPal.png"
									alt="payPal logo"
								/>
								<p className="price-tag">$5</p>
							</div>
							<p>
								<T>paypalCash</T>
							</p>
							<a onClick={this.openModal}>
								<T>getReward</T>
							</a>
						</div>
						<div className="reward">
							<div className="reward-visual">
								<img src="images/xoom.png" alt="xoom logo" />
								<p className="price-tag">$5</p>
							</div>
							<p>
								<T>minutesReward</T>
							</p>
							<a onClick={this.openModal}>
								<T>getReward</T>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RewardsComponent;
