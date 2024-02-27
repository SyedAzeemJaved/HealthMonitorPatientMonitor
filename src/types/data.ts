interface BasicUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

interface CustomerProps extends BasicUser {
  accessToken: string;
  authenticated: boolean;
}

export interface PatientProps extends CustomerProps {
  readonly user_role: 'patient';
  readonly history: PatientHistory[];
}

export interface PatientHistory {
  spo2_reading: number;
  systolic_reading: number;
  diastolic_reading: number;
  temp_reading: number;
  heartbeat_reading: number;
  id: number;
}
