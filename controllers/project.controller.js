const Project = require('../models/project.model');
const factory = require('./factory.controller');

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
