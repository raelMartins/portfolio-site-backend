const express = require('express');
const visitorController = require('../controllers/visitor.controller');

const router = express.Router();

router
  .route('/')
  .get(visitorController.getAllVisitors)
  .post(visitorController.createVisitor);

router
  .route('/:id')
  .get(visitorController.getVisitor)
  .patch(visitorController.updateVisitor)
  .delete(visitorController.deleteVisitor);

module.exports = router;
