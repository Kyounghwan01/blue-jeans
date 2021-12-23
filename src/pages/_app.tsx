import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { DefaultSeo } from 'next-seo';
import theme from '../../styles/theme';
import { wrapper } from 'app/store';

/**
 * SEO default setting
 */
// const DEFAULT_SEO = {
// 	title: '시니어 블루진',
// 	description: '필요할때 필요한만큼, 필요할때 언제어디서든, 온라인쇼핑 처럼 보험을 편리하게',
// 	canonical: 'https://www.carrotins.com',
// 	openGraph: {
// 		type: 'website',
// 		locale: 'ko_KR',
// 		url: 'https://www.carrotins.com',
// 		title: '보험의 새로운 기준 캐롯손해보험',
// 		site_name: '캐롯손해보험',
// 		images: [{ url: 'https://cdn.carrotins.com/static/images/common/nav_sub01_img.png', width: 285, height: 167, alt: '캐롯손해보험' }],
// 	},
// 	// twitter: {
// 	//     handle: '@handle',
// 	//     site: '@site',
// 	//     cardType: 'summary_large_image',
// 	// },
// };

const App = (props: AppProps) => {
	const { Component, pageProps } = props;
	return (
		<React.Fragment>
			{/* <DefaultSeo {...DEFAULT_SEO} /> */}
			<Head>
				<title>Next App</title>
				<link href="/favicon.ico" rel="icon" />
				<meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
};

export default wrapper.withRedux(App);
