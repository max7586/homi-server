const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makePropertiesArray(users) {
  return [
    {
      id: 1,
      title: 'First test property!',
      image: 'http://placehold.it/500x500',
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test property!',
      image: 'http://placehold.it/500x500',
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test property!',
      image: 'http://placehold.it/500x500',
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test property!',
      image: 'http://placehold.it/500x500',
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeReviewsArray(users, properties) {
  return [
    {
      id: 1,
      rating: 2,
      text: 'First test review!',
      property_id: properties[0].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      rating: 3,
      text: 'Second test review!',
      property_id: properties[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      rating: 1,
      text: 'Third test review!',
      property_id: properties[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      rating: 5,
      text: 'Fourth test review!',
      property_id: properties[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      rating: 1,
      text: 'Fifth test review!',
      property_id: properties[properties.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      rating: 2,
      text: 'Sixth test review!',
      property_id: properties[properties.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      rating: 5,
      text: 'Seventh test review!',
      property_id: properties[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function seedUsers(db, users){
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('homi_users').insert(preppedUsers)
  .then(() =>
    db.raw(`SELECT setval('homi_users_id_seq', ?)`, [users[users.length - 1].id],
    )
  )
}

function makeExpectedProperty(users, property, reviews=[]) {
  const user = users
    .find(user => user.id === property.user_id)

  const propertyReviews = reviews
    .filter(review => review.property_id === property.id)

  const number_of_reviews = propertyReviews.length
  const average_review_rating = calculateAverageReviewRating(propertyReviews)

  return {
    id: property.id,
    image: property.image,
    title: property.title,
    content: property.content,
    date_created: property.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

function calculateAverageReviewRating(reviews) {
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeExpectedPropertyReviews(users, propertyId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.property_id === propertyId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created,
      }
    }
  })
}

function makeMaliciousProperty(user) {
  const maliciousProperty = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedProperty = {
    ...makeExpectedProperty([user], maliciousProperty),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousProperty,
    expectedProperty,
  }
}

function makePropertiesFixtures() {
  const testUsers = makeUsersArray()
  const testProperties = makePropertiesArray(testUsers)
  const testReviews = makeReviewsArray(testUsers, testProperties)
  return { testUsers, testProperties, testReviews }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        homi_properties,
        homi_users,
        homi_reviews
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE homi_properties_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE homi_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE homi_reviews_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('homi_properties_id_seq', 0)`),
        trx.raw(`SELECT setval('homi_users_id_seq', 0)`),
        trx.raw(`SELECT setval('homi_reviews_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('homi_users').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('homi_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}


function seedPropertiesTables(db, users, properties, reviews=[]) {

  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('homi_properties').insert(properties)

    await trx.raw(
      `SELECT setval('homi_properties_id_seq', ?)`,
      [properties[properties.length - 1].id],
    )

    if (reviews.length) {
      await trx.into('homi_reviews').insert(reviews)
      await trx.raw(
        `SELECT setval('homi_reviews_id_seq', ?)`,
        [reviews[reviews.length - 1].id],
      )
    }
  })
}


function seedMaliciousProperty(db, user, property) {
  //return db
    //.into('homi_users')
    //.insert([user])
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('homi_properties')
        .insert([property])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
   const token = jwt.sign({ user_id: user.id }, secret, {
     subject: user.user_name,
     algorithm: 'HS256',
   })  
   return `bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makePropertiesArray,
  makeExpectedProperty,
  makeExpectedPropertyReviews,
  makeMaliciousProperty,
  makeReviewsArray,

  makePropertiesFixtures,
  cleanTables,
  seedPropertiesTables,
  seedMaliciousProperty,
  makeAuthHeader,
  seedUsers,
}
