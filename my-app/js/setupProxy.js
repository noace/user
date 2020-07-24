module.exports = app => {

    const httpProxy = require('http-proxy');
    const apiProxy = httpProxy.createProxyServer({
        target: 'http://localhost:3001',
        changeOrigin: true,
    });

    app.all(['/api/*'], (req, res) => apiProxy.web(req, res));
};
