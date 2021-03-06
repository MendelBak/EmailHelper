// prod.js - production keys here

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  callbackUrlGoogle: process.env.CALLBACK_URL_GOOGLE,
  callbackUrlGithub: process.env.CALLBACK_URL_GITHUB,
  callbackUrlFacebook: process.env.CALLBACK_URL_FACEBOOK,
  stripeKey: process.env.STRIPE_KEY,
  stripeSecret: process.env.STRIPE_SECRET,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
