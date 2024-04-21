import nextCookies from "next-cookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { verifyIdToken } from "../../helpers/Auth/firebaseAdmin";

export const withRequireAuth =
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (context: GetServerSidePropsContext) => {
    try {
      const cookies = nextCookies(context);

      if (!cookies.authToken) {
        return {
          redirect: { destination: `/auth/login?next=${context.resolvedUrl}` },
        };
      }
      await verifyIdToken(cookies.authToken);

      if (getServerSidePropsFunc) {
        return getServerSidePropsFunc(context);
      }

      return { props: {} };
    } catch (error) {
      const next = context.resolvedUrl;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (error.code === "signup/id-token-expired") {
        return {
          redirect: {
            destination: `/refresh?next=${next}`,
            permanent: false,
          },
        };
      }

      return { props: {} };
    }
  };
