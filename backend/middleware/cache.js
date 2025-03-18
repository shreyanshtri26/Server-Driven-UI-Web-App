// Simple middleware that just passes through without Redis caching
const cache = async (req, res, next) => {
  // Skip Redis caching since Redis is not installed/running
  next();
};

module.exports = cache;