import {
	Comment,
	Company,
	JobAd,
	Review,
	Salary,
	User,
	Vote,
} from "imports/api/models";

export type Node = Comment | Company | JobAd | Review | Salary | User | Vote;
export enum NodeType {
	COMMENT = 1, // Start at 1 so that NodeType is never falsy.
	COMPANY,
	JOB_AD,
	REVIEW,
	SALARY,
	USER,
	VOTE,
}

export function isComment(node: Node): node is Comment {
	return (node as Comment).content !== undefined;
}

export function isCompany(node: Node): node is Company {
	return (node as Company).numEmployees !== undefined;
}

export function isJobAd(node: Node): node is JobAd {
	return (node as JobAd).jobAdId !== undefined;
}

export function isReview(node: Node): node is Review {
	return (node as Review).reviewId !== undefined;
}

export function isSalary(node: Node): node is Salary {
	return (node as Salary).salaryId !== undefined;
}

export function isUser(node: Node): node is User {
	return (node as User).username !== undefined;
}

export function isVote(node: Node): node is Vote {
	return (node as Vote).isUpvote !== undefined;
}

export function resolveNodeType(node: Node): NodeType {
	if (isComment(node)) {
		return NodeType.COMMENT;
	} else if (isCompany(node)) {
		return NodeType.COMPANY;
	} else if (isJobAd(node)) {
		return NodeType.JOB_AD;
	} else if (isReview(node)) {
		return NodeType.REVIEW;
	} else if (isSalary(node)) {
		return NodeType.SALARY;
	} else if (isUser(node)) {
		return NodeType.USER;
	} else if (isVote(node)) {
		return NodeType.VOTE;
	} else {
		throw new Error("NOT_ANY_TYPE_OF_NODE");
	}
}

export function nodeTypeToString(nodeType: NodeType): string {
	switch (nodeType) {
		case NodeType.COMMENT:
			return "Comment";
		case NodeType.COMPANY:
			return "Company";
		case NodeType.JOB_AD:
			return "JobAd";
		case NodeType.REVIEW:
			return "Review";
		case NodeType.SALARY:
			return "Salary";
		case NodeType.USER:
			return "User";
		case NodeType.VOTE:
			return "Vote";
		default:
			throw new Error("NOT_ANY_TYPE_OF_NODE");
	}
}
