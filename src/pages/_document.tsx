import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@mui/styles';
import theme from '../../styles/theme';

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* PWA primary color */}
					<meta content={theme.palette.primary.main} name="theme-color" />
					<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	const sheet = new ServerStyleSheet();
	const materialSheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(materialSheets.collect(<App {...props} />)),
			});

		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			),
		};
	} finally {
		sheet.seal();
	}
};
