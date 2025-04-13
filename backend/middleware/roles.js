exports.isAdmin = (req, res, next) => {
    if (req.userRole === 'system_admin') return next();
    res.status(403).json({ success: false, message: 'Require admin role' });
  };
  
  exports.isStoreOwner = (req, res, next) => {
    if (req.userRole === 'store_owner') return next();
    res.status(403).json({ success: false, message: 'Require store owner role' });
  };
  
  exports.isNormalUser = (req, res, next) => {
    if (req.userRole === 'normal_user') return next();
    res.status(403).json({ success: false, message: 'Require normal user role' });
  };