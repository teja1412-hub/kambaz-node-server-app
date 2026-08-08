import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    try {
      const updatedUser = await dao.updateUser(userId, userUpdates);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = { ...currentUser, ...userUpdates };
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await dao.deleteUser(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    try {
      let users;
      if (role) {
        users = await dao.findUsersByRole(role);
      } else if (name) {
        users = await dao.findUsersByPartialName(name);
      } else {
        users = await dao.findAllUsers();
      }
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await dao.findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const signup = async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }

      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      if (!currentUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  const signout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.sendStatus(200);
    });
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById); 
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}