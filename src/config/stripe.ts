import { loadStripe } from "@stripe/stripe-js";

export const getStripeInstance = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return loadStripe(publishableKey || "");
};
