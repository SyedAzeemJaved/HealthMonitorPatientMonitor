import { PatientProps } from './data';

export interface UserContextProps {
  user: PatientProps;
  setUser: (patient: PatientProps) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (prop: boolean) => void;
  handleUpdate: (patient: PatientProps) => void;
}
