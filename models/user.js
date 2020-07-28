const mongoose = require('mongoose');
// imports that looks like this are called ''
const { Schema } = mongoose;

const userSchema = new Schema({
  familyName: String,
  givenName: String,
  googleId: String,
  facebookId: String,
  githubId: String,
  githubBio: String,
});

// first arg = name of model. second arg = schema to use.
mongoose.model('users', userSchema);
