# ![WebApp](https://max7586.github.io/homi-client/images/demo/landingPage.png)

# Homi -- web Application

> HOMI is a simple real-estate management app

## Table of contents

- [App Description](#app-description)
- [Live Demo](https://homi-client.ahmedmax7586.now.sh)
- [client-site repo](https://github.com/max7586/homi-client)
- [Built with](#built-with)
- [Endpoints](#Endpoints)
- [Setting Up](#setting-up)
- [Configuring Postgres](#configuring-postgres)
- [Sample Data](#sample-data)
- [Scripts](#scripts)
- [Development](#development)

## App Description

<table>
<tr>
<td>
  HOMI is a real-estate management app. It's a full-stack web-app build with React, CSS, Node, Express, and Postgresql. This application allows a user to add their house for sale,  buy houses from the list. User can find rental houses and as well as can rent their own house. This app helps the user to find an agent to help purchase a house. This website does not use any third-party API. This website is supported on Chrome, Firefox, and Safari. This app is a fully responsive website. This app is totally responsive. This app is Followed by semantic HTML and the React-ful design pattern. And this app also has a11y.

</td>
</tr>
</table>

## Built with

- Node
- Express
- PostgreSQL

## Endpoints

### /user

- `POST /api/user`

Verifies input and registers a new account if valid.

### /auth

- `POST /api/auth/token`

Verifies credentials and returns a JSON Web Token if valid.

### /reviews

- `POST /api/reviews`

Verifies input and adds reviews to the database if valid.

### /properties

- `GET /api/properties`

Returns an array of properties .

- `GET /api/properties/:property_id`

Returns a property whose id matches `:property_id`.

- `GET /api/properties/:property_id/reviews/`

Returns a get Reviews For Property whose id matches `:property_id`.

- `POST /api/properties`

Verifies input and adds new property to the database if valid.

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

## Configuring Postgres

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

## Development

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request
