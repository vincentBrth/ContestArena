/*
* Define the routes of the application.
**/

interface Route {
    name: string;
    icon: string;
    description: string;
    path: string;
}

// User
export const LoginRoute: Route = { name: 'Login', icon: 'login', description: "Already have an account ?", path: '/user/login' };
export const LogoutRoute: Route = { name: 'Logout', icon: 'logout', description: "Disconnect", path: '/user/logout' };
export const RegisterRoute: Route = { name: 'Register', icon: 'how_to_reg', description: "No account yet ?", path: '/user/register' };
export const ResetRoute: Route = { name: 'Reset', icon: 'reset_wrench ', description: "Forgot password ?", path: '/user/reset' };
export const ProfileRoute: Route = { name: 'Profile', icon: 'account_circle', description: "See profile", path: '/user/profile' };

export const NavigationRoutes: Route[] = []