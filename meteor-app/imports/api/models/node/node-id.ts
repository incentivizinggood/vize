import Hashids from "hashids";

import {
	VoteId,
	getCommentById,
	getCompanyById,
	getJobAdById,
	getReviewById,
	getSalaryById,
	getUserById,
	getVoteById,
	getIdOfVote,
	isComment,
	isCompany,
	isJobAd,
	isReview,
	isSalary,
	isUser,
	isVote,
	Node,
} from "imports/api/models";

/** An enumeration to encode the node type as an int for use in the id. */
enum NodeType {
	COMMENT = 1, // Start at 1 so that NodeType is never falsy.
	COMPANY,
	JOB_AD,
	REVIEW,
	SALARY,
	USER,
	VOTE,
}

// This is for UI/UX reasons. This is not for security.
// A seemingly random alphanumeric id in urls and user interfaces look better than 0, 1, 2, 3, etc.
// This also helps prevent the users from making bad assumptions about the ids.
const hashids = new Hashids("Vize (this is salt)", 4);

export async function getNodeById(nodeId: string): Promise<Node | null> {
	if (/[0-9a-fA-F]{24}/.test(nodeId)) {
		// This is very likely a MongoDB id.
		// Check to see if we can get a user from it.
		const user = await getUserById(nodeId);
		if (user) return user;
		// If we did not get a user try to get something else.
	}

	const [nodeType, ...restId]: number[] = hashids.decode(nodeId);
	switch (nodeType) {
		case NodeType.COMMENT:
			if (restId.length !== 1) return null;
			return getCommentById(restId[0]);
		case NodeType.COMPANY:
			if (restId.length !== 1) return null;
			return getCompanyById(restId[0]);
		case NodeType.JOB_AD:
			if (restId.length !== 1) return null;
			return getJobAdById(restId[0]);
		case NodeType.REVIEW:
			if (restId.length !== 1) return null;
			return getReviewById(restId[0]);
		case NodeType.SALARY:
			if (restId.length !== 1) return null;
			return getSalaryById(restId[0]);
		case NodeType.USER:
			if (restId.length !== 1) return null;
			throw new Error("NOT_IMPLEMENTED_YET");
		case NodeType.VOTE:
			if (restId.length !== 3) return null;
			const [subjectType, submittedBy, refersTo] = restId;
			return getVoteById({
				subjectType: subjectType === 1 ? "comment" : "review",
				submittedBy,
				refersTo,
			} as VoteId);
		default:
			return null;
	}
}

export function getIdOfNode(node: Node): string {
	let id: number[];
	if (isComment(node)) {
		id = [NodeType.COMMENT, node._id];
	} else if (isCompany(node)) {
		id = [NodeType.COMPANY, node.companyId];
	} else if (isJobAd(node)) {
		id = [NodeType.JOB_AD, node.jobAdId];
	} else if (isReview(node)) {
		id = [NodeType.REVIEW, node.reviewId];
	} else if (isSalary(node)) {
		id = [NodeType.SALARY, node.salaryId];
	} else if (isUser(node)) {
		// Until users are migrated to PostgreSQL, just use their MongoDB ids.
		return (node._id as unknown) as string;
	} else if (isVote(node)) {
		const { subjectType, submittedBy, refersTo } = getIdOfVote(node);
		id = [
			NodeType.VOTE,
			subjectType === "comment" ? 1 : 2,
			submittedBy,
			refersTo,
		];
	} else {
		throw new Error("NOT_ANY_TYPE_OF_NODE");
	}
	return hashids.encode(id) as string;
}
