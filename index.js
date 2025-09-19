import express from "express";
const app = express();

import bookRouter from "./routes/book.routes.js";
import loggerMiddleware from "./middleware/logger.js";
const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port${PORT}`);
});
