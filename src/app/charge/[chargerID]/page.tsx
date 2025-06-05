"use client";

import QueryChargeSession from "@/app/components/query-charge-session";
import SubscribeToChargeSession from "@/app/components/subscribe-charge-session";
import ChargeRateController from "@/app/components/ChargeRateController";
import client from "@/app/contexts/graphql/graphql";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "next/navigation";

// A toggle between task 1 and task 4.
var useSubscription = false;

export default function ChargePage() {
  const params = useParams();
  const chargerId = params?.chargerID as string;

  if (!chargerId) {
    return <p className="p-4 text-red-500">No charger ID provided.</p>;
  }

  return (
    <ApolloProvider client={client}>
      <div className="font-normal text-black font-base p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Charger ID: {chargerId}</h1>

        {useSubscription ? (
          <SubscribeToChargeSession />
        ) : (
          <ChargeRateController chargerId={chargerId} />
        )}
      </div>
    </ApolloProvider>
  );
}
