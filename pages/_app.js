import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { I18nextProvider } from 'react-i18next';
import { CookiesProvider } from 'react-cookie';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import isNode from 'is-node';
import configureStore from '../redux/store';

/* eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }] */
const GlobalStyle = createGlobalStyle`
    ${styledNormalize}
`;

let i18nServer;
let cookies;
class Wrapper extends App
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    static async getInitialProps({ Component, ctx })
    {
        let initialI18nStore;
        let initialLanguage;
        let pageProps = {};

        if (Component.getInitialProps)
        {
            pageProps = await Component.getInitialProps(ctx);
        }

        if (ctx.req)
        {
            const { i18n, universalCookies } = ctx.req;

            i18nServer = i18n;
            initialI18nStore = {};
            initialLanguage = i18n.language;

            i18n.languages.forEach((l) => {
                initialI18nStore[l] = i18n.services.resourceStore.data[l];
            });

            cookies = universalCookies;
        }

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
                <CookiesProvider cookies={cookies}>
                    <GlobalStyle />
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </CookiesProvider>

            </I18nextProvider>
        );
    }
}

export default withRedux(configureStore)(Wrapper);
