import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
// import { I18nextProvider } from 'react-i18next';
import configureStore from '../redux/store';
// import i18n from '../i18n/i18n-server';

class Wrapper extends App
{
    // static async getInitialProps({ ctx })
    // {
    //     const { query, params, i18n } = ctx.req;
    //
    //     // i18n
    //     let initialI18nStore = {};
    //     let initialLanguage = i18n.language;
    //
    //     i18n.languages.forEach((l) => {
    //         initialI18nStore[l] = i18n.services.resourceStore.data[l];
    //     });
    //
    //     return {
    //         query,
    //         params,
    //         i18n: {
    //             i18n,
    //             initialI18nStore,
    //             initialLanguage
    //         }
    //     };
    // }

    render()
    {
        const {
            Component, pageProps, store, i18n
        } = this.props;
// console.log(i18n);
        return (
            // <I18nextProvider
            //     i18n={i18n}
            //     initialI18nStore={i18n.initialI18nStore}
            //     initialLanguage={i18n.initialLanguage}
            // >
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            // </I18nextProvider>
        );
    }
}

export default withRedux(configureStore)(Wrapper);
