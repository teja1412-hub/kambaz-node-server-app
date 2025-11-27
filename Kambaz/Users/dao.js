import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const findAllUsers = () => model.find();

  const findUserById = (userId) => model.findById(userId);

  const findUserByUsername = (username) =>
    model.findOne({ username });

  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

  const findUsersByRole = (role) => model.find({ role });

  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  const createUser = async (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return await model.create(newUser);
  };

  const updateUser = async (userId, userUpdates) => {
    return await model.findByIdAndUpdate(userId, userUpdates, { new: true });
  };

  const deleteUser = async (userId) => {
    return await model.findByIdAndDelete(userId);
  };

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    createUser,
    updateUser,
    deleteUser,
  };
}
