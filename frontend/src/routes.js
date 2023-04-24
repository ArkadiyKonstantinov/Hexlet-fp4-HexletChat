const apiPath = "/api/v1";

export const routes = {
  loginPath: () => [apiPath, "login"].join("/"),
  dataPath: () => [apiPath, "data"].join("/"),
  mainPage: () => "/",
  loginPage: () => "/login",
  signUpPage: () => "/signup",
};
