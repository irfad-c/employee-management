function loggerMiddleware(req, res, next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const currentTime = Date.now();
    const duration = currentTime - startTime;

    console.log(
      `${req.method} ${req.originalUrl}-${duration}ms-${res.statusCode}`,
    );
  });

  next();
}

module.exports = loggerMiddleware;
