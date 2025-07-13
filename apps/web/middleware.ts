import { authConfig } from './auth';
const authMiddleware = authConfig.auth;

export { authMiddleware as middleware };
