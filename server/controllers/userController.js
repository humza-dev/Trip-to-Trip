const User = require("../models/users");
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(400).send(err);
    }

    user.password = undefined;
    res.status(201).json({ user });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with following email doen't exist. Please signup",
      });
    }

    const { _id, username, email } = user;
    return res.json({ user: _id, username, email });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signed out successfully" });
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(400).json(err);
      }
      res.save().send({ user });
    }
  );
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.userID,
    });

    if (!user) {
      res.status(404).send("user not found");
    }

    res.send("user removed successfully!");
  } catch (e) {
    res.status(500).send();
  }
};

exports.read = async (req, res) => {
  const id = req.params.userID;
  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      res.status(404).send("tour not found");
    }

    user.password = undefined;
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.readall = (req, res) => {
  User.find({}).then((users) => {
    res.status(201).send(users);
  });
};
