"use client";


import React, { useEffect ,useState} from "react"; //we importe useState for task1
import { gql, useQuery, useLazyQuery } from "@apollo/client";


type ChargeRateControllerProps = {
  chargerId: string;
};


const GET_CHARGER_AND_VEHICLE = gql`
  query ChargerAndVehicle($id: String!) {
    Charger(id: $id) {
      id
      powerKwH
    }
    VehicleStateOfCharge(id: $id) {
      currentBatteryLevelKwH
      maxBatteryLevelKwH
    }
  }
`;
const GET_CHARGE_ESTIMATES = gql`
  query GetChargeEstimates($id: String!, $rate: Int!) {
    ChargeEstimates(id: $id, rate: $rate) {
      estimatedPrice
      estimatedTimeHours
    }
  }
`;

const ChargeRateController: React.FC<ChargeRateControllerProps> = ({ chargerId }) => {
  //task 1 
  const chargeRates = [
    { label: "eco", rate: 25 },
    { label: "smart", rate: 30 },
    { label: "rapid", rate: 40 },
  ];

//task 1
  const [chargeRate, setChargeRate] = useState(chargeRates[0].rate);
  
  const { data: chargerData } = useQuery(GET_CHARGER_AND_VEHICLE, {
    variables: { id: chargerId },
  });

//task 1&2
  const [getEstimates, { data: estimatesData, loading: loadingEstimates, error: estimatesError }] =
    useLazyQuery(GET_CHARGE_ESTIMATES);

  //(Task 1)
  useEffect(() => {
    if (chargerId) {
      getEstimates({ variables: { id: chargerId, rate: chargeRate } });
    }
  }, [chargeRate, getEstimates, chargerId]);
  const currentLevel = chargerData?.VehicleStateOfCharge?.currentBatteryLevelKwH ?? 0;
  const maxLevel = chargerData?.VehicleStateOfCharge?.maxBatteryLevelKwH ?? 1;
  const batteryPercent = Math.round((currentLevel / maxLevel) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6 space-y-6">
      <div className="flex items-center space-x-6">
        {/* Battery Circle */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-inner">
          {batteryPercent}%
        </div>

        {/* Controller Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-lg font-semibold">Charge Rate Controller</h2>
          
          {/* Buttons (task 1*/}
          {<div className="flex space-x-6">
            {chargeRates.map(({ label, rate }) => (
              <label
                key={rate}
                className={`cursor-pointer capitalize px-4 py-2 rounded-full border ${
                  chargeRate === rate
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="chargeRate"
                  value={rate}
                  checked={chargeRate === rate}
                  onChange={() => setChargeRate(rate)}
                  className="hidden"
                />
                {label} – {rate}¢/kWh
              </label>
            ))} 
          </div>}
          {/* Results * task 1&2*/}
          {loadingEstimates ? (
            <p className="text-gray-500">Loading charge estimates...</p>
          ) : estimatesError ? (
            <p className="text-red-500">Error: {estimatesError.message}</p>
          ) : estimatesData ? (
            <div className="space-y-1">
              <p className="text-md">
                <span className="font-medium">Estimated Price:</span> ${estimatesData.ChargeEstimates.estimatedPrice.toFixed(2)}
              </p>
              <p className="text-md">
                <span className="font-medium">Estimated Time:</span>{" "}
                {(() => {
                  const totalHours = estimatesData.ChargeEstimates.estimatedTimeHours;
                  const hours = Math.floor(totalHours);
                  const minutes = Math.round((totalHours - hours) * 60);
                  return `${hours}h${minutes.toString().padStart(2, "0")}`;
                })()}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No estimates available.</p>
          )}

          {/* Target % Placeholder */}
          <div className="text-sm italic text-gray-400 pt-4 border-t">
            Charge target % controller placeholder
          </div>


          {/* Start Button */}
          <div className="pt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold">
              Start Charging
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeRateController;