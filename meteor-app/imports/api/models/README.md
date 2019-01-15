## What are "models"?

Models handle the business logic of this app and provide a relatively simple
interface to this logic in the form of function calls and flat objects. Models
use the connectors to interact with the outside world (querying the database and
sending emails for example).

## Why have a separate layer for this code?

This is done to keep concerns separated. The resolvers are already concerned
with providing a GraphQL interface and the connectors are concerned with
connecting to external resources. The business logic does not fit in either of
these layers so we put it into the model layer.

## How is this directory organized?

All of the exports in every file in this directory are exported. This is
effectively the same as if all of the files were concatenated together as one
big file. The separate files are only used for organization.
