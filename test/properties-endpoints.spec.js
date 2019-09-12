const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Properties Endpoints', function() {
  let db

  const {
    testUsers,
    testProperties,
    testReviews,
  } = helpers.makePropertiesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/properties`, () => {
    context(`Given no properties`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/properties')
          .expect(200, [])
      })
    })

    context('Given there are properties in the database', () => {
      beforeEach('insert properties', () =>
        helpers.seedPropertiesTables(
          db,
          testUsers,
          testProperties,
          testReviews,
        )
      )

      it('responds with 200 and all of the properties', () => {
        const expectedProperties = testProperties.map(property =>
          helpers.makeExpectedProperty(
            testUsers,
            property,
            testReviews,
          )
        )
        return supertest(app)
          .get('/api/properties')
          .expect(200, expectedProperties)
      })
    })

    context(`Given an XSS attack property`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousProperty,
        expectedProperty,
      } = helpers.makeMaliciousProperty(testUser)

      beforeEach('insert malicious property', () => {
        return helpers.seedMaliciousProperty(
          db,
          testUser,
          maliciousProperty,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/properties`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedProperty.title)
            expect(res.body[0].content).to.eql(expectedProperty.content)
          })
      })
    })
  })

  describe(`GET /api/properties/:property_id`, () => {
    context(`Given no properties`, () => {
      beforeEach(() =>
       //db.into('homi_users').insert(testUsers)
       helpers.seedUsers(db, testUsers)
     )

      it(`responds with 404`, () => {
        const propertyId = 123456
        return supertest(app)
          .get(`/api/properties/${propertyId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Property doesn't exist` })
      })
    })

    context('Given there are properties in the database', () => {
      beforeEach('insert properties', () =>
        helpers.seedPropertiesTables(
          db,
          testUsers,
          testProperties,
          testReviews,
        )
      )

      it('responds with 200 and the specified property', () => {
        const propertyId = 2
        const expectedProperty = helpers.makeExpectedProperty(
          testUsers,
          testProperties[propertyId - 1],
          testReviews,
        )

        return supertest(app)
          .get(`/api/properties/${propertyId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedProperty)
      })
    })

    context(`Given an XSS attack property`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousProperty,
        expectedProperty,
      } = helpers.makeMaliciousProperty(testUser)

      beforeEach('insert malicious property', () => {
        return helpers.seedMaliciousProperty(
          db,
          testUser,
          maliciousProperty,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/properties/${maliciousProperty.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedProperty.title)
            expect(res.body.content).to.eql(expectedProperty.content)
          })
      })
    })
  })

  describe(`GET /api/properties/:property_id/reviews`, () => {
    context(`Given no properties`, () => {
      beforeEach(() =>
       //db.into('homi_users').insert(testUsers)
       helpers.seedUsers(db, testUsers)
     )

      it(`responds with 404`, () => {
        const propertyId = 123456
        return supertest(app)
          .get(`/api/properties/${propertyId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Property doesn't exist` })
      })
    })

    context('Given there are reviews for property in the database', () => {
      beforeEach('insert properties', () =>
        helpers.seedPropertiesTables(
          db,
          testUsers,
          testProperties,
          testReviews,
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const propertyId = 1
        const expectedReviews = helpers.makeExpectedPropertyReviews(
          testUsers, propertyId, testReviews
        )

        return supertest(app)
          .get(`/api/properties/${propertyId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedReviews)
      })
    })
  })
})
