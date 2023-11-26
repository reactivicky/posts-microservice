import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      posts,
    },
  });
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).json({
    status: "Success",
    data: {
      post: posts[id],
    },
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000...");
});
