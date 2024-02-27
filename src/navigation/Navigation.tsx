import { useContext } from 'react';

import { UserContextProps } from '@types';
import { AuthContext } from '@context';

import { Loader } from '@common';

import Overview from '../pages/Dashboard/Overview';
import SignIn from '../pages/Authentication/SignIn';

const templateToRender = (isAuthenticated: boolean) => {
  return <>{isAuthenticated ? <Overview /> : <SignIn />}</>;
};

export function Navigation() {
  const { user, loading } = useContext(AuthContext) as UserContextProps;

  return loading ? <Loader /> : templateToRender(user.authenticated);
}
