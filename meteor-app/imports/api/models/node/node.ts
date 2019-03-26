import {
	Comment,
	Company,
	JobAd,
	Review,
	Salary,
	User,
	Vote,
} from "imports/api/models";

/** Some kind of domain object that has a globaly unique id. */
export type Node = Comment | Company | JobAd | Review | Salary | User | Vote;

// In order to determine what spesific type a Node actualy is, we test for the
// existance of fields that are unique to each of the types that a Node could
// be. Example: If a node has things that only comments have, then that node is
// a Comment. To make this process easier, use the following type guards.

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
