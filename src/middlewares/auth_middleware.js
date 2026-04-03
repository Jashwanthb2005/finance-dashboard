const permissions = {
  viewer: ["read"],
  analyst: ["read", "analyze"],
  admin: ["create", "read", "update", "delete"]
};

exports.authorize = (action) => {
  return (req, res, next) => {
    const role = req.headers.role;

    if (!role) {
      return res.status(401).json({
        success: false,
        error: "Role not provided"
      });
    }

    if (!permissions[role].includes(action)) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You don't have access"
      });
    }

    next();
  };
};