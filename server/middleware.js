const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  console.log('=== DEBUG authenticateToken ===');
  console.log('Headers:', req.headers);
  
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token);
  
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ redirect: '/signup', message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT verification error:', err);
      return res.status(403).json({ redirect: '/signup', message: 'Invalid or expired token' });
    }
    
    console.log('JWT decoded successfully:', user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;