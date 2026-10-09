function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required." });
  }
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || token !== "test-token") {
    return res
      .status(401)
      .json({ message: "Invalid credentials for the authHeader." });
  }
  next();
}

module.exports = authMiddleware;
