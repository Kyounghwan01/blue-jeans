import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ModalProvider, ModalRoot } from 'context';
import { UserSliceStateType } from 'features/types/userSliceType';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from 'utils/api/firebase';
import { wrapper } from 'app/store';
import { login } from 'features/userSlice';
import { setKakao } from 'features/commonSlice';
import theme from '../../styles/theme';
// import { DefaultSeo } from 'next-seo';
// import { Provider } from "react-redux";
// import { store } from "app/store";
import 'utils/api/firebase';

const App = (props: AppProps) => {
	const { Component, pageProps } = props;
	const dispatch = useDispatch();

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const kakao = window.Kakao;
		if (!kakao.Auth) {
			const kakaoClientKey = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
			if (kakaoClientKey) {
				kakao.init(kakaoClientKey);
				dispatch(setKakao(kakao));
			}
		}

		const localToken = localStorage.getItem('token');
		if (localToken) {
			getUsersToFirebase(localToken);
		} else {
			const token = kakao?.Auth?.getAccessToken();
			if (token) {
				getUsersToFirebase(token);
			}
		}
	};


	const getUsersToFirebase = async (token: string) => {
		const usersCollectionRef = collection(db, 'users');
		const q = await query(usersCollectionRef, where('token', '==', token));
		const data = await getDocs(q);
		const user = data.docs.map(doc => ({
			...doc.data()
		}))[0] as UserSliceStateType;
		if (user) {
			dispatch(login(user));
		}
	}

	return (
		<>
			{/* <DefaultSeo {...DEFAULT_SEO} /> */}
			<Head>
				<title>Next App</title>
				<link href="/favicon.ico" rel="icon" />
				<meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
			</Head>
			{/* <Provider store={store}> */}
			<ThemeProvider theme={theme}>
				<ModalProvider>
					<CssBaseline />
					<ModalRoot />
					<Component {...pageProps} />
				</ModalProvider>
			</ThemeProvider>
			{/* </Provider> */}
		</>
	);
};

export default wrapper.withRedux(App);
// export default (App);
