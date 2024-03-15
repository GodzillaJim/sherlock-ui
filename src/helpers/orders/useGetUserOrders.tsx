import { OrderStatus } from "../../../graphql/common";
import { useGetMyOrdersQuery } from "../../Apollo/schema/GetMyOrders.generated";

type UseGetUserOrdersProps = {
  status: OrderStatus[];
};
export const useGetUserOrders = ({ status }: UseGetUserOrdersProps) => {
  const { loading, data, error } = useGetMyOrdersQuery({
    fetchPolicy: "network-only",
    variables: { filters: { status }, pagination: {} },
  });

  return { loading, error, data };
};
