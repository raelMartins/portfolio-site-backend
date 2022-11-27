const Visitor = require('../models/visitor.model');
const factory = require('./factory.controller');

exports.getAllVisitors = factory.getAll(Visitor);
exports.getVisitor = factory.getOne(Visitor);
exports.createVisitor = factory.createOne(Visitor);
exports.updateVisitor = factory.updateOne(Visitor);
exports.deleteVisitor = factory.deleteOne(Visitor);
