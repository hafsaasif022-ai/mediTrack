const jwt = require("jsonwebtoken");

/**
 * TASK 4.1 - The guard that stands in front of every private route.
 *
 * Steps:
 *   1. Read the token from req.cookies.token.
 *   2. TASK 4.4 (optional): if there is no cookie, fall back to the
 *      "Authorization: Bearer <token>" header so Postman and mobile clients work.
 *   3. If there is still no token -> 401.
 *   4. jwt.verify(token, process.env.JWT_SECRET) inside try/catch.
 *   5. On success put { id, role } on req.user and call next().
 *   6. On failure -> 401 "Token invalid or expired".
 *
 * A middleware has exactly two endings: it calls next(), or it ends the response.
 */
function protect(req, res, next) {
  // TODO (Task 4.1): read the token from the cookie
  // TODO (Task 4.4): fall back to the Bearer header
  // TODO (Task 4.1): verify, set req.user, call next()
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Not authorised — no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next(); // token is valid, continue to the route
  } catch (err) {
    res.status(401).json({ msg: "Token invalid or expired" });
  }
}
  return res
    .status(500)
    .json({ msg: "protect() is not implemented yet - see Task 4.1" });

module.exports = protect;
