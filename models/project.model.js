const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'A project must have a name']
    },
    projectDescription: {
      type: String,
      required: [true, 'A project must have a description']
    },
    projectDuration: String,
    projectMedia: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Media'
      }
    ]
    // projectOrganization: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Organization'
    // }
  },
  {
    timestamps: true
  }
);

//look up an item by it's name
projectSchema.index({ name: 1 });

//On every find query, populate the customer field with the name, membership, active, email, and phone fields
//do not return the '__v' field
// projectSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'projectOrganization',
//     select: 'name role'
//   });

//   next();
// });
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'projectMedia',
    select: '-__v'
  });
  next();
});

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;
