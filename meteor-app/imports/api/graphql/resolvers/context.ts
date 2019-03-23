import * as dataModel from "imports/api/models";

/** Normaly this would just be called Context, but that causes a namespace
 *  collision with graphql code generator's types.
 */
export type MyContext = {
	user?: dataModel.User;
};
