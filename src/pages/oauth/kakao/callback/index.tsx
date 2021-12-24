import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs';
import { useRouter } from 'next/router';
import Loading from 'components/common/Loading';
import { ModalContext } from 'context';
import { db } from 'utils/api/firebase';
import { setDoc, doc } from 'firebase/firestore/lite';
import { login } from 'features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { UserSliceStateType } from 'features/types/userSliceType';
import { KAKAO_REDIRECT_URI } from 'utils/constants';
import { RootState } from 'app/store';

const Index = () => {
	const dispatch = useDispatch();
	const { showModal } = useContext(ModalContext);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { kakao } = useSelector((state: RootState) => state.common);

	useEffect(() => {
		if (kakao) {
			setUsers();
		}
	}, [kakao]);

	const setUsers = async () => {
		setLoading(true);
		try {
			const token = await getToken();
			const userProfileData = await getProfile();
			await registerUser(userProfileData, token);
			setLoading(false);
			router.push('/profile');
		} catch (err) {
			console.log(err);
			setLoading(false);
			import('components/common/Alert').then(({ default: Component }) => {
				showModal({
					component: Component,
					modalProps: {
						title: '로그인 취소',
						extraData: {
							desc: '로그인을 취소하셨습니다',
							onClose: () => router.push('/login'),
						},
					},
				});
			});
		}
	};

  const getToken = async () => {
		const payload = qs.stringify({
			grant_type: 'authorization_code',
			client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
			redirect_uri: KAKAO_REDIRECT_URI,
			code: new URL(window.location.href).searchParams.get('code'),
			client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
		});

		const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
		// 로그인을 하고 refreshtoken을 다 알아야겠네
		// 접속할때마다  https://vlee.kr/4896
		kakao.Auth.setAccessToken(res.data.access_token);
		localStorage.setItem('token', res.data.access_token);
		return res.data.access_token;
	};

	const getProfile = async () => {
		return await kakao.API.request({
			url: '/v2/user/me',
		});
	};

	const registerUser = async (userProfileData: {id: number, kakao_account: any}, token: string) => {
		const { id, kakao_account } = userProfileData;
		const { profile, email_needs_agreement, email, has_email, gender_needs_agreement, has_gender, gender } = kakao_account;

		const cityRef = doc(db, 'users', String(id));
		const payload = {
		  id,
		  token,
		  name: profile.nickname,
		  profileImage: profile.profile_image_url,
		  email: !email_needs_agreement && has_email ? email : "",
		  gender: !gender_needs_agreement && has_gender ? gender : ""
		} as UserSliceStateType;
		setDoc(cityRef, payload);
		dispatch(login(payload));
	};

	return (
		<>
			{loading && <Loading />}
			<LoginBlock>
				<header>
					<h1>청바지</h1>
				</header>
				<main>
					<article>it 시대가 무서운 시니어를 응원합니다!</article>
					<article>
						<img src="/static/image/auth/kakao-login-btn.png" alt="카카오로그인버튼" />

						<div>로그인하지 않고 둘러보기</div>
					</article>
				</main>
			</LoginBlock>
		</>
	);
};

const LoginBlock = styled.div`
	padding: 20px 30px;
	height: 100vh;
	header {
		font-size: 12px;
		text-align: center;
	}

	article img {
		width: 100%;
		height: 50px;
	}
`;
export default Index;
