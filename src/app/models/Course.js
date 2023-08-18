const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    _id: { type: Number,  },
    name: { type: String, maxLength: 255, required:true },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoId: { type: String, maxLength: 255, required:true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique:true },
  }, {
    _id: false,
    timestamps: true,
  });

  module.exports = mongoose.model('Course', Course);
