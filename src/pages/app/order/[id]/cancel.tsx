import React, { ReactNode, useEffect } from "react";
import MainLayout from "../../../../layout/MainLayout";
import CancelOrderComponent from "../../../../components/orders/CancelOrderComponent";
import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();
  const orderId = router.query.id;

  useEffect(() => {
    if (!orderId) {
      router.push(`/app`);
    }
  }, []);

  return (
    <div>
      <CancelOrderComponent orderId={orderId as string} />
    </div>
  );
};

Cancel.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default Cancel;
