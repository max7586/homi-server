const express = require('express');
const path = require('path');
const PropertiesService = require('./properties-service');
const { requireAuth } = require('../middleware/jwt-auth');

const propertiesRouter = express.Router();
const jsonBodyParser = express.json();

propertiesRouter.route('/').get((req, res, next) => {
  PropertiesService.getAllProperties(req.app.get('db'))
    .then(properties => {
      res.json(PropertiesService.serializeProperties(properties));
    })
    .catch(next);
});


propertiesRouter
.route('/')
.post(requireAuth, jsonBodyParser, (req, res, next) => {
  const { title, content, image } = req.body;
  const newProperty = { title, content, image };

  for (const [key, value] of Object.entries(newProperty))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });
      
  newProperty.user_id = req.user.id
  PropertiesService.insertProperty(req.app.get('db'), newProperty)
    .then(property => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/`))
        .json(PropertiesService.serializeProperty(property));
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
