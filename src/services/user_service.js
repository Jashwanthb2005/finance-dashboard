const User = require("../models/user_model");

exports.createUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }
  const user = await User.create(data);
  return user;
};

exports.getUsers = async () => {
  return await User.find();
};

exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};