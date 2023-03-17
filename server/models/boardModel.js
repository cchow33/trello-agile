const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },

  // Do we need this?
  visibility: {
    type: String,
  },

  // Users associated with this board
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],

  // Lists associated with this board
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'list',
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);


