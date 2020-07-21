const passport = require('passport');

module.exports = (app) => {
  // Google OAuth routes
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

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
      res.redirect('/');
    }
  );

  // Github auth route
  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback', passport.authenticate('github'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    if (req.user === undefined) {
      res.send('You were logged out previously.');
    } else {
      req.logout();
      res.send('You are now logged out.');
    }
  });
};
