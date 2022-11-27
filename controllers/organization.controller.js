const Organization = require('../models/organization.model');
const factory = require('./factory.controller');

exports.getAllOrganizations = factory.getAll(Organization);
exports.getOrganization = factory.getOne(Organization);
exports.createOrganization = factory.createOne(Organization);
exports.updateOrganization = factory.updateOne(Organization);
exports.deleteOrganization = factory.deleteOne(Organization);
