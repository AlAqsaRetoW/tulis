import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

async function useLogin(email, password) {
  try {

    
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (err) {
    let customMessage;

    switch (err.code) {
      case 'auth/invalid-credential':
        customMessage = 'Email atau password salah';
        break;
      case 'auth/invalid-email':
        customMessage = 'Format email tidak valid';
        break;
      case 'auth/user-disabled':
        customMessage = 'Akun ini telah dinonaktifkan';
        break;
      case 'auth/user-not-found':
        customMessage = 'Email tidak terdaftar';
        break;
      case 'auth/wrong-password':
        customMessage = 'Password salah';
        break;
      default:
        customMessage = 'Terjadi kesalahan saat login';
    }

    throw {
      customMessage,
    };
  }
}

export default useLogin;
