const bcrypt = require("bcryptjs");
const User = require("../models/User");
const signToken = require("../utils/generateToken");
const publicUser = require("../utils/publicUser");
const cookieOptions = require("../config/cookieOptions");

// POST /api/auth/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(201)
      .json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    const ok = user && (await bcrypt.compare(password, user.password));

    if (!ok) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res
      .cookie("token", signToken(user), cookieOptions)
      .status(200)
      .json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ msg: "No user" });
    res.json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

// POST /api/auth/logout
function logout(req, res) {
  res.clearCookie("token", cookieOptions);
  res.json({ msg: "Logged out" });
}

module.exports = { register, login, getMe, logout };