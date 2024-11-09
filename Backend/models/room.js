const mongoose = require("mongoose");

let roomSchema = new mongoose.Schema({
  arrayOfUsers: {
    type: Array,
  },
  roomId: {
    type: String,
  },
  roomKey: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
  },
  maxNumber: {
    type: Number,
  },
});
module.exports = mongoose.model("Room", roomSchema);
