import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { I18nextProvider } from 'react-i18next';
import isNode from 'is-node';
import configureStore from '../redux/store';

let i18next = {};

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

        i18next = {
            i18n,
            initialI18nStore,
            initialLanguage
        };

        return {
            pageProps
        };
    }

    render()
    {
        const {
            Component, pageProps, store
        } = this.props;

        let i18n;
        if (isNode)
        {
            i18n = i18next.i18n;
        }
        else
        {
            i18n = require('../i18n/i18n-client').i18n.default;
        }
console.log(i18next);
        return (
            <I18nextProvider
                i18n={i18n}
                initialI18nStore={i18next.initialI18nStore}
                initialLanguage={i18next.initialLanguage}
            >
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </I18nextProvider>
        );
    }
}

export default withRedux(configureStore)(Wrapper);
