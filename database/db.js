const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ssouravkumar25:R9eT8HgK2kdu7QAM@cluster0.j1q3vud.mongodb.net/Notes"
);

const noteSchema = {
  title: String,
  description: String,
  completed: String,
};

const note = mongoose.model("notes", noteSchema);

module.exports = { note };
