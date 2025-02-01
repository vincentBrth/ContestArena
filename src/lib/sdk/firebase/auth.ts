/**
 * Auth Firebase SDK
 */
import { auth } from '$lib/sdk/firebase/config';
import { notifications } from '$lib/sdk/store/notification';
import type { Session } from '$lib/sdk/store/session';
import session from '$lib/sdk/store/session';
import {
  GoogleAuthProvider, createUserWithEmailAndPassword,
  sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword,
  signInWithPopup, signOut, type UserCredential
} from 'firebase/auth';

/**
 * Signs in a user using Google authentication.
 *
 * This function uses a popup to allow the user to sign in with their Google account.
 * Upon successful sign-in, the user's session is updated with their UID and email,
 * and a success message is displayed. If the sign-in fails, an error message is shown.
 *
 * @returns {Promise<UserCredential | void>} A promise that resolves to the result of the sign-in operation.
 */
export async function signInWithGoogle(): Promise<UserCredential | void> {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider)
    .then((result) => {
      session.update((cur: Session) => {
        return {
          ...cur,
          user: { uid: result.user.uid, email: result.user.email ? result.user.email : '' },
        };
      });
      notifications.success('Logged in successfully');
      return result
    })
    .catch((error) => {
      notifications.error(`Sign in failed : ${error.message}`);
    });
}

/**
 * Signs in a user using email and password.
 *
 * Upon successful sign-in, the user's session is updated with their UID and email,
 * and a success message is displayed. If the sign-in fails, an error message is shown.
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<UserCredential | void>} A promise that resolves to the result of the sign-in operation.
 */
export async function loginWithMail(email: string, password: string): Promise<UserCredential | void> {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      const { user }: UserCredential = result;
      if (!user.emailVerified) {
        notifications.warning('Please verify your email before logging in')
        await signOut(auth);
      } else {
        notifications.success('Logged in successfully')
        session.update((cur: Session) => {
          return {
            ...cur,
            user: { uid: user.uid, email: email },
          };
        });
        return result;
      }
    })
    .catch((error) => {
      notifications.error(`Login failed : ${error.message}`);
    });
}

/**
 * Registers a new user using email and password.
 *
 * Upon successful registration, a verification email is sent to the user's email address,
 * and a success message is displayed. If the registration fails, an error message is shown.
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<UserCredential | void>} A promise that resolves to the result of the registration operation.
 */
export async function register(email: string, password: string): Promise<UserCredential | void> {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return sendEmailVerification(result.user)
        .then(() => {
          notifications.success('Register successful');
          notifications.info('Please verify your email before logging in');
          signOut(auth)
          return result
        })
        .catch((error) => {
          notifications.error(`Error sending email verification : ${error.message}`);
        });
    })
    .catch((error) => {
      notifications.error(`Register failed : ${error.message}`);
    });
}


/**
 * Logs out the current user.
 *
 * This function signs out the current user from the Firebase authentication system.
 * Upon successful sign-out, the user's session is cleared, and a success message is displayed.
 * If the sign-out operation fails, an error message is shown.
 *
 * @returns {Promise<void>} A promise that resolves when the sign-out operation is complete.
 */
export async function logout(): Promise<void> {
  await signOut(auth)
    .then(() => {
      session.update((cur: Session) => {
        return {
          ...cur,
          user: { uid: '', email: '' },
        };
      });
      notifications.success('Logged out successfully');
    })
    .catch((error) => {
      notifications.error(`Logout failed : ${error.message}`);
    });
}


/**
 * Sends a password reset email to the user.
 *
 * This function sends a password reset email to the specified email address.
 * Upon successful sending, a success message is displayed. If the operation fails,
 * an error message is shown.
 *
 * @param {string} email The user's email address.
 * @returns {Promise<void>} A promise that resolves when the password reset email is sent.
 */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      notifications.success('Reset password email sent');
    })
    .catch((error) => {
      notifications.error(`Reset password failed : ${error.message}`);
    });
}