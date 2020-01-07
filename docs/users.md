# How to make a new user

For a read only user:

-   Use a simple username, ideally the person's first name or most commonly used
    name.

```sql
CREATE USER johnny WITH PASSWORD 'password_here';
GRANT readonly TO johnny;
```

For an admin user:

-   Use the same username of the person's readonly account with the `_admin`
    suffix.

```sql
CREATE USER johnny_admin WITH PASSWORD 'password_here';
GRANT admin TO johnny_admin;
```

# How the admin role was made

```sql
CREATE ROLE admin;
GRANT USAGE ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
```
