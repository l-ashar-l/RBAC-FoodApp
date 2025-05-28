const { ROLE_PERMISSIONS, PERMISSIONS } = require('../config/roles');

exports.checkPermission = (permission) => (req, res, next) => {
  const { role } = req.user;
  
  if (!ROLE_PERMISSIONS[role].includes(permission)) {
    return res.status(403).json({ 
      message: 'Forbidden: You do not have permission to perform this action' 
    });
  }
  
  next();
};

exports.countryRestriction = (model) => async (req, res, next) => {
  if (req.user.role === 'admin') return next();
  
  const resource = await model.findById(req.params.id);
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }
  
  if (resource.country !== req.user.country) {
    return res.status(403).json({ 
      message: 'Forbidden: Access to resources outside your country is restricted' 
    });
  }
  
  next();
};