const Appointment = require("../models/Appointment");

// GET /api/staff/appointments
async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("owner", "name email")
      .sort({ scheduledFor: 1 });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

// PATCH /api/staff/appointments/:id/status
async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ msg: "Not found" });

    res.json({ appointment });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

module.exports = { getAllAppointments, updateStatus };