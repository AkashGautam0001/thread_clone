// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
// 	publicRoutes: ["/", "/api/webhook/clerk", "/api/uploadthing"],
// 	ignoredRoutes: ["/api/webhook/clerk"],
// });

// export const config = {
// 	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	// An array of public routes that don't require authentication.
	publicRoutes: ["/api/webhook/clerk"],

	// An array of routes to be ignored by the authentication middleware.
	ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
