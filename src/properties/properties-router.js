const express = require('express');
const PropertiesService = require('./properties-service');
const { requireAuth } = require('../middleware/jwt-auth');

const propertiesRouter = express.Router();

propertiesRouter.route('/').get((req, res, next) => {
  PropertiesService.getAllProperties(req.app.get('db'))
    .then(properties => {
      res.json(PropertiesService.serializeProperties(properties));
    })
    .catch(next);
});

propertiesRouter
  .route('/:property_id')
  .all(requireAuth)
  .all(checkPropertyExists)
  .get((req, res) => {
    res.json(PropertiesService.serializeProperty(res.property));
  });

propertiesRouter
  .route('/:property_id/reviews/')
  .all(requireAuth)
  .all(checkPropertyExists)
  .get((req, res, next) => {
    PropertiesService.getReviewsForProperty(req.app.get('db'), req.params.property_id)
      .then(reviews => {
        res.json(PropertiesService.serializePropertyReviews(reviews));
      })
      .catch(next);
  });

/* async/await syntax for promises */
async function checkPropertyExists(req, res, next) {
  try {
    const property = await PropertiesService.getById(
      req.app.get('db'),
      req.params.property_id
    );

    if (!property)
      return res.status(404).json({
        error: `Property doesn't exist`
      });

    res.property = property;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = propertiesRouter;
