import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import app from "/imports/api/server";

// Import all of the collection and method definitions.
// These files need to be run both on the client(s) and server.
import "/imports/api/data/reviews.js";
import "/imports/api/data/companies.js";
import "/imports/api/data/salaries.js";
import "/imports/api/data/users.js";
import "/imports/api/data/jobads.js";
import "/imports/api/data/votes.js";
import "/imports/api/data/methods.js";

// Try to keep the connection pool initialized
import { testConnection as testPgConnection } from "/imports/api/graphql/connectors/postgresql.js";

// install the express server within meteor webapp connect
WebApp.rawConnectHandlers.use(app);

Meteor.startup(() => {
	testPgConnection();
});
