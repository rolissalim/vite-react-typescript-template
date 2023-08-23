const compression = require('compression');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const { resolve } = require('path');

// Compress all HTTP responses
app.use(compression());

// MAIN
app.use(
    '/api/v1',
    createProxyMiddleware({
        target: 'https://rest-api-stock-item.up.railway.app/api/',
        docs: 'https://rest-api-stock-item.up.railway.app/api-docs',
        changeOrigin: true,
        pathRewrite: {
            [`^/api/v1`]: '',
        },
    })
);

app.use(
    '/media',
    createProxyMiddleware({
        target: 'https://rest-api-stock-item.up.railway.app/',
        docs: 'https://rest-api-stock-item.up.railway.app/api-docs',
        changeOrigin: true,
        pathRewrite: {
            [`^/api/v1`]: '',
        },
    })
);

app.use(express.static('build'));

app.get('*', (req, res) => res.sendFile(resolve('build', 'index.html')));
app.listen(9011);
