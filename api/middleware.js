const jwt = require('jsonwebtoken');

// Middleware to verify the token
function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Middleware to restrict access based on user role
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next(); // Proceed to the next middleware or route handler
  };
}

module.exports = {
  verifyToken,
  requireRole
};
