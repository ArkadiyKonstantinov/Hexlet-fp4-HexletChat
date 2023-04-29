import { useContext } from 'react';

import { AuthContext, BackendApiContext } from '../contexts/index.jsx';

const useAuth = () => useContext(AuthContext);
const useBackendApi = () => useContext(BackendApiContext);

export { useAuth, useBackendApi };
