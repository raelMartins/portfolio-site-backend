const express = require('express');
const mediaController = require('../controllers/media.controller');

const router = express.Router();

router.route('/').get(mediaController.getAllMedia);

router
  .route('/:id')
  .get(mediaController.getMedia)
  .patch(mediaController.updateMedia)
  .delete(mediaController.deleteMedia);

router.post('/', mediaController.uploadMediaImage, mediaController.createMedia);

module.exports = router;
