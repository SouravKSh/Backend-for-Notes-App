const express = require("express");
const app = express();
const cors = require("cors");
const { createNote, updateNote } = require("./types");
const { note } = require("./database/db.js");
app.use(express.json());
app.use(cors());

const PORT = 10000;

app.post("/", async (req, res) => {
  const noteParse = req.body;
  const validNote = createNote.safeParse(noteParse);
  if (!validNote.success) {
    res.status(401).json({ msg: "Validation error" });
    return;
  }
  await note.create({
    title: noteParse.title,
    description: noteParse.description,
  });
  res.status(201).json({ msg: "Note is created" });
});

app.get("/", async (req, res) => {
  const data = await note.find({});
  if (!data) {
    res.status(404).json({ msg: "No notes available" });
    return;
  }
  res.status(200).json(data);
});

app.get("/:id", async (req, res) => {
  try {
    const data = await note.findById(req.params.id);
    if (!data) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ msg: "Note not found" });
    res.status(200).json({ msg: "record is updated" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.delete("/:id", async function (req, res) {
  try {
    const data = await note.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: "note not present in the database" });
    }
    res.status(200).json({ msg: "note is deleted successfully" });
  } catch (e) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log("server is running in port - ", PORT);
});
