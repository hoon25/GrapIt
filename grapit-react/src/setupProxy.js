const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
  app.use(
    '/sock',
    createProxyMiddleware({
      target: 'http://localhost:9001',
      changeOrigin: true,
    }),
  );
};
