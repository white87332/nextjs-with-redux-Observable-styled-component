const i18n = require('i18next');
const Backend = require('i18next-node-fs-backend');
const { LanguageDetector } = require('i18next-express-middleware');

i18n.use(Backend).use(LanguageDetector).init({
    whitelist: [
        'en-us', 'zh-tw'
    ],

    fallbackLng: 'en-us',

    preload: [
        'en-us', 'zh-tw'
    ],

    // have a common namespace used around the full app
    ns: [
        'common', 'counter'
    ],

    defaultNS: 'common',

    debug: false,

    load: 'currentOnly',

    lowerCaseLng: true,

    interpolation: {
        escapeValue: false, // not needed for react!!
    },

    backend: {
        loadPath: 'static/locales/{{lng}}/{{ns}}.json',
        jsonIndent: 2
    }
});

exports.i18n = i18n;
