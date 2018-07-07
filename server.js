const express = require('express');
const next = require('next');
// const i18nMiddleware = require('i18next-express-middleware');
const routes = require('./routes');
// const { i18n } = require('./i18n/i18n-server');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare()
    .then(() => {
        const server = express();

        // server.use(i18nMiddleware.handle(i18n));

        server.use(handler);

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`)
        });
    });
