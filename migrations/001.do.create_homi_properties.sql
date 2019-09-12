CREATE TABLE homi_properties (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  content TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);
