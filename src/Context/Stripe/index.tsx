import React, { ReactNode } from "react";
import { getStripeInstance } from "../../config/stripe";
import { Elements } from "@stripe/react-stripe-js";

type StripeContextProps = {
  children: ReactNode;
};

const stripePromise = getStripeInstance();
export const StripeContext = ({ children }: StripeContextProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
