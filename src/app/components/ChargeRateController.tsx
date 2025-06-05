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


  //task 2)
const GET_CHARGE_ESTIMATES = gql`
  query GetChargeEstimates($id: String!) {
    ChargeEstimates(id: $id) {
      estimatedPrice
      estimatedTimeHours
    }
  }
`;


//task 3
const GET_CHARGE_DATA = gql`
  query GetChargeData($id: String!) {
    ChargeEstimates(id: $id) {
      estimatedPrice
      estimatedTimeHours
    }
    CheapestChargeWindow(id: $id) {
      startTime
      endTime
      estimatedPrice
    }
  }
`;


const ChargeRateController: React.FC<ChargeRateControllerProps> = ({ chargerId }) => {

  const { data: chargerData } = useQuery(GET_CHARGER_AND_VEHICLE, {
    variables: { id: chargerId },
  });

//task 1&2
  const [getEstimates, { data: estimatesData, loading: loadingEstimates, error: estimatesError }] =
    useLazyQuery(GET_CHARGE_ESTIMATES);

  // (task 3) 
  const [getChargeData, { data: chargeData, loading, error }] = useLazyQuery(GET_CHARGE_DATA);
  
//task 3
  useEffect(() => {
    if (chargerId) {
      getChargeData({ variables: { id: chargerId } });
    }
  }, [getChargeData, chargerId]);


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

          {/* Results  task 3*/}
          {loading ? (
            <p className="text-gray-500">Loading charge estimates...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : chargeData ? (
            <>
              <div className="space-y-1">
                <p className="text-md">
                  <span className="font-medium">Estimated Price:</span> ${chargeData.ChargeEstimates.estimatedPrice.toFixed(2)}
                </p>
                <p className="text-md">
                  <span className="font-medium">Estimated Time:</span>{" "}
                  {(() => {
                    const totalHours = chargeData.ChargeEstimates.estimatedTimeHours;
                    const hours = Math.floor(totalHours);
                    const minutes = Math.round((totalHours - hours) * 60);
                    return `${hours}h${minutes.toString().padStart(2, "0")}`;
                  })()}
                </p>
              </div> 


              {/* Cheapest Charge Window */}
              {chargeData.CheapestChargeWindow && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                  <p className="font-medium mb-1">Cheapest Charge Window:</p>
                  <p>
                    Start: {new Date(chargeData.CheapestChargeWindow.startTime).toLocaleString()}
                  </p>
                  <p>
                    End: {new Date(chargeData.CheapestChargeWindow.endTime).toLocaleString()}
                  </p>
                  <p>
                    Price: ${chargeData.CheapestChargeWindow.estimatedPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </>
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