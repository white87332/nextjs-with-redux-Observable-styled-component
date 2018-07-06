import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import configureStore from '../redux/store';

class Wrapper extends App
{
    render()
    {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withRedux(configureStore)(Wrapper);
