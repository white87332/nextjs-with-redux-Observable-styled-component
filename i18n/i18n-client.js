const i18n = require('i18next');

i18n.init({
    whitelist: [
        'en-us', 'zh-tw'
    ],

    fallbackLng: 'en-us',

    lowerCaseLng: true,

    debug: false,
    load: 'currentOnly',

    // have a common namespace used around the full app
    ns: [
        'common', 'counter'
    ],
    defaultNS: 'common',

    interpolation: {
        escapeValue: false // not needed for react!!
    }
});

exports.i18n = i18n;
