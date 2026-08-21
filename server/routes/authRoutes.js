const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const protect = require("../middleware/auth");

const router = express.Router();




const protect = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", logout);

module.exports = router;
/**
 * TASK 3.1 - One cookieOptions object, reused by register, login AND logout.
 * If clearCookie() is called with different options the browser keeps the cookie.
 *
 *   httpOnly : true
 *   secure   : true only in production
 *   sameSite : "lax" in development
 *   maxAge   : 7 days in MILLISECONDS
 */
const cookieOptions = {
  // TODO (Task 3.1): fill in the four properties
};

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// The response body carries the user only - never the token.
const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

/**
 * TASK 3.2 - POST /api/auth/register
 *   - reject a duplicate email with 400
 *   - hash the password with bcrypt (10 rounds)
 *   - create the user
 *   - res.cookie("token", signToken(user), cookieOptions).status(201).json({ user: publicUser(user) })
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // TODO (Task 3.2)
    res.status(501).json({ msg: "Not implemented - Task 3.2" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * TASK 3.3 - POST /api/auth/login
 *   - findOne({ email }).select("+password")   <- required because select:false
 *   - bcrypt.compare
 *   - ONE message, "Invalid credentials", for both a wrong email and a wrong password
 *   - same three closing lines as register, but status 200
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO (Task 3.3)
    res.status(501).json({ msg: "Not implemented - Task 3.3" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * TASK 4.2 - GET /api/auth/me   (protected)
 * Rebuilds the session after a hard refresh: 200 = restore, 401 = show /login.
 */
router.get("/me", protect, async (req, res) => {
  // TODO (Task 4.2)
  res.status(501).json({ msg: "Not implemented - Task 4.2" });
});

/**
 * TASK 4.3 - POST /api/auth/logout
 * Only the server can delete an HttpOnly cookie. Pass the SAME cookieOptions.
 */
router.post("/logout", (req, res) => {
  // TODO (Task 4.3)
  res.status(501).json({ msg: "Not implemented - Task 4.3" });
});

/**
 * TASK 8.2 (BONUS) - POST /api/auth/forgot-password
 *   - always answer with the same generic message, whether or not the email exists
 *   - raw token: crypto.randomBytes(32).toString("hex")
 *   - store ONLY the sha256 hash of it, plus a 15 minute expiry
 *   - "email" the link by console.log-ing `${process.env.CLIENT_URL}/reset/${raw}`
 */
router.post("/forgot-password", async (req, res) => {
  const generic = { msg: "If that email exists, a reset link was sent" };
  // TODO (Task 8.2)
  res.json(generic);
});

/**
 * TASK 8.3 (BONUS) - POST /api/auth/reset-password/:raw
 *   - hash req.params.raw and look the user up by resetTokenHash
 *   - the query must also require resetTokenExpires: { $gt: Date.now() }
 *   - re-hash the new password, then clear both reset fields
 */
router.post("/reset-password/:raw", async (req, res) => {
  // TODO (Task 8.3)
  res.status(501).json({ msg: "Not implemented - Task 8.3" });
});

module.exports = router;
