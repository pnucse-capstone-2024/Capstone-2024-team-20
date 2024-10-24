import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Auth } from '../utils/type';
import { AuthContext } from './AuthContext';
import {
  getAccessToken, getUserEmail, getUserType, isExpiredToken, parseJwt, removeUserSessionData,
  setAccessToken,
  setExp,
} from '../utils/auth';
import { fetchWithHandler } from '../utils/fetchWithHandler';
import { reissue } from '../apis/reissue';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({
    isLogin: false,
    email: null,
    userType: null,
    accessToken: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const value = useMemo(() => ({ auth, setAuth, loading }), [auth, setAuth, loading]);

  useEffect(() => {
    const task = async () => {
      const accessToken = getAccessToken();

      if (accessToken !== null) {
        const email = getUserEmail();
        const userType = getUserType();

        if (isExpiredToken()) {
          await fetchWithHandler(() => reissue({ accessToken }), {
            onSuccess: (response) => {
              const newToken = response.headers.authorization;
              const { exp } = parseJwt(newToken);

              setAccessToken(newToken);
              setExp(exp);

              setAuth({
                isLogin: true,
                email,
                userType,
                accessToken,
              });
            },
            onError: () => {
              removeUserSessionData();
            },
          });
        } else {
          setAuth({
            isLogin: true,
            email,
            userType,
            accessToken,
          });
        }
      } else {
        removeUserSessionData();
      }

      setLoading(false);
    };

    task();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
