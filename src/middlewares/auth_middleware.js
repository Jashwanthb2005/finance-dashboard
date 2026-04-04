const permissions = {
  viewer: ["read"],
  analyst: ["read", "analyze"],
  admin: ["create", "read", "update", "delete", "analyze"]
};

exports.authorize = (action) => {
  return (req, res, next) => {
    const role = req.headers.role;
    const status = req.headers.status || "active";

    if (!role) {
      return res.status(401).json({
        success: false,
        error: "Role not provided"
      });
    }
    if (!permissions[role]) {
      return res.status(400).json({
        success: false,
        error: "Invalid role"
      });
    }
    req.user = { role, status };
    if (req.user.status === "inactive") {
      return res.status(403).json({
        success: false,
        error: "User is inactive"
      });
    }
    if (!permissions[req.user.role].includes(action)) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You don't have access"
      });
    }

    next();
  };
};