import React from "react";
import NavBarPresentation from "./NavBar.presentation";
import routes from "./../../utils/routes";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();

  return (
    <NavBarPresentation routes={routes} currentPathname={router.pathname} />
  );
}

export default NavBar;
