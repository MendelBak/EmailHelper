const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  familyName: String,
  givenName: String,
  googleId: String,
  facebookId: String,
  githubId: String,
  githubBio: String,
  // credits = account credits to enable survey purchase.
  credits: {type: Number, default: 0},
});

// first arg = name of model. second arg = schema to use.
mongoose.model('users', userSchema);
