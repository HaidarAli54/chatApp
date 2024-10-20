-- migrate:up

ALTER TABLE Users ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL;

-- migrate:down

ALTER TABLE Users DROP COLUMN email;
