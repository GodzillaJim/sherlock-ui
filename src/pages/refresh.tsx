import { useAuth } from "../Context/AuthManager";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Refresh = () => {
  const { refresh, user, loading } = useAuth();
  const router = useRouter();
  const { next } = router.query;

  const triggered = useRef(false);

  useEffect(() => {
    // Initial user value is null
    // So user check is only valid after loading is complete
    if (!triggered.current && !loading) {
      triggered.current = true;

      if (user) {
        refresh();

        if (!next) {
          // Default to search page if no next query
          router.push("/");
        }
      } else {
        const url = next ? `/auth/login?next=${next}` : `/auth/login?next=/`;
        router.push(url);
      }
    }
  }, [loading]);
};

export default Refresh;
