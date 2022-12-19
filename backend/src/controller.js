import UserModel from './model.js';

const getAllUsers = (req, res) => {
  UserModel.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log('Error: getAllUsers');
      console.log(err.message);
      res.status(500).send();
    })
}

const getUserById = (req, res) => {
  UserModel.findById(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        console.log('Error: getUserById');
        console.log('user does not exist');
        res.status(400).send();
      }
    })
    .catch((err) => {
      console.log('Error: getUserById');
      console.log(err.message);
      if (err.name == 'CastError') {
        res.status(400).send();
      } else {
        res.status(500).send();
      }
    })
}

const addUser = (req, res) => {
  if (
    !req.body.name &&
    !req.body.email &&
    !req.body.address
  ) {
    res.status(400).send();
    return;
  }
  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  newUser.save()
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      console.log('Error: addUser')
      console.log(err.message)
      if (err.name == 'ValidationError') {
        res.status(400).send();
      } else {
        res.status(500).send();
      }
    })
}

const updateUser = (req, res) => {
  if (!(
    req.body.name ||
    req.body.email ||
    req.body.address
  )) {
    res.status(400).send();
    return;
  }
  UserModel.findByIdAndUpdate(req.params.id, {
    name: req.body.name || undefined,
    email: req.body.email || undefined,
    address: req.body.address || undefined
  }, {
    new: true,
    runValidators: true
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log('Error: updateUser')
      console.log(err.message)
      if (err.name == 'ValidationError' || err.name == 'CastError') {
        res.status(400).send();
      } else {
        res.status(500).send();
      }
    })
}

const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        console.log('Error: deleteUser');
        console.log('user does not exist');
        res.status(400).send();
      }
    })
    .catch((err) => {
      console.log('Error: deleteUser');
      console.log(err.message);
      if (err.name == 'CastError') {
        res.status(400).send();
      } else {
        res.status(500).send();
      }
    })
}

export {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}