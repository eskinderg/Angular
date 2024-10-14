import { AuthJWT } from './auth.jwt.interceptor';
import { HttpErrorInterceptor } from './http.error.interceptor';

export const appInterceptors = [AuthJWT, HttpErrorInterceptor];
