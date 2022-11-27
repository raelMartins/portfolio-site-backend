const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'what is the name of the organization?']
    },
    description: {
      type: String,
      required: [true, 'Describe the organization']
    },
    location: String,
    startDate: Date,
    endDate: Date,
    current: {
      type: Boolean,
      default: false
    },
    role: String,
    tasks: [String],
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
      }
    ]
  },
  {
    timestamps: true
  }
);

//look up an item by it's name
organizationSchema.index({ name: 1 });

organizationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'projects',
    select: '-__v'
  });
  next();
});

const Organization =
  mongoose.models.Organization ||
  mongoose.model('Organization', organizationSchema);

module.exports = Organization;
