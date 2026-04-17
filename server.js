const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage using JS arrays
let posts = [
  { id: 1, name: "First Post", content: "Hello, this is the first post on Mini-Twitter!" },
  { id: 2, name: "Node.js is great", content: "Using Node and Express to build REST APIs is really straightforward." },
  { id: 3, name: "Learning Express", content: "Express makes it super easy to define routes and handle HTTP methods." }
];

let comments = [
  { id: 1, postId: 1, comment: "Great first post!" },
  { id: 2, postId: 1, comment: "Welcome to Mini-Twitter!" },
  { id: 3, postId: 2, comment: "Totally agree, Node.js rocks!" }
];

let nextPostId = 4;
let nextCommentId = 4;

// ─── ENDPOINTS ───────────────────────────────────────────────────────────────

// GET /posts - return all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET /posts/:id - return a single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// POST /posts - create a new post
app.post("/posts", (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: "name and content are required" });
  }
  const newPost = { id: nextPostId++, name, content };
  posts.push(newPost);
  console.log(`Adding new post: ${JSON.stringify(newPost)}`);
  console.log(`Posts: ${JSON.stringify(posts)}`);
  res.status(201).json(newPost);
});

// GET /posts/:id/comments - return all comments for a post
app.get("/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const postComments = comments.filter(c => c.postId === postId);
  res.json(postComments);
});

// POST /posts/:id/comments - add a comment to a post
app.post("/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: "comment field is required" });

  const newComment = { id: nextCommentId++, postId, comment };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
