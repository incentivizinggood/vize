By default PostgreSQL sets the isolation level of transactions to
`READ COMMITTED`. This causes things like reading from the db to test
preconditions before writing can cause race conditions. For example, if the
following is run as part of a transaction the precondition checks may find that
the username and email are not taken, but by the time the insert happens they
could get taken.

```js
if (
    (await client.query(
        sql`SELECT userid FROM users WHERE username=${username}`
    )).rows.length > 0
) {
    throw "username is taken";
}

if (
    (await client.query(
        sql`SELECT userid FROM users WHERE email_address=${email}`
    )).rows.length > 0
) {
    throw "email is taken";
}

const passwordHash = await hashPassword(password);

const {
    rows: [user],
} = await client.query(sql`
			INSERT INTO users 
				(username, email_address, password_hash, role) 
			VALUES 
				(${username}, ${email}, ${passwordHash}, ${role}) 
			RETURNING ${attributes}
		`);

postToSlack(
    `:tada: A new user has joined Vize. Please welcome \`${username}\`.`
);

return user;
```

This could be fixed by

-   Setting the transaction's isolation level to `SERIALIZABLE` and then retry
    collided transactions.
-   Instead of checking the preconditions we could enforce them with
    constraints. This way a transaction is not needed. We can translate error
    messages from the constraints.

-   Input validation.
-   Precondition checks.
-   Write operations.
-   Event log and or notifications.
