const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // changeOrigin: true,
    })
  );
  app.use(
    ['/api', '/auth/facebook'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // changeOrigin: true,
    })
  );
  app.use(
    ['/api', '/auth/github'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // changeOrigin: true,
    })
  );
};
