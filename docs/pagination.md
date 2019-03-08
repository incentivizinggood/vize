## What is cursor based pagination?

Cursor based pagination is good for consumeable streams/feeds of data. It is
overkill for relatively static data and datasets that have a consistaint first
element. For these cases simple numbered pageination is probably the better
choise.

The nodes must have a total ordering. This could be the id or the date_created
and id. A cursor represents a value in this total ordering. If multiple
orderings are posible the cursor should also indicate the ordering to use.

An example query with forward pagination.

```SQL
SELECT ... FROM ...
	ORDER BY ordering_attribute ASC
	WHERE ordering_attribute > after_cursor
	LIMIT size_of_page;
```

An example query with backward pagination. This is used when going to the
previous page.

```SQL
SELECT ... FROM ...
	ORDER BY ordering_attribute DESC
	WHERE ordering_attribute < before_cursor
	LIMIT size_of_page;
```

This query returns the results in reverce order because Limit only works from
the beginning. We cannot directly get "last n rows" so instead we get the "first
n rows in reverce order" which is effectivly the same thing. We then correct the
reverced order on the application server.
