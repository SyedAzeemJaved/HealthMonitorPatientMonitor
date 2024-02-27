import { useState, useContext, useEffect } from 'react';

import { AuthContext } from '@context';

import { UserContextProps, PatientHistory } from '@types';

import { constants } from '@constants';

const Overview = () => {
  const { user } = useContext(AuthContext) as UserContextProps;

  const [patientHistroy, setPatientHistory] = useState<PatientHistory>({
    systolic_reading: 0,
    diastolic_reading: 0,
    temp_reading: 0,
    spo2_reading: 0,
    heartbeat_reading: 0,
    id: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        try {
          const res = await fetch(constants.HISTORY, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${user.accessToken}`,
            },
          });

          const response = await res.json();

          if (res.status !== 200)
            throw new Error(
              typeof response?.detail === 'string'
                ? response.detail
                : 'Something went wrong',
            );

          if (response.length > 0) {
            setPatientHistory(response.pop());
          }
        } catch (err: any) {}
      })();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#000] text-white">
        {/* Top row */}
        <div className="flex h-1/2 w-full flex-row">
          <div className="relative flex h-full w-1/2 flex-col items-end justify-end p-4 text-[#06EA06]">
            <div className="absolute right-4 top-4">
              <p className="text-lg">NIBP</p>
              <p className="text-base">mmH</p>
            </div>

            <p className="text-9xl font-extrabold">
              {patientHistroy.systolic_reading}
            </p>
            <p className="text-9xl font-extrabold">
              {patientHistroy.diastolic_reading}
            </p>
          </div>
          <div className="relative flex h-full w-1/2 flex-col items-end justify-end p-4 text-[#F8E21A]">
            <div className="absolute right-4 top-4">
              <p className="text-lg">Pulse</p>
              <p className="text-base">bpm</p>
            </div>

            <p className="text-9xl font-extrabold">
              {patientHistroy.heartbeat_reading}
            </p>
          </div>
        </div>
        {/* End top row */}
        {/* Bottom row */}
        <div className="flex h-1/2 w-full flex-row">
          <div className="relative flex h-full w-1/2 flex-col items-end justify-end p-4 text-[#FC1B47]">
            <div className="absolute right-4 top-4">
              <p className="text-lg">SpO2</p>
              <p className="text-base">%</p>
            </div>

            <p className="text-9xl font-extrabold">
              {patientHistroy.spo2_reading}
            </p>
          </div>
          <div className="relative flex h-full w-1/2 flex-col items-end justify-end p-4 text-[#17E6E3]">
            <div className="absolute right-4 top-4">
              <p className="text-lg">Temperature</p>
              <p className="text-base">°F</p>
            </div>

            <p className="text-9xl font-extrabold">
              {patientHistroy.temp_reading}
            </p>
          </div>
        </div>
        {/* End bottom row */}
      </div>
    </>
  );
};

export default Overview;
