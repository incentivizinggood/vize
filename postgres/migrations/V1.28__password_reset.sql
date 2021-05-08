CREATE TABLE password_reset_requests (
    id text PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    created_date timestamptz NOT NULL DEFAULT NOW(),
    expiration_date timestamptz NOT NULL DEFAULT NOW()
)
