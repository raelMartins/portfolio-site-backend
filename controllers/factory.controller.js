const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const GetterFilter = require('../utils/getterFilter');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const filteredPromise = new GetterFilter(Model.find({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await filteredPromise.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({ _id: req.params.id });

    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };
    const doc = await Model.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) return next(new AppError('No document found for this id', 404));

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete({ _id: req.params.id });

    if (!doc) return next(new AppError('No document found for this id', 404));

    res.status(204).json({
      status: 'success',
      data: doc
    });
  });
