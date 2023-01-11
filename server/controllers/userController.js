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
exports.remove = (req, res) => {
  User.findOneAndRemove({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.status(400).json(err);
    }
    res.send("User removed successfully");
  });
};
exports.read = (req, res) => {
  User.findById({ _id: req.params.userID }).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        err: "user not found",
      });
    }

    req.profile = user;
    user.password = undefined;
    res.send(user);
  });
};
exports.readall = (req, res) => {
  User.find({}).then((users) => {
    res.status(201).send(users);
  });
};
