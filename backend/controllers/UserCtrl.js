const UserM = require('../models/userM');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require("./emailCtrl");
const crypto = require('crypto');

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

//admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not 
  const findAdmin = await UserM.findOne({ email });
  if (findAdmin.role !== 'admin') throw new Error("Not authorized");
  if (findAdmin && await findAdmin.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await UserM.findByIdAndUpdate(findAdmin?._id, {
      refreshToken
    }, {
      new: true,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id)
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

//update password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const password = req.body.password;
  validateMongoDbId(_id);
  const user = await UserM.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await UserM.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (err) {
    throw new Error(err);
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await UserM.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) throw new Error('Token Expried, Please try again later')
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
})

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await userM.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
})

// save user address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const updatedUser = await userM.findByIdAndUpdate(_id, {
      address: req?.body?.address
    }, { new: true });
    res.json(updatedUser);
  } catch (err) { throw new Error(err); }
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
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress
};