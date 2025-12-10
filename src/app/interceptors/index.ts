import { HttpErrorInterceptor } from './http.error.interceptor';
import { ServerTimeInterceptor } from './server.time.interceptor';

export const appInterceptors = [HttpErrorInterceptor, ServerTimeInterceptor];
