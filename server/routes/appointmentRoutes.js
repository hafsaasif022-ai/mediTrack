const express = require("express");
const Appointment = require("../models/Appointment");
const protect = require("../middleware/auth");

const router = express.Router();

// TASK 6.2: guard every route in this file with one line.
// TODO (Task 6.2): router.use(protect);

/**
 * TASK 6.3 - GET /api/appointments
 * Return ONLY the appointments whose owner is req.user.id, newest first.
 */
router.get("/", async (req, res) => {
  // TODO (Task 6.3)
  res.status(501).json({ msg: "Not implemented - Task 6.3" });
});

/**
 * TASK 6.4 - POST /api/appointments
 * owner comes from the token (req.user.id), never from req.body.
 */
router.post("/", async (req, res) => {
  // TODO (Task 6.4)
  res.status(501).json({ msg: "Not implemented - Task 6.4" });
});

/**
 * TASK 6.5 - PUT /api/appointments/:id
 * Put BOTH _id and owner in the query so the database enforces ownership.
 * Nothing found -> 404 (never 403: a stranger must not learn the id exists).
 * Remember runValidators: true and new: true.
 */
router.put("/:id", async (req, res) => {
  // TODO (Task 6.5)
  res.status(501).json({ msg: "Not implemented - Task 6.5" });
});

/**
 * TASK 6.6 - DELETE /api/appointments/:id
 * Same ownership filter, same 404.
 */
router.delete("/:id", async (req, res) => {
  // TODO (Task 6.6)
  res.status(501).json({ msg: "Not implemented - Task 6.6" });
});

module.exports = router;
