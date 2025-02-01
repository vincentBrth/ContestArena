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
    icon: string;
    description: string;
    path: string;
}

// Home
export const HomeRoute: Route = { name: 'Home', icon: 'home', description: "", path: '/' };
// User
export const LoginRoute: Route = { name: 'Login', icon: 'login', description: "Already have an account ?", path: '/user/login' };
export const LogoutRoute: Route = { name: 'Logout', icon: 'logout', description: "Disconnect", path: '/user/logout' };
export const RegisterRoute: Route = { name: 'Register', icon: 'how_to_reg', description: "No account yet ?", path: '/user/register' };
export const ResetRoute: Route = { name: 'Reset', icon: 'reset_wrench ', description: "Forgot password ?", path: '/user/reset' };
export const ProfileRoute: Route = { name: 'Profile', icon: 'account_circle', description: "See profile", path: '/user/profile' };

export const NavigationRoutes: Route[] = []