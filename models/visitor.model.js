const mongoose = require('mongoose');
const {
  uniqueNamesGenerator,
  starWars,
  adjectives
} = require('unique-names-generator');

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: uniqueNamesGenerator({
        dictionaries: [adjectives, starWars], // colors can be omitted here as not used
        separator: ' ',
        style: 'capital',
        length: 2
      })
    },
    visits: {
      type: Number,
      default: 1
    },
    lastVisited: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
);

//look up an item by it's name
visitorSchema.index({ name: 1 });

const Visitor =
  mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
