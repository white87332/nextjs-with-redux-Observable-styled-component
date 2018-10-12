const express = require('express');
const next = require('next');
const { parse } = require('url');
const i18nMiddleware = require('i18next-express-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const bodyParser = require('body-parser');
const getRoutes = require('./routes');
const { i18n } = require('./i18n/i18n-server');
const middlewareApiRoutes = require('./middleware/routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const apiHandler = app.getRequestHandler();
const pageRoutes = getRoutes();

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());
        server.use(i18nMiddleware.handle(i18n));
        server.use(cookiesMiddleware());

        if (!dev)
        {
            server.use(require('compression')());
            server.use(require('helmet')());
        }

        middlewareApiRoutes(server)
            .then(() => {
                server.get('*', (req, res) => {
                    const parseUrl = parse(req.url, true);
                    const { pathname, query = {} } = parseUrl;
                    const route = pageRoutes[pathname];
                    if (route)
                    {
                        return app.render(req, res, route.page, query);
                    }
                    return apiHandler(req, res);
                });
            });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
