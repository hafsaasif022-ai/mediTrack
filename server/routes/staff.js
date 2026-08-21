const express = require("express");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const protect = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

/**
 * TASK 7.2 - GET /api/staff/appointments
 * Staff members see EVERY appointment in the clinic, with the patient's name.
 * Order matters: protect first (who are you?), then requireRole (may you?).
 *
 * Hint: Appointment.find().populate("owner", "name email").sort({ scheduledFor: 1 })
 */
router.get("/appointments", /* TODO (Task 7.2): protect, requireRole("staff"), */ async (req, res) => {
  // TODO (Task 7.2)
  res.status(501).json({ msg: "Not implemented - Task 7.2" });
});

/**
 * TASK 7.3 - PATCH /api/staff/appointments/:id/status
 * Staff may confirm or cancel ANY appointment - no owner filter here,
 * because the role itself is the permission.
 * Reject a status that is not "confirmed" or "cancelled" with 400.
 */
router.patch("/appointments/:id/status", /* TODO (Task 7.3) */ async (req, res) => {
  // TODO (Task 7.3)
  res.status(501).json({ msg: "Not implemented - Task 7.3" });
});

module.exports = router;
