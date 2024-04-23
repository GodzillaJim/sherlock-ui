import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useGetPublicOrdersQuery } from "../../Apollo/schema/GetPublicOrders.generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFilters } from "../../store/filters";

const usePaginateOrders = () => {
  const router = useRouter();
  const query = router.query;
  const [page] = useState(1);

  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const handleChange = (
    field: string,
    value?: string | number | null | string[]
  ) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  const clearFilters = () => {
    const temp: Record<string, null> = {};
    Object.keys(filters).forEach((key) => {
      temp[key] = null;
    });

    dispatch(setFilters(temp));
  };

  const pathFilters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter((keyValue) => Boolean(keyValue[1]))
    );
  }, [filters]);

  useEffect(() => {
    router.push({ pathname: router.pathname, query: pathFilters }, undefined, {
      shallow: true,
    });
  }, [pathFilters]);

  const processFilters = (currentFilters: typeof filters) => {
    const { ...rest } = currentFilters;

    return rest;
  };

  const { data, error, loading } = useGetPublicOrdersQuery({
    variables: {
      pagination: { currentPage: page },
      filter: { ...processFilters(filters), limit: 100 },
    },
  });

  const setPage = (pageNumber: number) => {
    if (pageNumber !== page) {
      const updatedQuery = { ...query, pageNumber };
      router.push(
        {
          pathname: router.pathname,
          query: updatedQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return {
    page,
    setPage,
    data,
    loading,
    error,
    filters,
    handleChange,
    clearFilters,
  };
};

export default usePaginateOrders;
