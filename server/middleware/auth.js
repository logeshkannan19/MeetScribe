const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check for the standard Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Split 'Bearer <token>' string to extract just the token
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Fail fast if no token is found - 401 is standard for "who are you?"
    return res.status(401).json({ success: false, message: 'Not authorized - No token found' });
  }

  try {
    // Verify the JWT signature against our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user object to the request for use in downstream routes
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    // If verification fails (e.g. expired), return 401
    return res.status(401).json({ success: false, message: 'Not authorized - Token invalid or expired' });
  }
};
