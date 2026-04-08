import express from "express";

// TODO-1: Create Express app instance
const app = express();

// TODO-2: GET /echo — query params
app.get("/echo", (req, res) => {
  const { name, age } = req.query;
  if (!name || !age) {
    return res.status(400).json({ ok: false, error: "name & age required" });
  }
  res.json({ ok: true, name, age, msg: `Hello ${name}, you are ${age}` });
});

// TODO-3: GET /profile/:first/:last — route params
app.get("/profile/:first/:last", (req, res) => {
  const { first, last } = req.params;
  res.json({ ok: true, fullName: `${first} ${last}` });
});

// TODO-4: Param middleware for userId
app.param("userId", (req, res, next, userId) => {
  const n = Number(userId);
  if (!Number.isFinite(n) || n < 1) {
    return res.status(400).json({ ok: false, error: "userId must be positive number" });
  }
  req.userIdNum = n;
  next();
});

// TODO-5: GET /users/:userId — route with param middleware
app.get("/users/:userId", (req, res) => {
  res.json({ ok: true, userId: req.userIdNum });
});

// TODO-1: Start server on port 3000
app.listen(3000, () => console.log("API running at http://localhost:3000"));
