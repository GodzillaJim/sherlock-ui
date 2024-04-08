import React, { ReactNode } from "react";
import { getStripeInstance } from "../../config/stripe";
import { Elements } from "@stripe/react-stripe-js";

type StripeContextProps = {
  children: ReactNode;
  clientSecret?: string;
};

const stripePromise = getStripeInstance();
export const StripeContext = ({
  children,
  clientSecret,
}: StripeContextProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};
