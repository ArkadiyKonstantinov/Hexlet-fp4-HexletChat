const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
};

export default routes;
