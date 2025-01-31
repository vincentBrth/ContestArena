import users from '$lib/models/users';
import { auth } from '$lib/sdk/firebase/firebase.config';
import type { UserSession } from '$lib/session';
import session from '$lib/session';
import { toasts } from '$lib/toast';
import {
  GoogleAuthProvider, createUserWithEmailAndPassword, getAdditionalUserInfo, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword,
  signInWithPopup, signOut, type UserCredential
} from 'firebase/auth';
import { toSvg } from 'jdenticon';

/**
 * Generate a profile picture from a string
 * @param pseudo 
 * @returns bin64 image
 */
export function generateAvatar(pseudo: string) {
  return `data:image/svg+xml;base64,${btoa(toSvg(pseudo, 256))}`;
}

/**
 * Login with email and password
 * @param email 
 * @param password 
 * @returns true if login is successful
 */
export async function loginWithMail(email:string, password: string) {
  let ret : boolean = false;
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      const { user }: UserCredential = result;
      if (!user.emailVerified) {
        ret = false;
        toasts.warning('Please verify your email before logging in')
        await signOut(auth);
      } else {
        ret = true;
        toasts.success('Logged in successfully')
        session.update((cur: UserSession) => {
          return {
            ...cur,
            userUid: user.uid,
            loggedIn: true
          };
        });
      }
    })
    .catch((error) => {
      toasts.error(`Login failed : ${error.message}`);
      ret = false;
    });
  
    return ret;
}

/**
 * Login with Google
 * @param email
 * @returns true if sign in is successful
 */
export async function signInWithGoogle(email : string) {
  let ret : boolean = false;
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      const pseudo: string = result.user.displayName
        ? result.user.displayName.split(' ').join('')
        : result.user.email
          ? result.user.email.split('@')[0]
          : 'Anonymous';
      const avatar: string = result.user.photoURL
        ? result.user.photoURL
        : generateAvatar(pseudo);

      if (getAdditionalUserInfo(result)?.isNewUser) {
        users.updateUserInfo(result.user.uid, { email: email, pseudo: pseudo, avatar: avatar });
      }

      session.update((cur: UserSession) => {
        return {
          ...cur,
          userUid: result.user.uid,
          loggedIn: true
        };
      });
      toasts.success('Logged in successfully');
      ret = true;
    })
    .catch((error) => {
      toasts.error(`Login failed : ${error.message}`);
      ret= false;
    });
    return ret;
}

/**
 * Register a new user
 * @param email 
 * @param password 
 * @param pseudo 
 */
export async function register(email:string, password: string, pseudo: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const avatar = generateAvatar(pseudo);
      users.updateUserInfo(result.user.uid, { email: email, pseudo: pseudo, avatar: avatar });
      sendEmailVerification(result.user)
        .then(() => {
          // Sign out until email is verified
          toasts.success('Register successful');
          toasts.info('Please verify your email before logging in');
          signOut(auth)
        })
        .catch((error) => {
          toasts.error(`Error sending email verification : ${error.message}`);
        });
    })
    .catch((error) => {
      toasts.error(`Register failed : ${error.message}`);
    });
}

/**
 * Reset password for a user
 * @param email 
 */
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      toasts.success('Reset password email sent');
    })
    .catch((error) => {
      toasts.error(`Reset password failed : ${error.message}`);
    });
}