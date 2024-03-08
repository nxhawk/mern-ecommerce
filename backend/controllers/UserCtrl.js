const UserM = require('../models/userM');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');

const createUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  // if email is existing
  const findUser = await UserM.findOne({ email: email });
  if (!findUser) {
    // Create a new user
    const newUser = await UserM.create(req.body);
    return res.json(newUser);
  } else {
    // have this user
    throw new Error('User already exists')
  }
})

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not 
  const findUser = await UserM.findOne({ email });
  if (findUser && await findUser.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await UserM.findByIdAndUpdate(findUser?._id, {
      refreshToken
    }, {
      new: true,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    });
  } else {
    throw new Error("Invalid Credentials");
  }
})

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await UserM.findOne({ refreshToken })
  if (!user) throw new Error("No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) throw new Error("There is something wrong with refresh token");
    const accessToken = generateToken(user?._id)
    res.json({ accessToken })
  });
})

// logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie?.refreshToken) throw new Error("No Refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await UserM.findOne({ refreshToken })
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await UserM.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204); // forbidden
})

// update a user
const updateaUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await UserM.findByIdAndUpdate(_id, {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile
    }, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    throw new Error(err);
  }
})

// get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await UserM.find()
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
})

// get a single user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await UserM.findById(id);
    res.json({
      getaUser
    })
  } catch (err) {
    throw new Error(err);
  }
});

// delete a single user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await UserM.findByIdAndDelete(id);
    res.json({
      deleteaUser
    })
  } catch (err) {
    throw new Error(err);
  }
});

// block user 
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await UserM.findByIdAndUpdate(id, {
      isBlocked: true,
    }, {
      new: true,
    })

    res.json({
      message: 'User blocked',
    });
  }
  catch (err) {
    throw new Error(err);
  }
})

// unblock user 
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await UserM.findByIdAndUpdate(id, {
      isBlocked: false,
    }, {
      new: true,
    })

    res.json({
      message: 'User unblocked',
    });
  }
  catch (err) {
    throw new Error(err);
  }
})

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout
};