const passport = require('passport');

module.exports = (app) => {
  // Google OAuth routes
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // Facebook OAuth routes
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: [
        'email',
        'ads_read',
        'user_age_range',
        'user_birthday',
        'user_likes',
        'user_location',
      ],
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // Github auth route
  app.get('/auth/github', passport.authenticate('github'));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // Logs out the current user.
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
