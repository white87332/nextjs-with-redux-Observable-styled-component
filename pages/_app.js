import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { I18nextProvider } from 'react-i18next';
import isNode from 'is-node';
import configureStore from '../redux/store';

let i18nServer;
class Wrapper extends App
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    static async getInitialProps({ Component, ctx })
    {
        let pageProps = {};
        if (Component.getInitialProps)
        {
            pageProps = await Component.getInitialProps(ctx);
        }

        const { i18n } = ctx.req;

        // i18n
        i18nServer = i18n;
        let initialI18nStore = {};
        let initialLanguage = i18n.language;

        i18n.languages.forEach((l) => {
            initialI18nStore[l] = i18n.services.resourceStore.data[l];
        });

        return {
            pageProps,
            initialI18nStore,
            initialLanguage
        };
    }

    render()
    {
        let {
            Component, pageProps, store, initialI18nStore, initialLanguage
        } = this.props;

        let i18n = isNode ? i18nServer : require('../i18n/i18n-client').i18n.default;

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
