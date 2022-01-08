import axios, { AxiosResponse } from "axios";
import qs from "qs";
let kakao = null as any;
if (typeof window !== "undefined") {
  kakao = window.Kakao;
}

interface IGetToken {
  access_token: string;
}

export const getKakaoUserToken = async (payload: {
  [index: string]: string | undefined | null;
}) => {
  const response: AxiosResponse<IGetToken> = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    qs.stringify(payload)
  );
  return response.data;
};

export const getKakaoUser = async () => {
  return await kakao.API.request({
    url: "/v2/user/me"
  });
};

export const logoutKakao = () => {
  return kakao.Auth.logout();
};

export const withDrawalKakao = async (successCallback: () => Promise<void>) => {
  logoutKakao();
  await kakao.API.request({
    url: "/v1/user/unlink",
    success: async () => {
      await successCallback();
    },
    fail: function (error: string) {
      console.log(error);
    }
  });
};
