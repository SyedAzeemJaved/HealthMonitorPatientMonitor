import { ReactNode, useState, useEffect, useCallback } from 'react';

import { AuthContext } from './AuthContext';
import { PatientProps, UserContextProps } from '@types';

import { constants } from '@constants';

const blankPatient: PatientProps = {
  id: 0,
  name: '',
  email: '',
  accessToken: '',
  authenticated: false,
  user_role: 'patient',
  history: [],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [patient, setPatient] = useState<PatientProps>(blankPatient);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const t = await localStorage.getItem('token');

        if (!t) throw new Error('Logged out');

        const res = await fetch(constants.ME, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });

        if (res.status !== 200) throw new Error('Logged out');

        const response = await res.json();

        if (res.status !== 200)
          throw new Error(
            typeof response?.detail === 'string'
              ? response.detail
              : 'Something went wrong',
          );

        setPatient({
          id: response.id,
          name: response.name,
          email: response.email,
          accessToken: t,
          authenticated: true,
          user_role: 'patient',
          history: response.history,
        });
      } catch (err: any) {
        await localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUser = useCallback((patient: PatientProps) => {
    setPatient(patient);
    localStorage.setItem('token', patient?.accessToken as string);
  }, []);

  const handleUpdate = useCallback((props: PatientProps) => {
    setPatient((prev) => ({ ...prev, ...props }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setPatient(blankPatient);
  };

  const val: UserContextProps = {
    user: patient,
    setUser: handleUser,
    handleUpdate: handleUpdate,
    logout: handleLogout,
    loading: loading,
    setLoading: setLoading,
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
