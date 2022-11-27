const mongoose = require('mongoose');
const {
  uniqueNamesGenerator,
  starWars,
  adjectives
} = require('unique-names-generator');

const mediaSchema = new mongoose.Schema(
  {
    mediaType: {
      type: String,
      default: `image`,
      enum: [`image`, `video`],
      lowercase: true
    },
    url: {
      type: String
    },
    mediaDescription: {
      type: String,
      required: [true, 'You must provide a media description']
    },
    file: {
      type: String,
      required: [true, 'You must provide a media file']
    }
  },
  {
    timestamps: true
  }
);

//look up an item by it's name
mediaSchema.index({ name: 1 });

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

module.exports = Media;
