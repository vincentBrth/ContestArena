/*
* Define the routes of the application.
**/

/**
 * Represents a route in the application.
 * 
 * @interface Route
 * @property {string} name - The name of the route.
 * @property {string} icon - The icon associated with the route.
 * @property {string} description - A brief description of the route.
 * @property {string} path - The path or URL of the route.
 */
interface Route {
    name: string;
    title: string;
    icon: string;
    description: string;
    path: string;
}

// Home
export const HomeRoute: Route = { name: 'home', title: 'Contest Arena', icon: 'home', description: "", path: '/' };
// User
export const SigninRoute: Route = { name: 'sign in', title: 'sign in', icon: 'login', description: "sign in ?", path: '/user/signIn' };
export const LogoutRoute: Route = { name: 'logout', title: 'logout', icon: 'logout', description: "disconnect", path: '/user/logout' };
export const ResetRoute: Route = { name: 'reset', title: 'reset', icon: 'reset_wrench ', description: "forgot password ?", path: '/user/reset' };
export const ProfileRoute: Route = { name: 'profile', title: 'profile', icon: 'account_circle', description: "see profile", path: '/user/profile' };

export const NavigationRoutes: Route[] = [HomeRoute, SigninRoute, LogoutRoute, ResetRoute, ProfileRoute];