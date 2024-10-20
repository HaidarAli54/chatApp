-- migrate:up
ALTER TABLE users ADD COLUMN token VARCHAR(255);

-- migrate:down

ALTER TABLE users DROP COLUMN token;