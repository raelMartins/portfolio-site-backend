const express = require('express');
const organizationController = require('../controllers/organization.controller');

const router = express.Router();

router
  .route('/')
  .get(organizationController.getAllOrganizations)
  .post(organizationController.createOrganization);

router
  .route('/:id')
  .get(organizationController.getOrganization)
  .patch(organizationController.updateOrganization)
  .delete(organizationController.deleteOrganization);

module.exports = router;
