import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { I18nextProvider } from 'react-i18next';
import stringifyObject from 'stringify-object';
import isNode from 'is-node';
import configureStore from '../redux/store';

class Wrapper extends App
{
    static async getInitialProps({ Component, ctx })
    {
        let pageProps = {};
        if (Component.getInitialProps)
        {
            pageProps = await Component.getInitialProps(ctx);
        }

        const { i18n } = ctx.req;

        // i18n
        let initialI18nStore = {};
        let initialLanguage = i18n.language;

        i18n.languages.forEach((l) => {
            initialI18nStore[l] = i18n.services.resourceStore.data[l];
        });
// console.log(i18n);

        return {
            pageProps,
            i18n: stringifyObject(i18n),
            initialI18nStore,
            initialLanguage
        };
    }

    render()
    {
        const {
            Component, pageProps, store, i18n, initialI18nStore, initialLanguage
        } = this.props;

        if (!isNode)
        {
            i18n = require('../i18n/i18n-client').i18n.default;
        }

console.log(typeof i18n);
        return (
            <I18nextProvider
                i18n={i18n}
                initialI18nStore={initialI18nStore}
                initialLanguage={initialLanguage}
            >
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </I18nextProvider>
        );
    }
}

export default withRedux(configureStore)(Wrapper);
