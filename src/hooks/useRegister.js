import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

async function useRegister(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //create user on firestore by uid
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        role: 'customer'
      });

      return userCredential;
    } catch (err) {
      let customMessage;
      switch (err.code) {
        case 'auth/weak-password':
          customMessage = 'Password must be more than 5 characters long!';
          break;
        case 'auth/email-already-in-use':
          customMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          customMessage = 'Invalid email format';
          break;
        default:
          customMessage = 'An error occurred';
      }

      return {
        customMessage,
      };
    }
  }

export default useRegister;
