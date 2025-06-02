const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};
