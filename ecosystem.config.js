module.exports = {
    /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'app',
            script: 'server.js',
            watch: true,
            ignore_watch: ['/node_moudles'],
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};
