import withSession from "./../utils/withSession";

export default function Logout() {}

export const getServerSideProps = withSession(async function ({ req }) {
  if (req.session.get("authKey")) {
    req.session.destroy();
  }

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
});
