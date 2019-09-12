CREATE TABLE homi_reviews (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    property_id INTEGER
        REFERENCES homi_properties(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES homi_users(id) ON DELETE CASCADE NOT NULL
);
