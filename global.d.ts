interface Window {
  Kakao: {
    init: (key: string) => void;
    Auth: {
      setAccessToken: (key: string) => void;
      getAccessToken: () => string;
      logout: any;
    };
    API: {
      request: any;
    };
  };
}
