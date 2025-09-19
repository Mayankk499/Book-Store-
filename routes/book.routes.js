import express from "express";
import books from "../db/book.db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({ error: `id must be of type number` });
  const Book = books.find((e) => e.id === id);

  if (!Book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists` });

  return res.json(Book);
});

router.post("/", (req, res) => {
  const { title, auther } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required 📝" });

  if (!auther || auther === "")
    return res.status(400).json({ error: "auther is required 👨‍🏫" });

  const id = books.length + 1;

  const book = { id, title, auther };
  books.push(book);

  return res.status(201).json({ message: "Book Added Successfully ✅" });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be of type number" });
  }

  const indexToDelete = books.findIndex((e) => e.id === id);

  if (indexToDelete < 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exist 🚫` });
  }

  books.splice(indexToDelete, 1);

  return res.status(200).json({ message: "Book removed ✅" });
});

export default router;
