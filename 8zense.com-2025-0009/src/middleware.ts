import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const handleI18nRouting = createMiddleware(routing);
 
const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);
const isPublicRoute = createRouteMatcher(['/locale/sign-in(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Assuming that the 'auth' object has a 'protect' method
    await auth.protect();
  }
  return handleI18nRouting(req);
});
 


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', "/:locale", "/:locale/sign-in", "/de/sign-in", "/fr/sign-in", '/(de|fr|en)/:path*','/sign-in','/sign-out', "/:locale", "/:locale/sign-in",  "/de/sign-in", "/fr/sign-in", '/(api|trpc)(.*)'
    
  ],
};
