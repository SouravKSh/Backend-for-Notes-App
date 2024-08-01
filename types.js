const zod = require("zod");
const createNote = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

const updateNote = zod.object({
  _id: zod.string().min(1),
});

module.exports = {
  createNote,
  updateNote,
};
