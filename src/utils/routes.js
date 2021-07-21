const routes = [
  {
    pathname: "/",
    display: "home",
    displayWhenLoggedIn: true,
    displayWhenLoggedOut: true,
  },
  {
    pathname: "/posts",
    display: "posts",
    displayWhenLoggedIn: true,
    displayWhenLoggedOut: true,
  },
  {
    pathname: "/login",
    display: "login",
    displayWhenLoggedIn: false,
    displayWhenLoggedOut: true,
  },
  {
    pathname: "/createpost",
    display: "create",
    displayWhenLoggedIn: true,
    displayWhenLoggedOut: false,
  },
  {
    pathname: "/logout",
    display: "logout",
    displayWhenLoggedIn: true,
    displayWhenLoggedOut: false,
  },
];

export default routes;
