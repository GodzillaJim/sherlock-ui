import { Order } from "../../../graphql/common";

export const calculateOrderPrice = (order: Order): number => {
  if (!order.numberOfPages || order.numberOfPages < 0) return 0;
  let price = 5;
  const maxPricePerPage = 15;
  const normalPricePerPage = 10;
  const maxUrgencySurcharge = 5;
  const urgencyTimeFrame = 7 * 24 * 60 * 60 * 1000;
  let pricePerPage: number;

  if (order?.wordsPerPage && order.wordsPerPage > 300) {
    pricePerPage = maxPricePerPage;
  } else {
    pricePerPage = normalPricePerPage;
  }

  if (order.numberOfPages <= 5) {
    price += order.numberOfPages * pricePerPage;
  } else {
    price += 5 * pricePerPage;
    price += (order.numberOfPages - 5) * maxPricePerPage;
  }

  // Urgency pricing
  const now = new Date();
  const deadline = new Date(order.deadline);
  const timeUntilDeadline = deadline.getTime() - now.getTime();

  if (timeUntilDeadline < urgencyTimeFrame) {
    price += maxUrgencySurcharge * (1 - timeUntilDeadline / urgencyTimeFrame);
  }

  return Math.ceil(price);
};

type PriceWithCurrencyProps = {
  currency: string;
  amount: number;
};
export const priceWithCurrency = ({
  currency,
  amount,
}: PriceWithCurrencyProps) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
