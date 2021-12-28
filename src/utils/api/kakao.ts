import axios, { AxiosResponse } from "axios";
import qs from "qs";

// todo: 여기에 kakao 가져와야하는데 어떻게 해야할지 생각좀 합시당

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

export const getKakaoUser = async (kakao: any) => {
  return await kakao.API.request({
    url: "/v2/user/me",
  });
};
