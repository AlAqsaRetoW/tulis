import { auth, provider, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    // If user document doesn't exist, create it
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        role: 'customer'
      });
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential;
  } catch (error) {
    let customMessage;

    switch (error.code) {
      case 'auth/popup-closed-by-user':
        customMessage = "Popup closed by user"
        break;
      case 'auth/unauthorized-domain':
        customMessage = "This domain is not authorized for Google sign-in"
        break;
      default:
        customMessage = "An error occurred during Google sign-in"
    }

    throw {
      customMessage
    }
  }
}