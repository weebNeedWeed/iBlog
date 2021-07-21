import { applySession } from "next-session";
import sessionConfigure from "./../utils/sessionConfigure";

export default function Logout() {}

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, sessionConfigure);

  if (req.session.authKey) {
    await req.session.destroy();
  }

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}
