# Pagination

> How do you eat an elephant? One bite at a time.

Some data sets are far too large to load, transfer, or view all at once. When
working with such data we must break it up into smaller manageable pieces. On
user interfaces and web API's these pieces are called pages and the process of
breaking a data set into pieces is called pagination.

In order to paginate the data we need some way to structure the data so that it
can be navigated and some way to indicate a position in this structure. The most
common way to structure paged data is as an ordered sequence. Some common
orderings are alphabetical and by date. The way a position is indicated could be
an offset from the beginning of the sequence or a relative offset from some
known element of the data set. The way a position is indicated is what
distinguishes the different types of pagination.

## Offset Pagination

### What is offset pagination?

Offset pagination is any pagination method that structures the data as a
sequence and indicates the position of pages by an offset from the beginning of
the sequence.

### Should I use offset pagination?

This form of pagination is best when the beginning of the sequence is relatively
static (items are not added or removed at the beginning). You should consider
using offset pagination when you use terms like first, second, third, etc. to
talk about elements of the data set. You should not use offset pagination if
those terms do not make sense for your data set. Offset pagination needs some
notion of "first" to work.

Offset based pagination is also easier to implement than cursor pagination. SQL
databases already implement this with `OFFSET` and `LIMIT`. However, offset
pagination can behave weirdly when elements are added or removed at the
beginning of the sequence. If someone is paging through the data, they might see
some elements repeated on multiple pages or they may completely miss some
elements.

### Examples of offset pagination.

An example SQL query using offset pagination. Note: The page numbers start from
zero in this example.

```SQL
SELECT ... FROM ...
    ORDER BY ordering_attribute ASC
    OFFSET page_number * size_of_page
    LIMIT size_of_page;
```

An example GraphQL schema using offset pagination.

```GraphQL
type Query {
    getLotsOfThings(pageNum: Int, pageSize: Int): ThingConnection!
}

type ThingConnection {
    nodes: [Thing!]!
    numberOfPages: Int!
}
```

## Cursor Pagination

### What is cursor pagination?

Cursor pagination is any pagination method that structures the data as a
sequence and indicates the position of pages with something called a cursor. A
cursor is a datatype that references some known element of the data set or some
value of the attribute that is used to order the sequence.

### Should I use cursor pagination?

Cursor pagination is good for streams/feeds of data that do not have a static
beginning or end (items are added or removed at the beginning and end). You
should consider using cursor pagination when you use terms like next, previous,
after, and before to talk about elements of the data set. You should not use
cursor pagination if you want to use terms like first, second, third, etc.
Cursor pagination does not use these notions.

Cursor pagination is a bit harder than offset pagination. It is overkill for
relatively static data and data sets that have a consistent first element. For
these cases simple offset pagination is probably the better choice.

### Examples of cursor pagination.

An example SQL query with forward pagination. This is used when going to the
next page.

```SQL
SELECT ... FROM ...
    ORDER BY ordering_attribute ASC
    WHERE ordering_attribute > after_cursor
    LIMIT size_of_page;
```

An example SQL query with backward pagination. This is used when going to the
previous page.

```SQL
SELECT ... FROM ...
    ORDER BY ordering_attribute DESC
    WHERE ordering_attribute < before_cursor
    LIMIT size_of_page;
```

Note: This query returns the results in reverse order because `LIMIT` only works
from the beginning. We cannot directly get "the last n rows" so instead we get
"the first n rows in reverse order" which is effectively the same thing. When
doing this we must remember to correct the order on the application server
before sending the page to the client.

An example GraphQL schema using Relay-style cursor pagination.

```GraphQL
type Query {
    getLotsOfThings(
        first: Int
        after: Cursor
        last: Int
        before: Cursor
    ): ThingConnection!
}

type ThingConnection {
    edges: [ThingEdge]
    nodes: [Thing]
    pageInfo: PageInfo!
    totalCount: Int!
}

type ThingEdge {
    node: Thing
    cursor: Cursor!
}

type PageInfo {
    endCursor: Cursor
    hasNextPage: Boolean!
    startCursor: Cursor
    hasPreviousPage: Boolean!
}

scalar Cursor
```
