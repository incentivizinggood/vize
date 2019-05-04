-   All roles that have the login attribute (roles that represent actual users):
    -   Must not have any permissions granted to them. These roles only get
        permission by inheriting from non-login roles.
    -   Must not be used as a parent role.
-   All roles that do not have the login attribute:
    -   Must represent a **group** of users, even if that group has only one
        member.
    -   Must have a meaningful name that describes either it's permissions or
        the kind of thing that it's members are.
-   Passwords must be stored as bcrypt hashes.
-   The passwords and password hashes must be accessible **only** by the
    authentication system. All other systems (analytics, logs, etc.) must not
    have access.
-   All applications must be allowed **only** the CRUD operations. All other
    operations must be disabled.
-   All applications that should not edit data, such as the analytics, must have
    read-only permissions.
-   The deployment system needs permission to edit objects within schemas.
-   The migration system should not change anything that is not part of the
    "public" schema. This includes managing users and roles.

## Specific roles

### rds_superuser

Humans with superuser permissions. This role is created by AWS RDS. This role
should **never** be used by an application. This role should not be used when a
more restricted role will suffice.

### readonly

Humans and applications that should not edit anything. This should be used as
the "default" role.

### app

Applications that read and write data and authenticate users. This is the only
role used by production applications that can access password hashes.

### migration

Applications that change the database schema. For now the only member of this
group should be the flyway application.
