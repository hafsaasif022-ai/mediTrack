const mongoose = require("mongoose");

/**
 * TASK 2.1 - Complete the User schema.
 *
 * Required fields:
 *   name     -> String, required, trimmed
 *   email    -> String, required, unique, lowercase, trimmed
 *   password -> String, required, minlength 6, select: false
 *   role     -> String, enum ["patient", "staff"], default "patient"
 *
 * Also needed later for Task 8 (password reset):
 *   resetTokenHash    -> String
 *   resetTokenExpires -> Date
 *
 * Remember: { timestamps: true } as the second argument to the Schema.
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
 
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["patient", "staff"],
      default: "patient",
    },
    // TODO (Task 2.1): add email with unique + lowercase + trim
    // TODO (Task 2.1): add password with minlength 6 and select: false
    // TODO (Task 2.1): add role with enum ["patient", "staff"] and default "patient"
    // TODO (Task 8.1): add resetTokenHash and resetTokenExpires
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
