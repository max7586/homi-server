# homi Server

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb homi`, `createdb homi-test`
- Create database user: `createuser homi`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE homi TO homi`
  - `GRANT ALL PRIVILEGES ON DATABASE "homi-test" TO homi`
- Prepare environment file: `cp example.env .env`
  - Replace values in `.env` with your custom values if necessary.
- Bootstrap development database: `MIGRATION_DB_NAME=homi npm run migrate`
- Bootstrap test database: `MIGRATION_DB_NAME=homi-test npm run migrate`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the database for development: `psql -U homi -d homi -a -f seeds/seed.homi_tables.sql`
- To clear seed data: `psql -U homi -d homi -a -f seeds/trunc.homi_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`
