import { useContext, createContext, useState, useEffect } from "react";
import Ls from "./Ls";
import Http from '@harry/js/services/Http';

const fakeAuth = {
    isAuthenticated: !!Ls.get('auth.token', false),
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      cb();
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      cb();
    }
};

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(fakeAuth.isAuthenticated);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser(true);
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      Ls.remove('auth.token');
      cb();
    });
  };

  const getUserInfo = async () => {
    if (!user) {
      return null;
    }

    try {
      const res = await Http.get('user');
      setUser(res.data)
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    if (user && !user.id) {
      getUserInfo();
    }
  }, [user])

  return {
    user,
    signin,
    signout
  };
}