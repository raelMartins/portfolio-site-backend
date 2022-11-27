const express = require('express');
const projectController = require('../controllers/project.controller');

const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
