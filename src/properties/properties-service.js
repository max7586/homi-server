const xss = require('xss')
const Treeize = require('treeize')

const PropertiesService = {
  getAllProperties(db) {
    return db
      .from('homi_properties AS thg')
      .select(
        'thg.id',
        'thg.title',
        'thg.date_created',
        'thg.content',
        'thg.image',
        ...userFields,
        db.raw(
          `count(DISTINCT rev) AS number_of_reviews`
        ),
        db.raw(
          `AVG(rev.rating) AS average_review_rating`
        ),
      )
      .leftJoin(
        'homi_reviews AS rev',
        'thg.id',
        'rev.property_id',
      )
      .leftJoin(
        'homi_users AS usr',
        'thg.user_id',
        'usr.id',
      )
      .groupBy('thg.id', 'usr.id')
  },

  getById(db, id) {
    return PropertiesService.getAllProperties(db)
      .where('thg.id', id)
      .first()
  },

  getReviewsForProperty(db, property_id) {
    return db
      .from('homi_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.text',
        'rev.date_created',
        ...userFields,
      )
      .where('rev.property_id', property_id)
      .leftJoin(
        'homi_users AS usr',
        'rev.user_id',
        'usr.id',
      )
      .groupBy('rev.id', 'usr.id')
  },

  serializeProperties(properties) {
    return properties.map(this.serializeProperty)
  },

  serializeProperty(property) {
    const propertyTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const propertyData = propertyTree.grow([ property ]).getData()[0]

    return {
      id: propertyData.id,
      title: xss(propertyData.title),
      content: xss(propertyData.content),
      date_created: propertyData.date_created,
      image: propertyData.image,
      user: propertyData.user || {},
      number_of_reviews: Number(propertyData.number_of_reviews) || 0,
      average_review_rating: Math.round(propertyData.average_review_rating) || 0,
    }
  },

  serializePropertyReviews(reviews) {
    return reviews.map(this.serializePropertyReview)
  },

  serializePropertyReview(review) {
    const reviewTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const reviewData = reviewTree.grow([ review ]).getData()[0]

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      property_id: reviewData.property_id,
      text: xss(reviewData.text),
      user: reviewData.user || {},
      date_created: reviewData.date_created,
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = PropertiesService
