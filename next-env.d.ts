/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface Window {
	Kakao: {
		init: (key: string) => void,
		Auth: {
			setAccessToken: (key: string) => void,
			getAccessToken: () => string,
			logout: any,
		},
		API: {
			request: any,
		},
	};
}
