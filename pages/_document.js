import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

/* eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }] */
const GlobalStyle = createGlobalStyle`
    ${styledNormalize}
`;

export default class WrapperDocument extends Document
{
    static getInitialProps({ renderPage })
    {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render()
    {
        return (
            <html lang="en">
                <Head>
                    <GlobalStyle />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
