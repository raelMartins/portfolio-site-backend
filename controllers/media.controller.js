const Media = require('../models/media.model');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factory.controller');

const multer = require('multer');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.split('/')[0];

    if (type === `image`) {
      cb(null, './uploads/images');
    } else if (type === `video`) {
      cb(null, './uploads/videos');
    } else {
      cb(new AppError(`Invalid media type`, 400), false);
    }
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    const ext = file.mimetype.split('/')[1];
    cb(
      null,
      `${type}-${Math.round(Math.random() * 10000)}-${Date.now()}.${ext}`
    );
  }
});

const multerFilter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  console.log(file);
  console.log(type);
  if (type === `image` || type === `video`) {
    cb(null, true);
  } else {
    cb(new AppError(`This is not media, please upload only media`, 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadMediaImage = upload.single('file');

exports.getAllMedia = factory.getAll(Media);
exports.getMedia = factory.getOne(Media);

exports.createMedia = catchAsync(async (req, res, next) => {
  const type = req.file.mimetype.split('/')[0] || 'image';

  const media = await Media.create({
    ...req.body,
    file: req.file.filename,
    mediaType: type,
    url: `${type}s/${req.file.filename}`
  });

  res.status(201).json({
    status: 'success',
    data: media
  });
});

exports.updateMedia = catchAsync(async (req, res, next) => {
  const media = await Media.findById(req.params.id);
  media.mediaDescription = req.body.mediaDescription;

  if (!media) return next(new AppError('No document found for this id', 404));

  await order.save();

  res.status(200).json({
    status: 'success',
    data: media
  });
});

// exports.createMedia = factory.createOne(Media);
exports.updateMedia = factory.updateOne(Media);
exports.deleteMedia = factory.deleteOne(Media);
